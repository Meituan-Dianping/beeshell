import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default {
  silderContainer: {
    height: variables.sliderSlideHeight,
    justifyContent: 'center'
  },
  markContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  markItemView: {
    width: variables.sliderThumbSize,
    alignItems: 'center'
  },
  markItemText: {
    color: variables.mtdGrayBase,
    fontSize: variables.mtdFontSizeM
  },
  markItemLine: {
    width: 1,
    height: variables.sliderMarkLineSize,
    marginVertical: variables.mtdVSpacingS,
    backgroundColor: variables.mtdGrayLighter
  },
  track: {
    height: variables.sliderTrackHeight,
    borderRadius: variables.sliderTrackHeight / 2,
  },
  thumb: {
    position: 'absolute',
    alignItems: 'center'
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  toolTip: {
    position: 'absolute',
    height: variables.sliderSlideToolTip,
    width: 300,
    marginTop: -variables.sliderSlideToolTip,
    alignItems: 'center'
  },
  toolTipTextContain: {
    alignItems: 'center',
    paddingHorizontal: variables.mtdHSpacingM,
    paddingVertical: variables.mtdHSpacingS,
    backgroundColor: variables.mtdFillBackdrop,
    borderRadius: variables.mtdRadiusS
  },
  toolTipText: {
    fontSize: variables.mtdFontSizeS,
    color: variables.mtdFillBase,
    textAlign: 'center'
  },
  toolTipIcon: {
    width: 0,
    height: 0,
    marginTop: -StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderLeftWidth: variables.sliderSlideToolTipIconSize,
    borderRightWidth: variables.sliderSlideToolTipIconSize,
    borderBottomWidth: variables.sliderSlideToolTipIconSize,
    borderTopWidth: variables.sliderSlideToolTipIconSize,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: variables.mtdFillBackdrop,
    borderBottomColor: 'transparent'
  }
}
