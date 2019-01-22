import variables from '../../common/styles/variables'

export default {
  wrapper: {
    flexDirection: 'row'
  },
  textWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF301A'
  },
  textContent: {
    color: '#fff',
    fontSize: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF301A'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 24,
    borderBottomWidth: 24,
    borderLeftWidth: 24,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF301A',
    borderLeftColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    transform: [
      {
        rotate: '45deg'
      }
    ]
  },
  textTriangle: {
    position: 'absolute',
    top: 10,
    fontSize: variables.mtdFontSizeXs,
    color: '#fff'
  }
}
