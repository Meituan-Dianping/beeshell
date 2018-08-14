/*
 * @Author: mengqian02 
 * @Date: 2017-11-06 10:00:57 
 * @Last Modified by: mengqian02
 * @Last Modified time: 2018-04-03 15:12:48
 * 用于渲染表格数据
 * tableTitle: {}  字典 通过表头确定唯一顺序
 * tableDirection: row/column 方向 支持整体旋转方向
 * tableData: []  数组, 每一项和一致 tableTitle 一致 是具体数据
 * 支持大小相对布局
 */

import ReactNative, { StyleProp } from 'react-native';
import React, { Component } from 'react';
import { TableviewPropTypes, TableviewProps, DataSymbol, TABLE_DIRECTION } from '../PropTypes'

const {
  Platform,
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
  Image,
} = ReactNative;

const unit = {
  onePx: 1 / PixelRatio.get(),
};


export interface highlightItem {
  [key: string]: string;
}
const HIGHLIGHT: highlightItem = {
  'red': '#FFF5F5',
  'green': '#ECFAF0',
  'blue': '#EEF6FF',
  'yellow': '#FFF7EE',
  'gray': '#F8F8F8',
  'white': '#FFFFFF',
}
export interface TableviewState {
  // 表头数据
  tableTitle: DataSymbol;
  // 表格数据
  tableData: DataSymbol[];
}

interface cellData {
  label: string;
  highlight?: string;
  image?: string;
}

class TableDataView extends React.Component<TableviewProps, TableviewState> {

  styles: any;
  tableHeaderKeys: string[];

  // 因为使用了 泛型 所以不需要定义 static propTypes 了
  // public propTypes = TableviewPropTypes;

  public static defaultProps: Partial<TableviewProps> = {
    title: '',
    tableTitle: {},
    tableDirection: TABLE_DIRECTION.ROW, // 默认 按行渲染
    tableData: [],
    border: true,
    borderColor: '#E0E0E0',
    flexArr: [1, 1, 1, 1],
  };

  constructor(props: TableviewProps) {
    super(props);
    this.state = {
      tableTitle: props.tableTitle,
      tableData: props.tableData
    }
    this.styles = {};
    this.tableHeaderKeys = []; // 利用表头的tableTitle 的顺序约束子元素
    this.verifyTableData();
    // TODO: 这里怎么做 optional 的问题
    this.generateStyles(props.borderColor!)
    this.renderRow = this.renderRow.bind(this)
    this.renderCell = this.renderCell.bind(this)
  }

  generateStyles(borderColor: string) {
    this.styles = StyleSheet.create({
      container: {
        marginBottom: 10,
      },

      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      titleView: {
        paddingHorizontal: 5, 
        paddingVertical: 8,
      },
      titleText: {
        fontSize: 13,
      },
      cell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 35,
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      cellBorder: {
        borderColor: borderColor,
        borderTopWidth: unit.onePx,
        borderLeftWidth: unit.onePx,
      },
      cellText: {
        color: '#333',
      },
      headerText: {
        color: '#666',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        minHeight: 35,
      },
      rowBorder: {
        borderColor: borderColor,
        borderRightWidth: unit.onePx
      },
      table: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      tableBorder: {
        borderColor: borderColor,
        borderBottomWidth: unit.onePx
      },
      header: { 
        backgroundColor: '#f0f0f0'
      },
    })
  }



  componentWillMount() {
    if (this.props.tableDirection === TABLE_DIRECTION.COLUMN) {
      // 选择不同的渲染方式
      this.transformTableDirection();
    }
  }

  /**
   * 检查表头/表格
   * 数据
   */
  verifyTableData() {
    const { tableData, tableTitle, flexArr, tableDirection } = this.props;
    // try {
    if (Object.keys(tableTitle).length !== Object.keys(tableData[0]).length) {
      throw new Error("表格数据和表头数据格式不符合");
    }

    if (Object.keys(tableTitle).length !== flexArr!.length) {
      if (tableDirection === TABLE_DIRECTION.ROW) {
        throw new Error("flexArr 数组长度和表头数据数量不一样");
      } else {
        if (tableData.length + 1 !== flexArr!.length) {
          throw new Error("表格反转之后 flexArr 数组长度和表头数据数量不一样");
        }
      }
    }
  }

  /**
   * 旋转方向
   */
  transformTableDirection() {
    const { tableTitle, tableData, tableDirection } = this.props;
    // 只针对 tableDirection column 的情况
    if (tableDirection === TABLE_DIRECTION.ROW) return;
    let _tableTitle:DataSymbol = {}, _tableData: DataSymbol[] = []
    // 表头的第一个元素
    let titleKeys = Object.keys(tableTitle)
    let topKey: string = titleKeys.shift()!
    let titleOtherKeys = titleKeys

    // 第一个元素
    _tableTitle[`${topKey}_0`] = tableTitle[topKey];
    // 循环
    tableData.forEach((item, index) => {
      _tableTitle[`${topKey}_${index + 1}`] = item[topKey];
    })


    titleOtherKeys.forEach(otherKey => {
      let valuesObj:DataSymbol = {}
      // 第一个元素
      valuesObj[`${otherKey}_0`] = tableTitle[otherKey]
      // 循环
      tableData.forEach((data, index) => {
        valuesObj[`${otherKey}_${index + 1}`] = data[otherKey]
      })
      _tableData.push(valuesObj)
    })

    console.log(_tableData);

    this.tableHeaderKeys = []
    this.setState({
      tableTitle: _tableTitle,
      tableData: _tableData
    })
  }

  /**
   * 获取对应的高亮颜色
   * 
   * @param {string} key 
   * @returns 
   * @memberof TableDataView
   */
  getHighlight(key: string) {
    return HIGHLIGHT[key] ?  HIGHLIGHT[key] : HIGHLIGHT.white; 
  }

  /**
   * 渲染行
   */
  renderRow(rowData: DataSymbol, header: boolean, border: boolean) {
    // 渲染
    let viewArr = [];
    // 循环渲染
    let index = 0
    let rowKey;
    // 通过表头确定唯一顺序
    if (header || this.props.tableDirection === TABLE_DIRECTION.COLUMN) {
      rowKey = Object.keys(rowData)[0];
      const firstCellData:cellData = rowData[rowKey];
      
      let highlightColor: string | boolean;
      // 对象类型 并且有值
      if (typeof firstCellData === 'object' && !Array.isArray(firstCellData) && firstCellData.highlight) {
        highlightColor = this.getHighlight(firstCellData.highlight);
      } else {
        highlightColor = false;
      }

      for (const prop in rowData) {
        viewArr.push(
          this.renderCell(prop, rowData[prop] || '', index, border, header, highlightColor)
        )
        // 第一遍循环表头的时候确定唯一顺序
        this.tableHeaderKeys.push(prop)
        index++;
      }
    } else {
      rowKey = rowData[Object.keys(rowData)[0]];

      for (const prop of this.tableHeaderKeys) {
        viewArr.push(
          this.renderCell(prop, rowData[prop] || '', index, border, header, false)
        )
        index++;
      }
    }

    return (
      <View style={[
        header ? this.styles.header : '',
        this.styles.row,
        border ? this.styles.rowBorder : '',
      ]}
        key={rowKey}
      >
        {viewArr}
      </View>
    )
  }

  /**
   * 
   * 渲染单元格
   *
   * 
   * @param {string} prop 属性key 
   * @param {*} value 值,可能是对象或者string or number
   * @param {number} index 序号
   * @param {boolean} border 是否渲染border
   * @param {boolean} header 是否是表头行
   * @param {(string|boolean)} highLightColor 高亮背景色 
   * @returns 
   * @memberof TableDataView
   */
  renderCell(prop: string, value: any, index: number, border: boolean, header: boolean, highLightColor: string|boolean) {
    const flexValue = this.props.flexArr![index];
    
    // 支持红绿高亮
    let trueValue: any
    if(typeof value === 'object' && !Array.isArray(value) ){
      console.log(value);
      trueValue = value.image || value.label || '';
    } else {
      trueValue = value;
    }
    return (
      <View style={[
        border ? this.styles.cellBorder : '',
        this.styles.cell,
        { flex: flexValue || 1 },
        highLightColor ? {backgroundColor: highLightColor} : null
      ]}
        key={prop}
      >
        {
          value.image
          ? <Image source={{uri: value.image}} 
              style={{width: 30, height: 30}}
            />
          :<Text style={[
              this.styles.cellText, 
              header ? this.styles.headerText : null
            ]}>
              {trueValue || '无'}
          </Text>
        }
        
      </View>
    )
  }


  render(): JSX.Element {
    const self = this
    const { border } = this.props
    return (
      <View style={[this.styles.container, this.props.style!]}>
        {this.props.title
          ? <View style={this.styles.titleContainer}>
            <View style={[this.styles.titleView]}>
              <Text style={this.styles.titleText}>{this.props.title}</Text>
            </View>
          </View>
          : null
        }

        <View style={[this.styles.table, border ? this.styles.tableBorder : '']}>
          {/* 表头 */}
          {this.renderRow(this.state.tableTitle, true, border!)}
          {/* 表身 */}
          {this.state.tableData.map(item => {
            return self.renderRow(item, false, border!)
          })}
        </View>
      </View>
    );
  }
}

export default TableDataView;