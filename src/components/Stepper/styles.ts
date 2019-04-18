import variables from '../../common/styles/variables'
import {
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native'
export interface ConterStyle {
  container: ViewStyle
  ctrl: ViewStyle,
  ctrlText: TextStyle,
  input: ViewStyle,
  squareSolid: ViewStyle,
  circularHollow: ViewStyle,
  squareHollow: ViewStyle,
  ctrlSymbolHor: ViewStyle,
  ctrlSymboVer: ViewStyle,
  ctrlSymbolSolid: ViewStyle,
  disabled: ViewStyle,
  squareJoinHollowLeft: ViewStyle,
  squareJoinHollowRight: ViewStyle,
  inputWithBorder: ViewStyle
}

export default {
  container: {
    flexDirection: 'row',
    width: 136,
    alignItems: 'center'
  },
  ctrl: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.mtdBrandPrimary,
    borderRadius: variables.mtdRadiusXS
  },
  squareSolid: {
    borderRadius: 4
  },
  circularHollow: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdBrandPrimary
  },
  squareHollow: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdBrandPrimary
  },
  squareJoinHollowLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdBrandPrimary
  },
  squareJoinHollowRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdBrandPrimary
  },
  ctrlSymbolHor: {
    width: 14,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2
  },
  ctrlSymboVer: {
    position: 'absolute',
    width: 2,
    height: 14,
    backgroundColor: '#fff',
    borderRadius: 2
  },
  ctrlSymbolSolid: {
    backgroundColor: variables.mtdBrandPrimary
  },
  ctrlText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    color: '#fff',
    borderRadius: 100
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: variables.mtdGrayBase,
    textAlignVertical: 'center'
  },
  inputWithBorder: {
    borderTopColor: variables.mtdBrandPrimary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: variables.mtdBrandPrimary,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  disabled: {
    opacity: variables.mtdOpacity
  }
}
