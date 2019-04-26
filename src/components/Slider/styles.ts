import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default {
  markContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  markItemText: {
    color: variables.mtdGrayBase,
    fontSize: variables.mtdFontSizeM
  },
  markItemLine: {
    width: 1,
    height: 10,
    marginVertical: variables.mtdVSpacingS,
    backgroundColor: variables.mtdGrayLighter,
  },

  thumb: {
    position: 'absolute',
    alignItems: 'center',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tip: {
    position: 'absolute',
    top: -30,
    width: 300,
    height: 30,
    alignItems: 'center'
  },
  tipContent: {
    alignItems: 'center',
    paddingHorizontal: variables.mtdHSpacingM,
    paddingVertical: variables.mtdHSpacingS,
    backgroundColor: variables.mtdFillBackdropDark,
    borderRadius: variables.mtdRadiusS
  },
  tipText: {
    fontSize: variables.mtdFontSizeS,
    color: variables.mtdFillBase,
    textAlign: 'center'
  },
  tipIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: variables.mtdFillBackdropDark,
    borderBottomColor: 'transparent'
  }
}
