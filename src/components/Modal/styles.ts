import {
  StyleSheet
} from 'react-native'
import variables from '../../common/styles/variables'


export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: variables.mtdFillBackdrop
  },
  content: {
    flexDirection: 'column'
  }
})
