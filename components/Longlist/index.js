import ReactNative from 'react-native';
import React from 'react';

const {
    FlatList,
    Text,
    StyleSheet,
    Platform,
    RefreshControl,
    View,
    ActivityIndicator,
} = ReactNative;

let flatListRef;

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    }
});

export default class Longlist extends React.Component {
    // static propTypes = {
    //     renderRow: PropTypes.func.isRequired,
    //     onEndReached: PropTypes.func.isRequired,
    //     onRefresh: PropTypes.func,
    //     pageTotal: PropTypes.number.isRequired,
    //     noDataText: PropTypes.string,
    //     hasRefreshControl: PropTypes.bool,
    //     onDataEmpty: PropTypes.func,
    //     noDataTextColor: PropTypes.string,
    // };

    static defaultProps = {
        hasRefreshControl: true,
        initialNumToRender: 5,
    };

    constructor(props) {
        super(props);

        this.pageNo = 1;
        this.timeoutId = null;

        this.state = {
            refreshing: false,
            loading: false,
        };
    }


    componentWillReceiveProps(nexProps) {
        // console.log(nexProps == this.props);
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate');
    }


    onEndReached() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.setState({
                loading: true,
            }, () => {
                const pageNo = ++this.pageNo;
                const timeoutId = this.timeoutId;


                this.props.onEndReached(pageNo).then(() => {
                    console.log(`Load pageNo: ${pageNo} success.`);
                    this.setState({
                        loading: false
                    });
                    // console.log(timeoutId);
                }).catch((e) => {
                    --this.pageNo;
                    this.setState({
                        loading: false
                    });
                });
            });

        }, 1000);

        // console.log('onEndReached', this.timeoutId);
    }

    onRefresh() {

        this.setState({
            refreshing: true
        }, () => {
            this.pageNo = 1;

            this.props.onRefresh(this.pageNo).then(() => {
                this.setState({
                    refreshing: false,
                });
            }).catch(() => {
                this.setState({
                    refreshing: false,
                });
            });
        });
    }

    render() {
        // console.log('render FlatList', this.props.data.length);

        const { refreshing } = this.state;
        const props = this.props;

        if (!props.data || !props.data.length) {
            return null;
        }

        const retProps = {
            ...props,
        };

        if (!props.hasRefreshControl) {
            delete retProps.refreshing;
            delete retProps.onRefresh
        } else {
            retProps.refreshing = refreshing;
            retProps.onRefresh = this.onRefresh.bind(this);
        }

        return (
            <View style={{flex: 1}}>
                <FlatList
                    {...retProps}
                    ref={(c) => {
                        flatListRef = c;
                    }}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    initialNumToRender={this.props.initialNumToRender}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={0.1}
                />
                {
                    this.state.loading ?
                    <View
                        style={styles.loadingIndicator}>

                        <ActivityIndicator
                            size="small"
                            color="#333"
                        />
                    </View>: null
                }
            </View>
        );
    }
}