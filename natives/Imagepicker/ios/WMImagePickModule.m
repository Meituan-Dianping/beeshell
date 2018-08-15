//
//  WMImagePickModule.m
//  bee
//
//  Created by Yang Chao on 2017/6/28.
//  Copyright © 2017年 Meituan. All rights reserved.
//

#import "WMImagePickModule.h"
#import <UIKit/UIKit.h>
#import <React/RCTUtils.h>
#import <objc/runtime.h>
#import "UIImage+WMImagePickerOperation.h"
#import <WaimaiBizKit/WMBPhotoPreviewViewController.h>

#import "WMImagePickerRequest.h"

// Documentation: https://wiki.sankuai.com/pages/viewpage.action?pageId=948851193
static NSString * const ImagePickerResultCode = @"code";
static NSString * const ImagePickerResultErrorMsg = @"errorMsg";
static NSString * const ImagePickerResultFilePath = @"path";
static NSString * const ImagePickerResultQRCode = @"qrcode";
static NSString * const ImagePickerResultData = @"data";

static const void * kImagePickerRequest = &kImagePickerRequest;

typedef NS_ENUM(NSInteger, WMImagePickerResult) {
    WMImagePickerResultSuccess = 0,
    WMImagePickerResultCanceled = 1,
    WMImagePickerResultError = 2
};

@interface WMImagePickerRequest (React)

- (instancetype)initWithOptions:(NSDictionary *)options;

@end

@implementation WMImagePickerRequest (React)

- (instancetype)initWithOptions:(NSDictionary *)options
{
    self = [self init];
    if (self) {
        if (options[@"maxWidth"] || options[@"maxHeight"]) {
            self.maxSize = CGSizeMake([options[@"maxWidth"] doubleValue], [options[@"maxHeight"] doubleValue]);
        }
        if (options[@"aspectX"] && options[@"aspectY"]) {
            self.aspectRatio = CGSizeMake([options[@"aspectX"] doubleValue], [options[@"aspectY"] doubleValue]);
        }
        if ([options[@"isAllowCrop"] boolValue]) {
            self.allowCrop = YES;
        }
        if ([options[@"isAllowRotate"] boolValue]) {
            self.allowRotate = YES;
        }
        if (options[@"quality"]) {
            self.quality = MIN(MAX(0, [options[@"quality"] doubleValue]), 1);
        }
        if (options[@"recognizeQR"]) {
            self.shouldDetectQRCode = [options[@"recognizeQR"] boolValue];
        }
        
        if (options[@"responseFileType"]) {
            self.responseFileType = options[@"responseFileType"];
        }
    }
    return self;
}

@end

#pragma mark - WMImagePickModule

@interface WMImagePickModule()<UIImagePickerControllerDelegate, UINavigationControllerDelegate, WMBPhotoPreviewControllerDelegate>
//从相机或图库返回的图片信息
@property (nonatomic, strong) NSDictionary *imagePickerResult;
//用于图片编辑器跳转
@property (nonatomic, strong) UINavigationController *navigationController;
@end


@implementation WMImagePickModule

RCT_EXPORT_MODULE(WMImagePicker)

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(launchCamera:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback)
{
    WMImagePickerRequest *request = [[WMImagePickerRequest alloc] initWithOptions:options];

#if TARGET_IPHONE_SIMULATOR
    if (callback) {
        callback(@[@{@"error": @"Camera not available on simulator"}]);
    }
    return;
#else
    request.callback = callback;
    [self launchImagePickerWithRequest:request sourceType:UIImagePickerControllerSourceTypeCamera];
#endif
}

RCT_EXPORT_METHOD(showImagePicker:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback)
{
    WMImagePickerRequest *request = [[WMImagePickerRequest alloc] initWithOptions:options];
    request.callback = callback;
    [self launchImagePickerWithRequest:request sourceType:UIImagePickerControllerSourceTypePhotoLibrary];
}

- (void)launchImagePickerWithRequest:(WMImagePickerRequest *)request sourceType:(UIImagePickerControllerSourceType)sourceType
{
    UIImagePickerController *picker = [UIImagePickerController new];
    picker.sourceType = sourceType;
    picker.delegate = self;
    picker.modalPresentationStyle = UIModalPresentationCurrentContext;
    objc_setAssociatedObject(picker, kImagePickerRequest, request, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    [RCTPresentedViewController() presentViewController:picker animated:YES completion:nil];
}

#pragma mark - UIImagePickerControllerDelegate

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info
{
    WMImagePickerRequest *request = objc_getAssociatedObject(picker, kImagePickerRequest);
    
    dispatch_block_t dismissCompletionBlock = ^{
        self.imagePickerResult = info;
        
        if (request.allowCrop || request.allowRotate) {
            [self openEditor: [info objectForKey:@"UIImagePickerControllerOriginalImage"] withRequest:request];
        } else {
            [self processImage:info[UIImagePickerControllerOriginalImage] withRequest:request];
        }
    };
    
    
    [picker.presentingViewController dismissViewControllerAnimated:YES completion:^{
        dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
            dismissCompletionBlock();
        });
    }];
}


- (void)openEditor:(UIImage*)image withRequest:(WMImagePickerRequest *)request
{

    [self initEditorController:image withRequest:request];

    UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];

    while (root.presentedViewController != nil) {
        root = root.presentedViewController;
    }

    [root presentViewController:self.navigationController animated:YES completion:NULL];

}

-(void)initEditorController:(UIImage*)image withRequest:(WMImagePickerRequest *) request
{
    image = [self fixOrientation:image];  // Rotate the image for upload to web
    
    WMBPhotoPreviewViewController *controller = [WMBPhotoPreviewViewController new];
    controller.delegate = self;
    controller.imageSource = image;
    if (request.allowCrop) {
        controller.allowsCropping = YES;
        
        CGFloat ratioX = 4, ratioY = 3;
        if (request.aspectX && request.aspectY) {
            ratioX = [[NSNumber numberWithInt: request.aspectX] floatValue];
            ratioY  = [[NSNumber numberWithInt: request.aspectY] floatValue];
        }
        controller.cropAspectRatio = CGSizeMake(ratioX, ratioY);
    }
    
    if (request.allowRotate) {
        controller.allowsRotating = YES;
    }
    
    objc_setAssociatedObject(controller, kImagePickerRequest, request, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    
    self.navigationController = [[UINavigationController alloc] initWithRootViewController:controller];
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        self.navigationController.modalPresentationStyle = UIModalPresentationFormSheet;
    }
    
}

#pragma mark - MTIMageEditorViewControllerDelegate methods

- (void)previewController:(WMBPhotoPreviewViewController *)controller didFinishPickingImageWithInfo:(NSDictionary<NSString *,id> *)info
{
    [controller dismissViewControllerAnimated:YES completion:NULL];
    UIImage *result = info[WMBPhotoPreviewerEditedImage] ?: info[WMBPhotoPreviewerOriginalImage];
    
    UIImage *editedImage = [self callbackWithResponse:[self fixOrientation:result]];
    
    WMImagePickerRequest *request = objc_getAssociatedObject(controller, kImagePickerRequest);
    
    [self processImage:editedImage withRequest:request];
}


- (void)previewControllerDidCancel:(WMBPhotoPreviewViewController *)controller
{
    [controller dismissViewControllerAnimated:YES completion:NULL];
}

- (UIImage*)callbackWithResponse :(UIImage *)editedImage
{
    return editedImage;
//    NSDictionary* info = self.imagePickerResult;
//
//    NSURL *imageURL = [info valueForKey:UIImagePickerControllerReferenceURL];
//    NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
    
    
//    NSString *fileName;
//    if ([mediaType isEqualToString:(NSString *)kUTTypeImage]) {
//        NSString *tempFileName = [[NSUUID UUID] UUIDString];
//        if (imageURL && [[imageURL absoluteString] rangeOfString:@"ext=GIF"].location != NSNotFound) {
//            fileName = [tempFileName stringByAppendingString:@".gif"];
//        }
//        else if ([[[self.options objectForKey:@"imageFileType"] stringValue] isEqualToString:@"png"]) {
//            fileName = [tempFileName stringByAppendingString:@".png"];
//        }
//        else {
//            fileName = [tempFileName stringByAppendingString:@".jpg"];
//        }
//    }
//    
//    // We default to path to the temporary directory
//    NSString *path = [[NSTemporaryDirectory()stringByStandardizingPath] stringByAppendingPathComponent:fileName];
//    
//    // If storage options are provided, we use the documents directory which is persisted
//    if ([self.options objectForKey:@"storageOptions"] && [[self.options objectForKey:@"storageOptions"] isKindOfClass:[NSDictionary class]]) {
//        NSDictionary *storageOptions = [self.options objectForKey:@"storageOptions"];
//        
//        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
//        NSString *documentsDirectory = [paths objectAtIndex:0];
//        path = [documentsDirectory stringByAppendingPathComponent:fileName];
//        
//        // Creates documents subdirectory, if provided
//        if ([storageOptions objectForKey:@"path"]) {
//            NSString *newPath = [documentsDirectory stringByAppendingPathComponent:[storageOptions objectForKey:@"path"]];
//            NSError *error;
//            [[NSFileManager defaultManager] createDirectoryAtPath:newPath withIntermediateDirectories:YES attributes:nil error:&error];
//            if (error) {
//                NSLog(@"Error creating documents subdirectory: %@", error);
//                if (self.callback) {
//                    self.callback(@[@{@"error": error.localizedFailureReason}]);
//                    self.callback = nil;
//                }
//                return;
//            }
//            else {
//                path = [newPath stringByAppendingPathComponent:fileName];
//            }
//        }
//    }
//    
//    
//    // Create the response object
//    NSMutableDictionary *response = [[NSMutableDictionary alloc] init];
//    
//    if ([mediaType isEqualToString:(NSString *)kUTTypeImage]) { // PHOTOS
//        
//        UIImage *image = editedImage;
//        
//        // 调整最大最小画幅
//        float maxWidth = image.size.width;
//        float maxHeight = image.size.height;
//        if ([self.options valueForKey:@"maxWidth"]) {
//            maxWidth = [[self.options valueForKey:@"maxWidth"] floatValue];
//        }
//        if ([self.options valueForKey:@"maxHeight"]) {
//            maxHeight = [[self.options valueForKey:@"maxHeight"] floatValue];
//        }
//        image = [self downscaleImageIfNecessary:image maxWidth:maxWidth maxHeight:maxHeight];
//        
//        NSData *data;
//        if ([[[self.options objectForKey:@"imageFileType"] stringValue] isEqualToString:@"png"]) {
//            data = UIImagePNGRepresentation(image);
//        }
//        else {
//            data = UIImageJPEGRepresentation(image, [[self.options valueForKey:@"quality"] floatValue]);
//        }
//        [data writeToFile:path atomically:YES];
//        
//        if (![[self.options objectForKey:@"noData"] boolValue]) {
//            NSString *dataString = [data base64EncodedStringWithOptions:0]; // base64 encoded image string
//            if (dataString != nil) {
//                [response setObject:dataString forKey:@"data"];
//            }
//        }
//        
//        BOOL vertical = (image.size.width < image.size.height) ? YES : NO;
//        [response setObject:@(vertical) forKey:@"isVertical"];
//        
//        NSString *filePath = [[NSURL fileURLWithPath:path] absoluteString];
//        [response setObject:filePath forKey:@"uri"];
//        
//        [response setObject:@(image.size.width) forKey:@"width"];
//        [response setObject:@(image.size.height) forKey:@"height"];
//    }
//    
//    // If storage options are provided, check the skipBackup flag
//    if ([self.options objectForKey:@"storageOptions"] && [[self.options objectForKey:@"storageOptions"] isKindOfClass:[NSDictionary class]]) {
//        NSDictionary *storageOptions = [self.options objectForKey:@"storageOptions"];
//        
//        if ([[storageOptions objectForKey:@"skipBackup"] boolValue]) {
//            [self addSkipBackupAttributeToItemAtPath:path]; // Don't back up the file to iCloud
//        }
//    }
//    response[@"qrcode"] = self.qrCodeString;
//    if (self.callback) {
//        self.callback(@[response]);
//        self.callback = nil;
//    }
}



- (UIImage *)fixOrientation:(UIImage *)srcImg {
    if (srcImg.imageOrientation == UIImageOrientationUp) {
        return srcImg;
    }
    
    CGAffineTransform transform = CGAffineTransformIdentity;
    switch (srcImg.imageOrientation) {
        case UIImageOrientationDown:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, srcImg.size.width, srcImg.size.height);
            transform = CGAffineTransformRotate(transform, M_PI);
            break;
            
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
            transform = CGAffineTransformTranslate(transform, srcImg.size.width, 0);
            transform = CGAffineTransformRotate(transform, M_PI_2);
            break;
            
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, 0, srcImg.size.height);
            transform = CGAffineTransformRotate(transform, -M_PI_2);
            break;
        case UIImageOrientationUp:
        case UIImageOrientationUpMirrored:
            break;
    }
    
    switch (srcImg.imageOrientation) {
        case UIImageOrientationUpMirrored:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, srcImg.size.width, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
            
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, srcImg.size.height, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
        case UIImageOrientationUp:
        case UIImageOrientationDown:
        case UIImageOrientationLeft:
        case UIImageOrientationRight:
            break;
    }
    
    CGContextRef ctx = CGBitmapContextCreate(NULL, srcImg.size.width, srcImg.size.height, CGImageGetBitsPerComponent(srcImg.CGImage), 0, CGImageGetColorSpace(srcImg.CGImage), CGImageGetBitmapInfo(srcImg.CGImage));
    CGContextConcatCTM(ctx, transform);
    switch (srcImg.imageOrientation) {
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            CGContextDrawImage(ctx, CGRectMake(0,0,srcImg.size.height,srcImg.size.width), srcImg.CGImage);
            break;
        default:
            CGContextDrawImage(ctx, CGRectMake(0,0,srcImg.size.width,srcImg.size.height), srcImg.CGImage);
            break;
    }
    
    CGImageRef cgimg = CGBitmapContextCreateImage(ctx);
    UIImage *img = [UIImage imageWithCGImage:cgimg];
    CGContextRelease(ctx);
    CGImageRelease(cgimg);
    return img;
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    WMImagePickerRequest *request = objc_getAssociatedObject(picker, kImagePickerRequest);
    [picker.presentingViewController dismissViewControllerAnimated:YES completion:^{
        if (request.callback) {
            request.callback(@[@{ ImagePickerResultCode: @(WMImagePickerResultCanceled) }]);
        }
    }];
}

#pragma mark - Helper methods

- (void)processImage:(UIImage *)image withRequest:(WMImagePickerRequest *)request
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    if (!image) {
        dict[ImagePickerResultCode] = @(WMImagePickerResultError);
        dict[ImagePickerResultErrorMsg] = @"Could not get original image";
    } else {
        if (request.shouldDetectQRCode) {
            dict[ImagePickerResultQRCode] = image.wmm_qrCodeString;
        }
        UIImage *resultImage = [image wmm_imageWithAspectSize:request.aspectRatio];
        resultImage = [resultImage wmm_imageWithMaxSize:request.maxSize];
        NSData *data = UIImageJPEGRepresentation(resultImage, request.quality);
        NSString *pathComponent = [self generateUniqueFilePathComponent];
        NSString *fullPath = [[self destinationBasePath] stringByAppendingPathComponent:pathComponent];
        
        if ([request.responseFileType isEqualToString:@"base64"]) {
            NSString *dataString = [data base64EncodedStringWithOptions:0]; // base64 encoded image string
            dict[ImagePickerResultCode] = @(WMImagePickerResultSuccess);
            dict[ImagePickerResultData] = dataString;
        } else {
            if ([data writeToFile:fullPath atomically:YES]) {
                [[NSURL fileURLWithPath:fullPath] setResourceValue:@(YES) forKey:NSURLIsExcludedFromBackupKey error:nil];
                dict[ImagePickerResultCode] = @(WMImagePickerResultSuccess);
                dict[ImagePickerResultFilePath] = pathComponent;
            } else {
                dict[ImagePickerResultCode] = @(WMImagePickerResultError);
                dict[ImagePickerResultErrorMsg] = @"Could not save image";
            }
        }
        
    }
    if (request.callback) {
        request.callback(@[dict]);
    }
}

- (NSString *)destinationBasePath
{
    return NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject ?: @"";
}

- (NSString *)generateUniqueFilePathComponent
{
    NSString *dirName = @"/com.meituan.waimaibee.imagepicker";
    NSString *fullDirPath = [[self destinationBasePath] stringByAppendingPathComponent:dirName].stringByStandardizingPath;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    if (![fileManager fileExistsAtPath:fullDirPath]) {
        [fileManager createDirectoryAtPath:fullDirPath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    NSString *fileName = [NSUUID.UUID.UUIDString stringByAppendingPathExtension:@"jpg"];
    while ([fileManager fileExistsAtPath:[fullDirPath stringByAppendingPathComponent:fileName]]) {
        fileName = [NSUUID.UUID.UUIDString stringByAppendingPathExtension:@"jpg"];
    }
    return [dirName stringByAppendingPathComponent:fileName];
}

@end
