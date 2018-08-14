//
//  UIImage+WMImagePickerOperation.h
//  bee
//
//  Created by Yang Chao on 2017/7/4.
//  Copyright © 2017年 Meituan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (WMImagePickerOperation)

@property (nonatomic, readonly) NSString *wmm_qrCodeString;

- (UIImage *)wmm_imageWithAspectSize:(CGSize)aspectSize;

- (UIImage *)wmm_imageWithMaxSize:(CGSize)maxSize;

@end
