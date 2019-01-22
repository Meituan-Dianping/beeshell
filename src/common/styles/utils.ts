import { StyleSheet } from 'react-native'
import variables from './variables'

const utils = StyleSheet.create({
  /**
   * Text align
   */
  textCenter: {
    textAlign: 'center'
  },

  textLeft: {
    textAlign: 'left'
  },

  textRight: {
    textAlign: 'right'
  },

  /**
   * Text color
   */
  textPrimary: {
    color: variables.mtdBrandPrimary
  },

  textPrimaryDark: {
    color: variables.mtdBrandPrimaryDark
  },

  textSuccess: {
    color: variables.mtdBrandSuccess
  },

  textInfo: {
    color: variables.mtdBrandInfo
  },

  textDanger: {
    color: variables.mtdBrandDanger
  },

  textWarning: {
    color: variables.mtdBrandWarning
  },

  /**
   * Layout
   */
  row: {
    marginHorizontal: -variables.mtdHSpacingM
  },

  /**
   * hidden
   */
  hidden: {
    position: 'absolute',
    width: 0,
    height: 0
  }
})

export default utils
