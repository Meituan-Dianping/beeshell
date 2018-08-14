import { View, Text } from 'react-native';
import React from 'react';
import Component from '../components/Longlist';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component
                data={[
                    {label: 1,},
                    {label: 2,},
                ]}
                renderItem={({item, index}) => {
                    return (
                        <View style={{justifyContent: 'center', marginBottom: 10, backgroundColor: '#ccc'}}>
                            <Text style={{paddingHorizontal: 10, paddingVertical: 30, backgroundColor: '#cde'}}>{item.label}</Text>
                        </View>
                    );
                }}
                hasRefreshControl={true}
                onEndReached={() => {
                    return Promise.resolve();
                }}
                onRefresh={() => {
                    return Promise.resolve();
                }}>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();
        instance.onRefresh();
        // instance.onEndReached();
    });
});

