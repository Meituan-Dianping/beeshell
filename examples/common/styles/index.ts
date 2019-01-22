import { StyleSheet } from '@mrn/react-native'
import variables from '../../customTheme'

export default StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  container: {
    paddingHorizontal: variables.mtdHSpacingXl,
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
