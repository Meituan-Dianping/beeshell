/*
 * @Author: mengqian02
 * @Date: 2018-11-20 11:26:57
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import cascaderStyles from './styles'

const styles = StyleSheet.create<any>(cascaderStyles)
import { Icon } from '../Icon'

// 输入类型的props
export interface CascaderItemProps {
  // 显示值
  label?: string
  // 具体值
  value: string | number | undefined
  // 子元素数组
  children?: CascaderItemProps[],
  // 是否选中
  selected?: boolean
  // 层级
  level?: number
}

/**
 * 级联词典 props
 */
export interface CascaderProps {
  // 数据列表
  options: CascaderItemProps[]
  // 选中值value数组
  assignedOption?: number[]
  // 最终列选择回调(非sync时有效)
  onConfirm?: (value: CascaderItemProps[]) => void
  // 选择时回调
  onChange?: (value: CascaderItemProps[]) => void
  // 异步调用数据接口
  onSyncData?: (value: CascaderItemProps) => Promise<CascaderItemProps[]>
  // 宽度占比
  flexCols?: number[]
  // 自定义 structKeys
  structKeys?: string[]
  // 自动添加全部, 允许用户模糊选择
  autoAddEntire?: boolean
  // 单独一项样式
  itemStyle?: any
  // 单独一项选中样式
  itemSelectedStyle?: any
  // 整体style
  style?: any
  renderItem?: Function
}

interface CascaderState {
  currentSelected: string
  menuList: CascaderItemProps[][]
}

const DEFAULT_LABEL = 'label'
const DEFAULT_VALUE = 'value'
const DEFAULT_CHILDREN = 'children'

export class Cascader extends Component<CascaderProps, CascaderState> {
  // 声明类属性
  static displayName = 'Cascader'
  static defaultProps = {
    options: [],
    onConfirm: () => {
      return
    },
    onChange: () => {
      return
    },
    assignedOption: [],
    onSyncData: undefined,
    structKeys: undefined,
    autoAddEntire: false // 是否自动添加全部
  }

  // 声明实例属性
  selectedChain = []
  isInit = false
  maxLevel = 0
  syncMenu = []
  LABEL = ''
  VALUE = ''
  CHILDREN = ''

  constructor (props) {
    super(props)

    this.state = {
      currentSelected: '请选择',
      menuList: []
    }

    // structKeys key值转换
    let structKeysBool = this.props.structKeys && this.props.structKeys.length === 3 ? true : false
    if (this.props.structKeys && this.props.structKeys.length < 3) {
      throw new Error('structKeys 设置了, 但没有设置全')
    }
    this.LABEL = structKeysBool ? this.props.structKeys[0] : DEFAULT_LABEL
    this.VALUE = structKeysBool ? this.props.structKeys[1] : DEFAULT_VALUE
    this.CHILDREN = structKeysBool ? this.props.structKeys[2] : DEFAULT_CHILDREN
  }

  componentDidMount () {
    if (this.props.options && this.props.options.length > 0 && !this.isInit) {
      this.init(this.props.options)
    } else {
      // 异步接口自动请求多次 需要用户指定assignedOption
      if (this.props.onSyncData && this.props.assignedOption && this.props.assignedOption.length > 0) {
        // 开始执行递归
        this.onSyncMakeRecursion(0, this.props.assignedOption, this.syncMenu)
      } else {
        // 第一次调用
        this.props.onSyncData && this.props.onSyncData({ level: 0, label: '', value: '' }).then((menu) => {
          this.init(menu)
        }, (res) => {
          console.log('has no children can not render')
          this.onSelectFinish(this.selectedChain)
        })
      }
    }

    this.selectedChain = []
  }

  /**
   * 递归构造异步请求回来的数据结构
   * @param {number} level
   * @param {any} options
   * @param {any} theMenus
   * @memberof Cascader
   */
  onSyncMakeRecursion (level: number, options, theMenus) {
    const self = this
    // 退出机制
    if (level < options.length) {
      const params = {
        level: level,
        value: level <= 0 ? undefined : options[level - 1]
      }
      this.props.onSyncData(params).then((menu) => {
        // 赋值
        [].push.apply(theMenus, menu)
        // console.log(self.syncMenu)
        let theSelItem = theMenus.filter(item => item[self.VALUE] === options[level])[0]
        // console.log(theSelItem);
        if (theSelItem) {
          theSelItem[self.CHILDREN] = []
          this.onSyncMakeRecursion(level + 1, options, theSelItem[self.CHILDREN])
        } else {
          if (options[level] === -1) {
            this.onSyncMakeRecursion(level + 1, options, [])
          }
        }
      }).catch(e => {
        console.log(e)
      })
    } else {
      console.log('构造完毕')
      console.log(self.syncMenu)
      self.init(self.syncMenu)
    }
  }

  /**
   * 自动打开
   */
  autoOpen () {
    const self = this
    // 根据assignedOption获得选中的值
    let selectedChain = []
    const menuList = this.state.menuList[0]

    // 判断第一列菜单
    if (this.props.assignedOption && this.selectedChain.length === 0 && menuList.length > 0) {

      // 递归寻找
      let recursion = function (ele, assign) {
        if (ele && ele.length > 0 && assign && assign.length > 0) {
          let firstElement = assign.shift()
          let target = ele.filter((item) => {
            return item.value === firstElement
          })[0]
          selectedChain.push(target)
          // 自动打开
          if (target && target.level > 0 && target.children && target.children.length > 0) {
            self.showNextLevel(target, true)
            recursion(target.children, assign)
          }
        }
      }

      // 开始执行递归
      recursion(menuList, this.props.assignedOption)
    }
  }

  init (theTree: CascaderItemProps[]) {
    let menu: CascaderItemProps[] = []
    // clone theTree
    let tree = theTree.map(a => ({ ...a }))

    // 构造数据
    this.addLevelForTree(tree, 0, this.props.assignedOption)

    // verify
    this.verifyCascaderData()

    // 插入默认的顶级的全部选项
    if (this.props.autoAddEntire) {
      menu.push({
        label: '全部',
        value: -1,
        level: 1,
        selected: false
      })
    }

    tree.forEach((item) => {
      item.selected = false
      menu.push(item)
    })

    this.setState({
      menuList: [menu]
    }, () => {
      // onSyncData 异步加载的情况也支持 autoOpen 自动打开
      this.props.assignedOption && this.autoOpen()
    })
    this.isInit = true

  }

  /**
   * 验证设置是否合法
   * @memberof Cascader
   */
  verifyCascaderData () {
    if (this.props.flexCols) {
      // 只有在静态数据的时候校验是否和树的最大深度匹配
      if (this.props.flexCols.length !== this.maxLevel && !this.props.onSyncData) {
        throw new Error('flexCols 数组长度和表格最大列数不一致')
      }
    }
  }

  /**
   * 增加level信息
   * @param {array} list 总表
   * @param {number} level 层级
   * @param {array} assignedOption 默认选中值
   * @memberof Cascader
   */
  addLevelForTree (list, level, assignedOption) {
    list.forEach((item) => {
      item.selected = false

      // structKeys key值转换
      item.label = item[this.LABEL]
      item.value = item[this.VALUE]
      item.children = item[this.CHILDREN]

      // 删除冗余key
      if (this.props.structKeys) {
        if (this.LABEL !== DEFAULT_LABEL) delete item[this.LABEL]
        if (this.VALUE !== DEFAULT_VALUE) delete item[this.VALUE]
        if (this.CHILDREN !== DEFAULT_CHILDREN) delete item[this.CHILDREN]
      }

      if (assignedOption && assignedOption.length > 0) {
        let assignedId = assignedOption[level]
        item.selected = assignedId === item.value ? true : false
      }

      item.level = level + 1
      // 获取全局最大子树深度
      this.maxLevel = this.maxLevel >= item.level ? this.maxLevel : item.level
      if (item.children && item.children.length > 0) {
        this.addLevelForTree(item.children, item.level, assignedOption)
      }
    })
  }

  /**
   * 选择完成回调
   *
   * @param {CascaderItemProps[]} selectedChain
   * @memberof Cascader
   */
  onSelectFinish (selectedChain: CascaderItemProps[]) {
    let labels = selectedChain.map((selectedItem) => {
      return { label: selectedItem.label, value: selectedItem.value }
    })

    this.props.onConfirm && this.props.onConfirm(labels)
    this.props.onChange && this.props.onChange(labels)
  }

  onSelectChange (selectedChain: CascaderItemProps[]) {
    let labels = selectedChain.map((selectedItem) => {
      return { label: selectedItem.label, value: selectedItem.value }
    })

    this.props.onChange && this.props.onChange(labels)
  }

  /**
   * 切换 分类的时候 会后续做清除
   * @param {any} item
   * @param {any} event
   * @memberof Cascader
   */
  showNextLevel = (item, isAutoOpen = false) => {
    // console.log(item);
    let temp = this.state.menuList
    // 重置链条
    this.selectedChain[item.level - 1] = item
    // 只取前 item.level 个
    this.selectedChain = this.selectedChain.slice(0, item.level)
    // 同级的清空状态
    temp[item.level - 1].forEach((theItem) => {
      theItem.selected = false
    })
    // 点击的选中
    item.selected = true

    // 判断是有有children
    let hasChildren = false
    if (item.children && item.children.length > 0) {
      hasChildren = true
    }

    // 数据截断的时候不会有 children
    if (hasChildren) {
      let menu = []
      // 插入上一级的全部选项
      if (this.props.autoAddEntire) {
        menu.push({
          label: '全部',
          value: -1,
          level: item.level + 1,
          selected: false
        })
      }

      item.children.forEach((theItem) => {
        if (!isAutoOpen) {
          theItem.selected = false
        }
        menu.push(theItem)
      })

      temp[item.level] = menu
      // 删掉后面所有的列
      if (temp[item.level + 1] && temp[item.level + 1].length > 0) {
        temp.splice(item.level + 1, temp.length)
      }
      this.setState({
        menuList: temp
      })

      // 触发 onSelectChange
      this.onSelectChange(this.selectedChain)

    } else {
      /**
       * 数据截断 ======== 异步请求
       */
      if (this.props.onSyncData) {
        this.props.onSyncData(item).then((menu) => {

          menu.forEach((ele) => {
            ele.level = item.level + 1
            ele.selected = false
            // structKeys key值转换
            ele.label = ele[this.LABEL]
            ele.value = ele[this.VALUE]

            // 删除冗余key
            if (this.props.structKeys) {
              if (this.LABEL !== DEFAULT_LABEL) delete item[this.LABEL]
              if (this.VALUE !== DEFAULT_VALUE) delete item[this.VALUE]
              if (this.CHILDREN !== DEFAULT_CHILDREN) delete item[this.CHILDREN]
            }
          })
          if (this.props.autoAddEntire) {
            menu.unshift({
              label: '全部',
              value: -1,
              level: item.level + 1,
              selected: false
            })
          }

          // 判断 level
          temp[item.level] = menu
          // 删掉后面所有的列
          if (temp[item.level + 1] && temp[item.level + 1].length > 0) {
            temp.splice(item.level + 1, temp.length)
          }
          this.setState({
            menuList: temp
          })
        }, (res) => {
          console.log('has no children can not render')
          if (temp[item.level] && temp[item.level].length > 0) {
            temp.splice(item.level, temp.length)
          }
          this.setState({
            menuList: temp
          })
          this.onSelectFinish(this.selectedChain)
        })
      } else {
        // 如果没有设置 onSyncData
        // 删掉后面所有的列
        if (temp[item.level] && temp[item.level].length > 0) {
          temp.splice(item.level, temp.length)
        }
        this.setState({
          menuList: temp
        })
        this.onSelectFinish(this.selectedChain)
      }
    }
  }

  // 只支持 {label,value,children[{label,value}]} 的结构体
  renderList (datasource: CascaderItemProps[]) {
    const valueString = datasource[0].value && datasource[0].value.toString() || ''
    const genKey = `${datasource[0].level}-${valueString}`
    console.log('genKey', genKey)
    const flexStyle = this.props.flexCols ? {
      flex: this.props.flexCols[datasource[0].level - 1] || 1
    } : {}
    // console.log(flexStyle)
    return (
      <View style={[styles.cascaderMenu, flexStyle]} key={genKey}>
        <ScrollView>
          {datasource.map((item) => {
            return this.renderListItem.bind(this, item)()
          })}
        </ScrollView>
      </View>
    )
  }

  removeKeyStartsWith (obj, letter) {
    Object.keys(obj).forEach(function (key) {
      // with regex
      if (key.match('^' + letter)) delete obj[key]
    })
  }

  // 渲染单独的一块
  renderListItem (item) {
    let hasChildren = false
    // 异步情况下不显示 hasChildren 右侧箭头
    if (item && item.children && item.children.length > 0 && !this.props.onSyncData) {
      hasChildren = true
    }

    // 区分view 和 text 的style属性 删掉text的backgroundColor和view的color
    let itemViewStyle: any = {}
    let itemTextStyle: any = {}
    let itemSelectedViewStyle: any = {}
    let itemSelectedTextStyle: any = {}

    if (this.props.itemStyle) {
      itemViewStyle = Object.assign({}, this.props.itemStyle)
      delete itemViewStyle.color
      this.removeKeyStartsWith(itemViewStyle, 'font')

      itemTextStyle = Object.assign({}, this.props.itemStyle)
      delete itemTextStyle.backgroundColor
      this.removeKeyStartsWith(itemTextStyle, 'border')
    }

    if (this.props.itemSelectedStyle) {
      itemSelectedViewStyle = Object.assign({}, this.props.itemSelectedStyle)
      delete itemSelectedViewStyle.color
      this.removeKeyStartsWith(itemSelectedViewStyle, 'font')

      itemSelectedTextStyle = Object.assign({}, this.props.itemSelectedStyle)
      delete itemSelectedTextStyle.backgroundColor
      this.removeKeyStartsWith(itemSelectedTextStyle, 'border')
    }

    return (
      <TouchableOpacity
        onPress={this.showNextLevel.bind(this, item, false)}
        key={item.value}
      >

      {
        this.props.renderItem ? this.props.renderItem(item) :
        <View style={[styles.cascaderMenuItem,
          this.props.itemStyle && itemViewStyle,
          hasChildren ? styles.cascaderMenuItemHasChildren : '',
          item.selected ? styles.cascaderMenuItemSelected : '',
          item.selected && this.props.itemSelectedStyle ? itemSelectedViewStyle : ''
        ]}
        >
          <Text style={[styles.cascaderMenuText,
            this.props.itemStyle && itemTextStyle,
            item.selected ? styles.cascaderMenuTextSelected : '',
            item.selected && this.props.itemSelectedStyle ? itemSelectedTextStyle : ''
          ]}
            ellipsizeMode={'middle'}
          >
            {item.label}
          </Text>

          { // 有子节点的样式
            hasChildren ?
              <Icon type={'caret-right'} size={13} style={styles.childIcon} tintColor={'lightgray'} />
              : null
          }
        </View>
      }
      </TouchableOpacity>
    )
  }

  render () {

    return (
      <View style={[this.props.style]}>
        <ScrollView
          contentContainerStyle={styles.cascContainer}>
          {this.state.menuList.map((menu) => {
            return this.renderList(menu)
          })}
        </ScrollView>
      </View>
    )
  }
}
