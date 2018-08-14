import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { colors } from '../../common/styles/varibles'
const {
	width,
} = Dimensions.get('window');

const unit = {
  onePx: 1 / PixelRatio.get(),
};

const styles = StyleSheet.create({
	container: {
	},

    touchContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

	touchContainerLeft:{
		height: 50,
		width: width - 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	touchContainerRight:{
		height: 50,
		width: width - 20,
		flex: 1,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	hasLine: {
		borderBottomWidth: unit.onePx,
		borderBottomColor: colors.grayLightest,
	},
	label: {
		// flex: 1,
	},
	labelText: {
		fontSize: 16,
		color: colors.gray,
	},
	checkedIcon: {
		height: 14,
		width: 14,
		marginHorizontal: 2,
		marginVertical: 3,
	},
	icon: {
		height: 20,
		width: 20,
		borderRadius: 20 / PixelRatio.get(),
		borderWidth: unit.onePx,
	},
	iconDefault: {
		backgroundColor: '#ffffff',
		borderColor: '#CCCCCC',
	},
	iconDisabled: {
		backgroundColor: colors.grayLighter,
		borderColor: '#CCCCCC',
	},
});

export default styles