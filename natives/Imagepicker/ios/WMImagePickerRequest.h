//
//  WMImagePickerRequest.h
//  bee
//
//  Created by Yang Chao on 2017/9/25.
//  Copyright © 2017年 Meituan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface WMImagePickerRequest : NSObject

@property (nonatomic, copy) RCTResponseSenderBlock callback;

@property (nonatomic) CGSize maxSize;
@property (nonatomic) CGSize aspectRatio;
@property (nonatomic) BOOL allowCrop;
@property (nonatomic) BOOL allowRotate;
@property (nonatomic) CGFloat quality;
@property (nonatomic) BOOL shouldDetectQRCode;
@property (nonatomic) int aspectX;
@property (nonatomic) int aspectY;
@property (nonatomic) NSString *responseFileType;

@end
