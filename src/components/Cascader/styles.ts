import variables from '../../common/styles/variables'
import {
  StyleSheet
} from 'react-native'

export default {
  cascContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  cascaderMenu: {
    flex: 1,
    borderRightColor: '#E5E5E5',
    borderRightWidth: StyleSheet.hairlineWidth
  },
  cascaderMenuItem: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  cascaderMenuItemSelected: {
    backgroundColor: variables.mtdFillGray
  },
  cascaderMenuItemHasChildren: {},
  cascaderMenuText: {
    lineHeight: 18,
    fontSize: 13,
    flex: 1
  },
  cascaderMenuTextSelected: {
    color: variables.mtdGrayDarker,
    fontWeight: 'bold'
  },
  childIcon: {
    width: 8,
    height: 12
  },
  selectedIcon: {
    width: 5,
    height: 8,
    position: 'absolute',
    right: 0
  }
}
