import { StyleSheet } from '@mrn/react-native'
import variables from '../../customTheme'

export default StyleSheet.create({
  container: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  header: {
    paddingHorizontal: variables.mtdHSpacingXl,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: variables.mtdFillGray,
    fontWeight: 'bold'
  },
  panel: {
    paddingHorizontal: variables.mtdHSpacingXl,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: '#fff',
  },

  footer: {

  }
})
