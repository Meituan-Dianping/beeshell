import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default {
  checkboxContainer: {
    backgroundColor: '#fff'
  },
  checkboxItemContainer: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  checkboxLabel: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  },

  uncheckedIcon: {
    width: variables.mtdFontSizeL,
    height: variables.mtdFontSizeL,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: variables.mtdFontSizeL,
    borderColor: variables.mtdBorderColorDarker,
    backgroundColor: '#ffffff',
  },
  iconLeftPosition: {
    marginRight: variables.mtdHSpacingM
  }
}
