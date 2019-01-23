import {
  StyleSheet,
  PixelRatio,
  ViewStyle
} from 'react-native'

import variables from '../../common/styles/variables'
const px = 1 / PixelRatio.get()

const buttons = {
  defaultWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: variables.mtdHSpacingL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: '#fff'
  },

  defaultText: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  }
}

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: variables.mtdRadiusXS,
    overflow: 'hidden'
  },
  header: {
    alignItems: 'center',
    paddingTop: 25
  },

  title: {
    fontSize: variables.mtdFontSizeL,
    fontWeight: 'bold',
    color: variables.mtdGrayBase
  },

  body: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24
    // paddingVertical: padding.verticalBase,
  },

  bodyText: {
    flex: 1,
    textAlign: 'center',
    color: variables.mtdGrayBase,

    // ...mixins.adjustFont(14, 1.2)
    fontSize: 14,
    lineHeight: 18,
    textAlignVertical: 'center'
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderTopWidth: 1 * px,
    borderTopColor: variables.mtdBorderColor
  },

  btnConfirmWrapper: {
    ...buttons.defaultWrapper,
    borderWidth: 0,
    backgroundColor: '#fff'
  } as ViewStyle,

  btnConfirmText: {
    ...buttons.defaultText,
    color: variables.mtdBrandPrimaryDark,

    fontSize: variables.mtdFontSizeL,
    fontWeight: 'bold'
  },

  btnCancelWrapper: {
    ...buttons.defaultWrapper,
    borderWidth: 0
  } as ViewStyle,

  btnCancelText: {
    ...buttons.defaultText,
    fontSize: variables.mtdFontSizeL,
    color: variables.mtdGrayDark
  }
})
