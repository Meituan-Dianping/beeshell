import {
  StyleSheet
} from 'react-native'
import { buttonStyles } from '../Button'

export default StyleSheet.create({
  btnWrapper: {
    ...StyleSheet.flatten(buttonStyles.defaultWrapper),
    borderWidth: 0,
    borderRadius: 0
  },

  btnText: {
    ...StyleSheet.flatten(buttonStyles.defaultText),
    fontSize: 15
  }
})
