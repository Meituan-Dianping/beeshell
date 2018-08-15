//
//  UIImage+WMImagePickerOperation.m
//  bee
//
//  Created by Yang Chao on 2017/7/4.
//  Copyright © 2017年 Meituan. All rights reserved.
//

#import "UIImage+WMImagePickerOperation.h"

@implementation UIImage (WMImagePickerOperation)

- (NSString *)wmm_qrCodeString
{
    CIDetector *detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:nil options:@{ CIDetectorAccuracy: CIDetectorAccuracyHigh }];
    if (!detector) {
        return nil;
    }
    
    if (!self.CIImage && !self.CGImage) {
        return nil;
    }
    
    CIImage *ciImage = self.CIImage ?: [CIImage imageWithCGImage:self.CGImage];
    __auto_type features = [detector featuresInImage:ciImage];
    for (CIQRCodeFeature *feature in features) {
        if ([feature isKindOfClass:[CIQRCodeFeature class]] && feature.messageString.length > 0) {
            return feature.messageString;
        }
    }
    
    // 识别不出的话转换成黑白图再试一次
    CIFilter *filter = [CIFilter filterWithName:@"CIColorMonochrome"];
    [filter setValue:ciImage forKey:kCIInputImageKey];
    [filter setValue:[[CIColor alloc] initWithColor:UIColor.whiteColor] forKey:kCIInputColorKey];
    ciImage = [filter valueForKey:kCIOutputImageKey];
    features = [detector featuresInImage:ciImage];
    for (CIQRCodeFeature *feature in features) {
        if ([feature isKindOfClass:[CIQRCodeFeature class]] && feature.messageString.length > 0) {
            return feature.messageString;
        }
    }
    
    return nil;
}

- (UIImage *)wmm_imageWithAspectSize:(CGSize)aspectSize
{
    if (aspectSize.width == 0 || aspectSize.height == 0) {
        return self;
    }
    CGFloat originalRatio = self.size.width / self.size.height;
    if (originalRatio == aspectSize.width / aspectSize.height) {
        return self;
    }
    
    CGSize newSize;
    if (originalRatio > aspectSize.width / aspectSize.height) {
        // 太宽了
        newSize.height = self.size.height;
        newSize.width = newSize.height * aspectSize.width / aspectSize.height;
    } else {
        // 太高了
        newSize.width = self.size.width;
        newSize.height = newSize.width * aspectSize.height / aspectSize.width;
    }
    
    UIGraphicsBeginImageContext(newSize);
    [self drawInRect:CGRectMake((newSize.width - self.size.width) / 2, (newSize.height - self.size.height) / 2, self.size.width, self.size.height)];
    UIImage *result = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return result ?: self;
}

- (UIImage *)wmm_imageWithMaxSize:(CGSize)maxSize
{
    // Nothing to do here
    if (self.size.width <= maxSize.width && self.size.height <= maxSize.height) {
        return self;
    }
    
    CGSize scaledSize = CGSizeMake(self.size.width, self.size.height);
    if (maxSize.width > 0 && maxSize.width < scaledSize.width) {
        scaledSize = CGSizeMake(maxSize.width, (maxSize.width / scaledSize.width) * scaledSize.height);
    }
    if (maxSize.height > 0 && maxSize.height < scaledSize.height) {
        scaledSize = CGSizeMake((maxSize.height / scaledSize.height) * scaledSize.width, maxSize.height);
    }
    
    // If the pixels are floats, it causes a white line in iOS8 and probably other versions too
    scaledSize.width = floor(scaledSize.width);
    scaledSize.height = floor(scaledSize.height);
    
    UIGraphicsBeginImageContext(scaledSize);
    [self drawInRect:CGRectMake(0, 0, scaledSize.width, scaledSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return newImage ?: self;
}

@end
