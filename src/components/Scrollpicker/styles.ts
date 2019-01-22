import {
  StyleSheet
} from 'react-native'
import variables from '../../common/styles/variables'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },

  proportionWrapper: {
    flexDirection: 'column'
  },

  scroller: {
    flex: 1
  },

  scrollerContentContainer: {
    alignItems: 'center'
  },

  targetItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  targetItemContent: {
    flex: 1,
    paddingVertical: variables.mtdVSpacingL,
    textAlign: 'center'
  },

  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },

  indicatorMask: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },

  indicatorTarget: {}
})
