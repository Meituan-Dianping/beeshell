import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default StyleSheet.create({
  radioContainer: {
    flexDirection: 'column'
  },

  radioItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 18
  },

  radioItemLabel: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  }
})
