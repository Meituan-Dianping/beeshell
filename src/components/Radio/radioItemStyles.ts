import { StyleSheet } from 'react-native'
import variables from '../../common/styles/variables'

export default StyleSheet.create({
  container: {},
  touchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: variables.radioItemVSpacing
  },

  label: {
    flex: 1
  },
  labelText: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  }
})
