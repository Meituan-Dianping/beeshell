import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const {
    width,
} = Dimensions.get('window');

import { colors } from '../../common/styles/varibles';

const styles = StyleSheet.create({
    container: {
    },
    touchContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'flex-start',
    },

    hasLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLightest,
    },
    label: {
        flex: 1,
    },
    labelText: {
        fontSize: 16,
        color: colors.grayDark,
    },
    checkedIcon: {
        height: 16,
        width: 16,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    icon: {
        // marginLeft: 5,
        // marginRight: 10,
        height: 20,
        width: 20,
    },
    iconDefault: {
        // backgroundColor: '#ffffff',
    },
    iconDisabled: {
        // backgroundColor: '#D9D9D9',
    },
    iconChecked: {
        // backgroundColor: colors.brandPrimary,
    },
});

export default styles