import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native'

export enum TABLE_DIRECTION {
  ROW = 'row',
  COLUMN = 'column',
}

export const TableviewPropTypes = {
  title: PropTypes.string, // 表头数据
  tableTitle: PropTypes.object, // 表头数据
  tableDirection: PropTypes.oneOf([TABLE_DIRECTION.ROW, TABLE_DIRECTION.COLUMN]), // 表格方向
  tableData: PropTypes.array, // 表格数据
  border: PropTypes.bool, // 是否显示边框
  borderColor: PropTypes.string,// 边框颜色
  flexArr: PropTypes.arrayOf(PropTypes.number), // 每一列的相对大小 [1,2,3,1]
};


export interface DataSymbol {
   [key: string]: any;
}

export interface TableviewProps {
  // 表头文字
  title?: string;
  // 表头数据
  tableTitle: DataSymbol;
  // 表格方向 枚举
  tableDirection: TABLE_DIRECTION.ROW | TABLE_DIRECTION.COLUMN;
  // 表格数据
  tableData: DataSymbol[];
  // 是否显示边框
  border?: boolean;
  // 边框颜色
  borderColor?: string;
  // 每一列的相对大小 [1,2,3,1]
  flexArr?: number[];
  style?: StyleProp<ViewStyle>;
}
