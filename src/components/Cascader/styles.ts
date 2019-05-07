import variables from '../../common/styles/variables'
import {
  StyleSheet
} from 'react-native'

export default {
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingX3L
  },
  itemText: {
    fontSize: variables.mtdFontSizeM,
  },
  cascaderMenuItemSelected: {
    backgroundColor: variables.mtdFillGray
  },
  selectedIcon: {
    width: 5,
    height: 8,
    position: 'absolute',
    right: 0
  }
}
