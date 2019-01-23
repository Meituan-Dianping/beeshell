import { StyleSheet } from 'react-native'
import varibles from '../../common/styles/variables'

export default StyleSheet.create({
  container: {
  },
  body: {
    paddingVertical: 20,
    paddingHorizontal: 30,

    borderRadius: varibles.mtdRadiusXS,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
  },
  info: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    color: '#fff',
  }
})
