import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default {
  touchContainer: {
    paddingVertical: variables.mtdVSpacingM,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  hasLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: variables.mtdBorderColorDark
  },
  labelText: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  },
  icon: {
    height: variables.checkboxIconContainSize,
    width: variables.checkboxIconContainSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconView: {
    height: variables.checkboxIconSize,
    width: variables.checkboxIconSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconDefault: {
    backgroundColor: '#ffffff',
    borderColor: variables.mtdBorderColorDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: variables.checkboxIconContainSize
  },
  iconChecked: {
    backgroundColor: variables.mtdBrandPrimary,
    borderColor: variables.mtdBrandPrimary
  },
  iconDisabled: {
    opacity: variables.mtdOpacity
  },
  iconLeftPosition: {
    marginRight: variables.mtdHSpacingM
  }
}
