import variables from '../../common/styles/variables'
import {
  StyleSheet
} from 'react-native'

export default {
  form: {
    backgroundColor: '#fff'
  },
  title: {
    paddingHorizontal: variables.mtdHSpacingL,
    paddingTop: variables.mtdVSpacingL,
    paddingBottom: variables.mtdVSpacingL - 5,
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayDarker
  },
  label: {
    minWidth: variables.formItemLabelWidth,
    marginRight: variables.formItemLabelMarginRight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: {
    fontSize: variables.mtdFontSizeM
  },

  indicator: {
    paddingLeft: variables.mtdHSpacingL
  },

  line: {
    marginLeft: variables.mtdHSpacingL,
    height: StyleSheet.hairlineWidth,
    backgroundColor: variables.mtdGrayLightest
  },

  formItem: {
    paddingHorizontal: variables.formItemHSpacing,
    paddingVertical: variables.formItemVSpacing
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  control: {
    flex: 1
  },

  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  validationView: {
    color: variables.mtdBrandDanger,
    fontSize: variables.mtdFontSizeS
  }
} as any
