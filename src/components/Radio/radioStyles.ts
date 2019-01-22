import { StyleSheet } from 'react-native'
import defaultTheme from '../../common/styles/variables'

export default StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  children: {
    backgroundColor: '#ffffff'
  },
  title: {
    paddingLeft: 15,
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 14,
    color: defaultTheme.mtdGrayBase
  }
})
