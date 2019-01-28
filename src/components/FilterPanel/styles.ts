import variables from '../../common/styles/variables'
import {
  StyleSheet,
  Dimensions,
} from 'react-native'

const {
  width,
} = Dimensions.get('window')

export default {
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
    borderTopWidth: Global.onePx,
  },
  basicBtn: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 11,
    marginRight: 11,
    borderColor: '#D2D2D2',
    borderRadius: Global.onePx * 4,
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
