import 'react-native';
import React from 'react';
import Component from '../modules/TableView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {
    it('basic use', () => {
        const tt = {
            "tableTitle": {
                "title": {
                    "label": "活动",
                    "highlight": "green",
                    "image": "https://p0.meituan.net/deal/201211/23/GOSSELIN.jpg"
                },
                "reduce": {
                    "label": "满减",
                    "highlight": 'coral',
                    "image": null
                },
                "discount": {
                    "label": "折扣",
                    "highlight": null,
                    "image": null
                },
                "newUserDiscount": {
                    "label": "新用户立减",
                    "highlight": null,
                    "image": null
                },
                "specialOffer": {
                    "label": "特价",
                    "highlight": null,
                    "image": null
                },
                "fanQuan": {
                    "label": "返券",
                    "highlight": null,
                    "image": null
                },
                "coupons": {
                    "label": "领券",
                    "highlight": null,
                    "image": null
                }
            },
            "tableDirection": "column",
            "tableData": [
                {
                    "title": {
                        "label": "比格比萨（肖家河店）",
                        "highlight": null,
                        "image": null
                    },
                    "reduce": null,
                    "discount": null,
                    "newUserDiscount": null,
                    "specialOffer": null,
                    "fanQuan": null,
                    "coupons": null
                },
                {
                    "title": {
                        "label": "胡记黄焖鸡米饭",
                        "highlight": null,
                        "image": null
                    },
                    "reduce": null,
                    "discount": null,
                    "newUserDiscount": null,
                    "specialOffer": null,
                    "fanQuan": null,
                    "coupons": null
                }
            ]
        };

        const component = renderer.create(
            <Component
                title={'普通表格'}
                tableTitle={tt.tableTitle}
                tableData={tt.tableData}
                tableDirection={tt.tableDirection}
                border={true}
                flexArr={[3, 2, 2]}
                style={{}}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

