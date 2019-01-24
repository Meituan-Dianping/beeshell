import variables from '../../common/styles/variables'

export default {
  container: {
    backgroundColor: variables.mtdFillBase
  },

  scrollWrapper: {
    flexDirection: 'row'
  },

  item: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: variables.mtdVSpacingXXL,
    paddingHorizontal: variables.mtdHSpacingL
  },

  text: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGrayBase
  },

  line: {
    position: 'absolute',
    bottom: 0,
    width: 25,
    height: 2,
    marginTop: variables.mtdVSpacingXXL - 1,
    backgroundColor: '#fff'
  }
}
