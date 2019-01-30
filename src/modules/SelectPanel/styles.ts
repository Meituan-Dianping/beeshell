import variables from '../../common/styles/variables'
import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'

const {
  width,
} = Dimensions.get('window')


const SelectPanelStyle = {
  selectPanel: {
    backgroundColor: '#fff',
    width,
  },
  selectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  basicSelectText: {
    color: '#333333',
    fontSize: 14,
  },
  container: {
    width,
  },
  icon: {
    color: '#FECB2E',
  },
  defaultPic: {
    height: 12,
    width: 16,
    marginRight: 15,
  }
}


export default SelectPanelStyle
