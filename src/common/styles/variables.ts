import { StyleSheet } from 'react-native'
const px = StyleSheet.hairlineWidth

// 全局/品牌色
const mtdBrandColors = {
  mtdBrandPrimary: '#FECB2E',
  mtdBrandPrimaryDark: '#FFA000',
  mtdBrandSuccess: '#1CC678',
  mtdBrandWarning: '#FF8C28',
  mtdBrandDanger: '#FF5650',
  mtdBrandInfo: '#4B88EB'
}
// 灰度
const mtdGrayColors = {
  mtdGrayBase: '#111111',
  mtdGrayDarker: '#333333',
  mtdGrayDark: '#555555',
  mtdGray: '#999999',
  mtdGrayLight: '#aaaaaa',
  mtdGrayLighter: '#cccccc',
  mtdGrayLightest: '#ebebeb'
}
// 背景色
const mtdFillColors = {
  mtdFillBase: '#ffffff',
  mtdFillGray: '#F5F5F5',
  mtdFillBody: '#F8F8F8',
  mtdFillMask: 'rgba(0, 0, 0, .3)' // 遮罩背景
}
// 字体尺寸
const mtdFontSize = {
  mtdFontSizeXS: 10,
  mtdFontSizeS: 12,
  mtdFontSizeM: 14,
  mtdFontSizeL: 16,
  mtdFontSizeXL: 18,
  mtdFontSizeXXL: 20,
  mtdFontSizeXXXL: 22,
  mtdFontSizeXXXXL: 24,
  mtdFontSizeXXXXXL: 28
}
// 水平间距
const mtdSpacing = {
  mtdHSpacingS: 4,
  mtdHSpacingM: 8,
  mtdHSpacingL: 12,
  mtdHSpacingXL: 16,
  mtdHSpacingXXL: 20,

  mtdVSpacingXS: 2,
  mtdVSpacingS: 4,
  mtdVSpacingM: 8,
  mtdVSpacingL: 10,
  mtdVSpacingXL: 12,
  mtdVSpacingXXL: 16,
  mtdVSpacingXXXL: 18,
  mtdVSpacingXXXXL: 20
}
// 圆角
const mtdRadius = {
  mtdRadiusXS: 2,
  mtdRadiusS: 4,
  mtdRadiusM: 6,
  mtdRadiusL: 8
}
const mtdBorder = {
  mtdBorderWidth: 1 * px,
  mtdBorderColor: '#F5F5F5',
  mtdBorderColorDark: '#e5e5e5'
}


/**
 * Button 组件
 */
const button = {
  buttonBorderRadius: 0,
  buttonActiveOpacity: 0.3,

  buttonLFontSize: mtdFontSize.mtdFontSizeXL,
  buttonLHSpacing: 50,
  buttonLVSpacing: 14,

  buttonMFontSize: mtdFontSize.mtdFontSizeL,
  buttonMHSpacing: 50,
  buttonMVSpacing: 13,

  buttonSFontSize: mtdFontSize.mtdFontSizeM,
  buttonSHSpacing: mtdSpacing.mtdHSpacingXL,
  buttonSVSpacing: 8
}

/**
 * Form 组件
 */
const form = {
}

const formItem = {
  formItemHSpacing: mtdSpacing.mtdHSpacingXL,
  formItemVSpacing: 18,

  formItemLabelWidth: 90,
  formItemLabelMarginRight: 32
}

/**
 * Input组件
 */
const input = {
  // input组件安全区域 高度
  inputTextFontSize: 14
}


const radio = {}
const radioItem = {
  radioItemVSpacing: 18
}
// /**
//  * Tip 组件
//  */
// const tip = {
//     tipHSpacing: mtdSpacing.mtdHSpacingM,
//     tipVSpacing: mtdSpacing.mtdVSpacingM,
//     tipIconSize: mtdFontSize.mtdFontSizeM
// }
// /**
//  * NavigationBar 组件
//  */
// const navigationBar = {
//     navigationBarIconSizeMd: mtdFontSize.mtdFontSizeXxXL,
//     navigationBarIconSizeSm: mtdFontSize.mtdFontSizeL,
//     navigationBarSearchBarInputHeight: 30,
//     navigationBarSearchBarFill: mtdFillColors.mtdFillBody,
//     navigationBarHSpacingMd: mtdSpacing.mtdHSpacingM
// }
// /**
//  * Loading 组件
//  */
// const loading = {
//     loadingVSpacing: mtdSpacing.mtdVSpacingXL,
//     loadingHSpacing: mtdSpacing.mtdVSpacingXL,
//     loadingFontColor: '#ffffff',
//     loadingFontSize: mtdFontSize.mtdFontSizeM,
//     loadingLineHeight: mtdFontSize.mtdFontSizeM * 1.2
// }
// /**
//  * Toast 组件
//  */
// const toast = {
//     toastFontSizeMd: mtdFontSize.mtdFontSizeXL,
//     toastLineHeight: mtdFontSize.mtdFontSizeXL * 1.2,
//     toastFontColor: '#ffffff',
//     toastMHSpacing: mtdSpacing.mtdHSpacingXL * 2
// }
/**
 * Slider 组件
 */
const slider = {
  sliderSlideHeight: 40,
  sliderSlideHeightForTip: 100,
  sliderTrackHeight: 5,
  sliderThumbSize: 34,
  sliderMarkHeight: 40,
  sliderMarkLineSize: 10,
  sliderSlideToolTip: 30,
  sliderSlideToolTipIconSize: 4
}
// /**
//  * Checkbox 组件
//  */
const checkbox = {
  checkboxIconContainerSize: 18,
  checkboxIconSize: 12
}
// /**
//  * Popover 组件
//  */
// const popover = {
//     popoverColor: '#fff',
//     popoverBackgroundColor: '#2C2F34',
//     popoverActiveBackgroundColor: '#1C1C1D',
//     popoverBorderColor: '#565859'
// }
// /**
//  * Calender 组件
//  */
// const calender = {
//     calendarSelectedTextColor: '#fff',
//     calendarFontFamily: 'PingFangSC-Medium',
//     calendarDayHight: 65,
//     calendarDayMiddleSelected: '#f3de8b',
//     calendarMiddleSelectedTextColor: '#ff9a14'
// }
/**
 * Carousel 组件
 */
const carousel = {
  carouselPaginationVSpacing: mtdSpacing.mtdVSpacingXL,
  carouselPaginationHSpacing: mtdSpacing.mtdHSpacingL
}
// const tags = {
//     tagRadius: 4,
//     tagsBrokenHight: 24,
//     tagFontSize: 10
// }

const variables = {
  ...mtdBrandColors,
  ...mtdGrayColors,
  ...mtdFillColors,
  ...mtdFontSize,
  ...mtdSpacing,
  ...mtdRadius,
  ...mtdBorder,
  mtdOpacity: 0.3,

  ...button,
  ...form,
  ...formItem,
  ...input,
  ...radio,
  ...radioItem,
  ...checkbox,
  ...slider,

  ...carousel,
}



function useTheme(args = {}) {
  Object.assign(variables, args)
  return variables
}

export default variables

export {
    useTheme
}
