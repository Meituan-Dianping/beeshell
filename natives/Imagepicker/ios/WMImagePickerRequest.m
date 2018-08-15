//
//  WMImagePickerRequest.m
//  bee
//
//  Created by Yang Chao on 2017/9/25.
//  Copyright © 2017年 Meituan. All rights reserved.
//

#import "WMImagePickerRequest.h"

@implementation WMImagePickerRequest

- (instancetype)init
{
    self = [super init];
    if (self) {
        _quality = 0.8;
    }
    return self;
}

@end
