import {
  StyleSheet,
  PixelRatio
} from 'react-native'
import variables from '../../common/styles/variables'

const px = 1 / PixelRatio.get()

export default StyleSheet.create({
  container: {
    backgroundColor: variables.mtdFillBody
  },
  header: {
    borderBottomWidth: 1 * px,
    borderBottomColor: variables.mtdBorderColorDark,
    backgroundColor: '#fff'
  },

  title: {
    paddingVertical: variables.mtdVSpacingXL,
    paddingHorizontal: variables.mtdHSpacingXL,

    textAlign: 'center',
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGray
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },

  item: {
    borderBottomWidth: 1 * px,
    borderBottomColor: variables.mtdBorderColorDark,
    backgroundColor: '#fff'
  },

  itemText: {
    paddingVertical: variables.mtdVSpacingXXL,
    paddingHorizontal: variables.mtdHSpacingXL,

    fontSize: variables.mtdFontSizeL,
    textAlign: 'center',
    color: variables.mtdGrayBase
  }
})
