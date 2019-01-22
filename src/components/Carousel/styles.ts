import variables from '../../common/styles/variables'

export default {
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    flex: 1
  },
  wrapperIOS: {
    backgroundColor: 'transparent'
  },
  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1
  },
  slide: {
    backgroundColor: 'transparent'
  },
  paginationX: {
    position: 'absolute',
    bottom: variables.carouselPaginationVSpacing,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  paginationY: {
    position: 'absolute',
    right: variables.carouselPaginationHSpacing,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
}
