import variables from '../../common/styles/variables'

export default {
  container: {
    backgroundColor: variables.mtdFillBase
  },

  scrollWrapper: {
    flexDirection: 'row'
  },

  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: variables.mtdVSpacingXL,
    paddingHorizontal: variables.mtdHSpacingXL
  },

  text: {
    fontSize: variables.mtdFontSizeM,
    color: variables.mtdGray
  },

  line: {
    position: 'absolute',
    bottom: 0,
    width: 25,
    height: 2,
    backgroundColor: '#fff'
  }
}
