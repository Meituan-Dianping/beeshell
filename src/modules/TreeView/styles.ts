import { StyleSheet } from 'react-native'
import varibles from '../../common/styles/variables'

export default StyleSheet.create({
  container: {
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: varibles.mtdVSpacingL,
    paddingHorizontal: varibles.mtdHSpacingL
  },

  itemIcon: {
    marginRight: 5
  },

  itemText: {
    color: varibles.mtdGrayBase
  }
})
