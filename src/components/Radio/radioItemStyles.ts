import { StyleSheet } from 'react-native'
import defaultTheme from '../../common/styles/variables'

export default StyleSheet.create({
  container: {},
  touchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: defaultTheme.mtdVSpacingL
  },

  label: {
    flex: 1
  },
  labelText: {
    fontSize: defaultTheme.mtdFontSizeM,
    color: defaultTheme.mtdGrayBase
  }
})
