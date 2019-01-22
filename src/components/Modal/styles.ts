import {
  StyleSheet
} from 'react-native'
import variables from '../../common/styles/variables'


export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: variables.mtdOpacity
  },
  content: {
    flexDirection: 'column',
    overflow: 'hidden'
  }
})
