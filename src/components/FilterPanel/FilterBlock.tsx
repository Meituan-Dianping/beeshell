import ReactNative from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const {
    View,
    Text,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Platform,
} = ReactNative;

const Global = {
    onePx: 1 / PixelRatio.get(),
};

const arrowUpImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAAEhcmxxAAAAAXNSR0IArs4c6QAAAKpJREFUKBW1kMENwyAMReMoDJAZkBJG6ACdpvu0y2SBjgBIHFigPXJAgvqTkqCoxwYp2N9+OB+6rl1a67zqLbPWXltkzxmJUFRZInrs7UNG0N77MYTw+vasUmo+cH+RsNYa7zGVi4bDkFJaYAS13hhz5zhBYDXu1sI5O//2hu/X9PJSteGcm2KMT9bFMMe3EOIipbSVKbfLOQ88cWEYt6wwmBE19MDUQ+fGD3o4U/foiBT3AAAAAElFTkSuQmCC'
const arrowDownImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAAEhcmxxAAAAAXNSR0IArs4c6QAAAKlJREFUKBVjYMAObt265cIIkrpx48Z/DCWMMFFGRsZpYFmgwG8MZcgCYMMePnwo+P3793dQiVsaGhrqyIooZDPevHlz6v///7OQzQHawcikrq6eDRS8BZPg5OQUgrHBNMj9ID+jCA4MBxxSQF+wAN2zHUhjdRMw4Peoqal5Auk/YA0wt969e1ft9+/fJ4B8QajYe1ZWVgtlZWW472FqUWhg2GWBMIoguRwAMRlAK55SmUIAAAAASUVORK5CYII='
const checkIcon = require('./imgs/check.png')
const plusIcon = require('./imgs/plus.png')
const {
    width,
} = Dimensions.get('window');

// 通过测量判断的2行菜单的高度
const MAX_HEIGHT = Platform.OS === 'ios' ? 96 : 104;

const dynamicStyle =  StyleSheet.create({
    container: {
        maxHeight: MAX_HEIGHT ,
        overflow: 'hidden',
    },
    expandContainer: {
        maxHeight: null,
    }
});

const styles = StyleSheet.create({
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
    arrow:{
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
        borderRadius: Global.onePx * 4,
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
        borderWidth: Global.onePx,
    },
    btnTextSelected: {
        color: '#FECB2E',
        fontWeight: 'bold',
    },
    bottomBorder: {
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: Global.onePx,
    },
});
class FilterBlock extends PureComponent {
    static propTypes = {
        type: PropTypes.number.isRequired, //是否支持多选, 1:支持 0:不支持
        blockData: PropTypes.array,
        blockTitle: PropTypes.string,
        value: PropTypes.array,
        hasBottomBorder: PropTypes.bool,
        isEditing: PropTypes.bool,
        setSelectedValue: PropTypes.func,
        selectedBlockStyle: PropTypes.object,
        selectedTextStyle: PropTypes.object,
        activeExpand: PropTypes.bool, // 激活2行折叠功能
    };

    static defaultProps = {
        selectedBlockStyle: {},
        selectedTextStyle: {},
        isEditing: false,
        activeExpand: false
    }

    constructor(props) {
        super(props);
        this.state = {
            showMoreButton: false, // 展示更多按钮
            viewExpand: false // 是否扩展显示
        };

        this.showMore = this.showMore.bind(this)
        this.measureContent = this.measureContent.bind(this)
    }

    renderBtns() {
        const { blockData, value, type, isEditing } = this.props
        if (!blockData || blockData.length === 0) {
            return null;
        }

        return blockData.map((btn) => {
            const isSelected = value.indexOf(btn.label_id) > -1
            let btnIcon = null
            if (isEditing) {
                if (isSelected) {
                    btnIcon = <Image style={styles.btnIcon} source={checkIcon} />
                } else {
                    btnIcon = <Image style={styles.btnIcon} source={plusIcon} />
                }
            }
            return (
                <TouchableOpacity
                    key={btn.label_id}
                    style={[
                        styles.basicBtn,
                        isSelected && styles.btnTouched,
                        isSelected && this.props.selectedBlockStyle,
                    ]}
                    onPress={() => {
                        const selectedValue = [...value]

                        blockData.forEach((item) => {
                            if (type === 0) {
                                if (item.label_id === btn.label_id && !isSelected) {
                                    selectedValue.push(item.label_id)
                                } else {
                                    const indexOf = selectedValue.indexOf(item.label_id);
                                    if(indexOf >= 0){
                                        selectedValue.splice(indexOf , 1)
                                    }
                                }
                            } else {
                                if (item.label_id === btn.label_id) {
                                    if (isSelected) {
                                        const indexOf = selectedValue.indexOf(item.label_id);
                                        if(indexOf >= 0){
                                            selectedValue.splice(indexOf , 1)
                                        }
                                    } else {
                                        selectedValue.push(item.label_id)
                                    }
                                }
                            }
                        });
                        this.setState({
                            blockData,
                        });
                        if (this.props.setSelectedValue) {
                            this.props.setSelectedValue(selectedValue);
                        }
                    }}
                >
                    {btnIcon}
                    <Text
                        style={[
                            styles.basicBtnText,
                            isSelected && styles.btnTextSelected,
                            isSelected && this.props.selectedTextStyle,
                        ]}
                    >
                        {btn.label_name}
                    </Text>
                </TouchableOpacity>
            );
        });
    }

    measureContent(x) {
        if(!this.props.activeExpand) return;
        const {width, height} = x.nativeEvent.layout;
        const contentSize = {width, height};
        // console.log(this.props.blockTitle, contentSize);
        if(height > MAX_HEIGHT) {
            this.setState({showMoreButton: true})
        }
    }

    // 处理显示更多的逻辑
    showMore() {
        let viewExpand = this.state.viewExpand;
        this.setState({ viewExpand : !viewExpand })
    }


    render() {
        const { blockTitle, type } = this.props
        return (
            <View
                style={[
                    styles.container,
                    this.props.hasBottomBorder && styles.bottomBorder,
                ]}
            >
                <View style={styles.titleWrap}>
                    <Text style={styles.title}>{`${blockTitle}（${type === 0 ? '单选' : '多选'}）`}</Text>
                    { this.state.showMoreButton ?
                        <TouchableOpacity onPress={this.showMore} style={styles.showMoreButton}>
                        {
                            this.state.viewExpand ?
                            <Image
                            source={{uri:arrowUpImg, scale: 1}}
                            style={styles.arrow}/>
                            : <Image
                            source={{uri:arrowDownImg, scale: 1}}
                            style={styles.arrow}/>
                        }
                        {
                            this.state.viewExpand ?
                            <Text>收起</Text>
                            : <Text>展开</Text>
                        }
                        </TouchableOpacity>
                        : null
                    }

                </View>
                <View style={[
                        styles.btnGroup,
                        this.state.showMoreButton ? dynamicStyle.container : '',
                        this.state.viewExpand ? dynamicStyle.expandContainer: ''
                    ]}
                    onLayout={this.measureContent.bind(this)}
                >
                    {this.renderBtns()}
                </View>
            </View>
        );
    }
}

export default FilterBlock;
