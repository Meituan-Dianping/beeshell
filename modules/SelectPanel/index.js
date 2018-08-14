import ReactNative from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const {
    View,
    Text,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
} = ReactNative;

const {
    width,
    height,
} = Dimensions.get('window');

const Global = {
    onePx: 1 / PixelRatio.get(),
};

const styles = StyleSheet.create({
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
        borderBottomWidth: Global.onePx,
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
});
class SelectPanel extends Component {
    static propTypes = {
        selectPanelInfo: PropTypes.array,
        onSelected: PropTypes.func,
        selectedIcon: PropTypes.element,
        selectedTextColor: PropTypes.string,
        panelMaxHeight: PropTypes.number,
        choiceHeight: PropTypes.number,
        textSize: PropTypes.number,
        isRightSideText: PropTypes.bool,
    };

    static defaultProps = {
        selectedIcon: <Image source={require ('./images/defaultIcon.png')} style={styles.defaultPic} />,
        selectedTextColor: '#FECB2E',
        panelMaxHeight: 271,
        choiceHeight: 45,
        textSize: 14,
        selectPanelInfo: [],
        isRightSideText: false,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderPanelItem() {
        if (!this.props.selectPanelInfo || this.props.selectPanelInfo.length === 0) {
            return null;
        }
        return this.props.selectPanelInfo.map((choice) => {
            const icon = choice.isSelected ? this.props.selectedIcon : null;
            let rightSide = icon;
            if (this.props.isRightSideText) {
                rightSide = (
                    <Text
                        style={[
                            styles.basicSelectText,
                            choice.isSelected && { color: this.props.selectedTextColor },
                            {fontSize: this.props.textSize}
                        ]}
                    >
                        {choice.rightText}
                    </Text>
                );
            }

            return (
                <TouchableOpacity
                    style={[styles.selectItem, {height: this.props.choiceHeight}]}
                    key={'choice' + choice.id}
                    onPress={() => {
                        const selectPanelInfo =
                            JSON.parse(JSON.stringify(this.props.selectPanelInfo));
                        selectPanelInfo.forEach((selectItem) => {
                            selectItem.isSelected = selectItem.id === choice.id;
                        });

                        if (this.props.onSelected) {
                            this.props.onSelected(choice, selectPanelInfo);
                        }
                    }}
                >
                    <Text
                        style={[
                            styles.basicSelectText,
                            choice.isSelected && { color: this.props.selectedTextColor },
                            {fontSize: this.props.textSize}
                        ]}
                    >
                        {choice.text}
                    </Text>
                   {rightSide}
                </TouchableOpacity>
            );
        });
    }

    render() {
        if (!this.props.selectPanelInfo || this.props.selectPanelInfo.length === 0) {
            return null;
        }
        const panelItems = this.renderPanelItem();
        return (
            <View style={styles.container}>
                <View style={[styles.selectPanel, {maxHeight: this.props.panelMaxHeight}]}>
                    <ScrollView>
                        {panelItems}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default SelectPanel;
