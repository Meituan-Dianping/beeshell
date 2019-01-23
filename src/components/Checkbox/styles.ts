import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default {
  container: {
    backgroundColor: '#fff'
  },
  touchContainer: {
    paddingVertical: variables.radioItemVSpacing,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  labelText: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  },
  icon: {
    height: variables.checkboxIconContainerSize,
    width: variables.checkboxIconContainerSize,
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
    borderRadius: variables.checkboxIconContainerSize
  },
  iconChecked: {
    backgroundColor: variables.mtdBrandPrimary,
    borderColor: variables.mtdBrandPrimary
  },
  iconLeftPosition: {
    marginRight: variables.mtdHSpacingM
  }
}
