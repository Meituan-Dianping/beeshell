import variables from '../../common/styles/variables'
import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'

const {
  width,
} = Dimensions.get('window')

const FilterPanelStyle = {
  selectPanel: {
    backgroundColor: '#fff',
    width,
  },
  container: {
    width,
  },
  scrollView: {
    backgroundColor: 'white'
  },
  labelWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  labelTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commonText: {
    fontSize: 14,
    color: '#999',
  },
  labelBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFB301',
    width: 55,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  labelBtnText: {
    fontSize: 14,
    color: '#FFB301',
  },
  labelGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  noLabels: {
    textAlign: 'center',
    color: '#333',
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: '#333333',
  },
  btnGroup: {
    height: 70,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopColor: '#D2D2D2',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  basicBtn: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 11,
    marginRight: 11,
    borderColor: '#D2D2D2',
    borderRadius: variables.buttonBorderRadius,
    backgroundColor: '#F9F9F9',
  },
  labelBtnIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  clearBtn: {
    borderColor: '#DEDEDE',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  confirmBtn: {
    borderColor: '#FECB2E',
    backgroundColor: '#FECB2E',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#333333',
  },
  chosenText: {
    color: '#FFB301',
  },
}



const FilterBolckStyles = {
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    color: '#333333',
  },
  titleWrap: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
  },
  showMoreButton: {
    height: 50,
    flexDirection: 'row',
  },
  arrow: {
    width: 14,
    height: 14,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 3
  },
  btnGroup: {
    flexDirection: 'row',
    width,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingRight: 15,
  },
  basicBtn: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 11,
    marginRight: 11,
    borderColor: '#D2D2D2',
    borderRadius: variables.buttonBorderRadius,
    backgroundColor: '#F9F9F9',
  },
  btnIcon: {
    position: 'absolute',
    left: 1,
    top: 12,
    width: 12,
    height: 12,
  },
  basicBtnText: {
    fontSize: 14,
    color: '#333333',
  },
  btnTouched: {
    backgroundColor: '#FFFBF1',
    borderColor: '#FECB2E',
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnTextSelected: {
    color: '#FECB2E',
    fontWeight: 'bold',
  },
  bottomBorder: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
}


export { FilterPanelStyle, FilterBolckStyles }
