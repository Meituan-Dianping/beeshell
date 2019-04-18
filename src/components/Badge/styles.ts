import variables from '../../common/styles/variables'
import { StyleSheet } from 'react-native'

export default {
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdBrandDanger,
    backgroundColor: variables.mtdBrandDanger,
  },
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: variables.mtdBrandDanger
  }
}
