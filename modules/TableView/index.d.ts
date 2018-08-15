declare module '@mfe/react-native-tableview' {

    import * as React from 'react';
    import { StyleProp, ViewStyle } from 'react-native';

    /**
     * 表格数据旋转方向
     * 
     * @export
     * @enum {number}
     */
    export enum TABLE_DIRECTION {
        /** 横向显示属性 */
        ROW = "row",
        /** 纵向 */
        COLUMN = "column",
    }

    export interface DataSymbol {
        [key: string]: string | number | any;
    }

    /**
     * tableview 组件 props
     * 
     * @export
     * @interface TableviewProps
     */
    export interface TableviewProps {
        /**
         * 表格标题
         * 
         * @type {string}
         * @memberof TableviewProps
         */

        title?: string;

        /**
         * 表头信息 {key:string: value:any}
         * 
         * @type {DataSymbol}
         * @memberof TableviewProps
         */
        tableTitle: DataSymbol;
        
        /**
         * 表格数据方向
         * 
         * @type {(TABLE_DIRECTION.ROW | TABLE_DIRECTION.COLUMN)}
         * @memberof TableviewProps
         */

        tableDirection: TABLE_DIRECTION.ROW | TABLE_DIRECTION.COLUMN;
       
        /**
         * 表格信息 表头信息的结构化数组
         * 
         * @type {DataSymbol[]}
         * @memberof TableviewProps
         */

        tableData: DataSymbol[];

        /**
         * 是否有边框
         * 
         * @type {boolean}
         * @memberof TableviewProps
         */

        border?: boolean;
        
        /**
         * 边框颜色 '#556677'
         * 
         * @type {string}
         * @memberof TableviewProps
         */

        borderColor?: string;
        
        /**
         * 各个列宽度占比
         * 
         * @type {number[]}
         * @memberof TableviewProps
         */

        flexArr?: number[];
        
        /**
         * 正常的自定义viewstyle
         * 
         * @type {StyleProp<ViewStyle>}
         * @memberof TableviewProps
         */

        style?: StyleProp<ViewStyle>;
    }

    export interface TableviewState {
        tableTitle: DataSymbol;
        tableData: DataSymbol[];
    }


    class TableDataView extends React.Component<TableviewProps, TableviewState> {

        constructor(props: TableviewProps);

        componentDidMount(): void;
        /**
         * 检查表头/表格
         * 数据
         */
        verifyTableData(): void;
        /**
         * 旋转方向
         */
        transformTableDirection(): void;
        /**
         * 渲染行
         */
        renderRow(rowData: DataSymbol, header: boolean, border: boolean): JSX.Element;
        /**
         * 渲染单元格
         */
        renderCell(prop: string, value: any, index: number, border: boolean, header: boolean): JSX.Element;
    }

    export default TableDataView
}
