import { StyleSheet } from '@mrn/react-native'
import variables from '../../customTheme'

export default StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  container: {
    paddingHorizontal: variables.mtdHSpacingXL,
  },
  row: {
    marginHorizontal: -variables.mtdHSpacingXL
  },
  header: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: variables.mtdFillBody,
    fontWeight: 'bold',
    color: variables.mtdGrayDark
  },
  panel: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: '#fff',
  },

  footer: {

  }
})
