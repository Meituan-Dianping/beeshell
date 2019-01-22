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
    paddingVertical: variables.mtdVSpacingXl,
    paddingHorizontal: variables.mtdHSpacingXl,

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
    paddingVertical: variables.mtdVSpacingXxl,
    paddingHorizontal: variables.mtdHSpacingXl,

    fontSize: variables.mtdFontSizeL,
    textAlign: 'center',
    color: variables.mtdGrayBase
  }
})
