import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

const defaultWrapper = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  paddingHorizontal: variables.mtdHSpacingL,
  paddingVertical: variables.mtdVSpacingM,

  borderWidth: StyleSheet.hairlineWidth,
  borderColor: variables.mtdGray,
  borderRadius: variables.buttonBorderRadius,

  backgroundColor: '#fff'
}

const defaultText = {
  fontSize: variables.mtdFontSizeM,
  color: variables.mtdGrayBase
}

const primaryWrapper = {
  ...defaultWrapper,
  borderColor: variables.mtdBrandPrimary,
  backgroundColor: variables.mtdBrandPrimary
}

const primaryText = {
  ...defaultText,
  color: '#ffffff'
}

const dangerWrapper = {
  ...defaultWrapper,
  borderColor: variables.mtdBrandDanger,
  backgroundColor: variables.mtdBrandDanger
}

const dangerText = {
  ...defaultText,
  color: '#ffffff'
}

const warningWrapper = {
  ...defaultWrapper,
  borderColor: variables.mtdBrandWarning,
  backgroundColor: variables.mtdBrandWarning
}

const warningText = {
  ...defaultText,
  color: '#ffffff'
}

const successWrapper = {
  ...defaultWrapper,
  borderColor: variables.mtdBrandSuccess,
  backgroundColor: variables.mtdBrandSuccess
}

const successText = {
  ...defaultText,
  color: '#ffffff'
}

const infoWrapper = {
  ...defaultWrapper,
  borderColor: variables.mtdBrandInfo,
  backgroundColor: variables.mtdBrandInfo
}

const infoText = {
  ...defaultText,
  color: '#ffffff'
}

const textWrapper = {
  ...defaultWrapper,
  borderColor: 'transparent',
  backgroundColor: 'transparent'
}

const textText = {
  ...defaultText,
  color: variables.mtdBrandInfo
}

export default StyleSheet.create({
  defaultWrapper,
  defaultText,

  primaryWrapper,
  primaryText,

  dangerWrapper,
  dangerText,

  successWrapper,
  successText,

  warningWrapper,
  warningText,

  infoWrapper,
  infoText,

  textWrapper,
  textText
} as any)
