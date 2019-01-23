import {
  StyleSheet
} from 'react-native'
import varibles from '../../common/styles/variables'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  header: {
    borderBottomWidth: varibles.mtdBorderWidth,
    borderBottomColor: varibles.mtdBorderColorDark,
    flexDirection: 'row'
  },

  colSide: {
    flex: 1,
    justifyContent: 'center'
  },

  colMiddle: {
    flex: 2,
    justifyContent: 'center'
  },

  title: {
    paddingVertical: varibles.mtdVSpacingXL,
    paddingHorizontal: varibles.mtdHSpacingXL,
    fontSize: varibles.mtdFontSizeL,
    textAlign: 'center',
    color: varibles.mtdGrayBase
  },

  operator: {
    flex: 1,
    paddingVertical: varibles.mtdVSpacingXL,
    paddingHorizontal: varibles.mtdHSpacingXL,
    fontSize: varibles.mtdFontSizeL,
    color: varibles.mtdGray
  }
})
