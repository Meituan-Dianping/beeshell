import React, { ReactElement } from 'react'
import {
  View,
  ViewStyle,
  Text,
  TouchableOpacity
} from 'react-native'
import variables from '../../common/styles/variables'
import Tree from '../../common/utils/Tree'
import { Icon } from '../../components/Icon'
import treeViewStyles from './styles'

export interface TreeViewProps {
  style?: ViewStyle
  activeIcon?: ReactElement<any>
  inactiveIcon?: ReactElement<any>
  data?: any[]
  dataStructureType?: string
  fieldKeys?: any
  onPress?: Function
}

export class TreeView extends React.Component<TreeViewProps, any> {

  static defaultProps = {
    style: {},
    activeIcon: <Icon source={require(`../../common/images/icons/angle-down.png`)} tintColor={variables.mtdGrayBase}></Icon>,
    inactiveIcon: <Icon source={require(`../../common/images/icons/angle-right.png`)} tintColor={variables.mtdGrayBase}></Icon>,
    data: [],
    dataStructureType: 'nested',
    fieldKeys: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.init(props)
    }
  }

  init (props) {
    const { dataStructureType, data } = props
    const fieldKeys = this.getFieldKeys(props)

    const tree = new Tree({
      type: dataStructureType,
      ...fieldKeys,
      data
    }).getData()

    return {
      tree
    }
  }

  getFieldKeys(props?) {
    props = props || this.props
    const fieldKeys = props.fieldKeys || {}
    return {
      idKey: fieldKeys.idKey || 'id',
      pIdKey: fieldKeys.pIdKey || 'pId',
      labelKey: fieldKeys.labelKey || 'label',
      childrenKey: fieldKeys.childrenKey || 'children',
      activeKey: fieldKeys.activeKey || 'active',
      checkedKey: fieldKeys.checkedKey || 'checked',
      disabledKey: fieldKeys.disabledKey || 'disabled'
    }
  }

  handlePress = (item) => {
    this.props.onPress && this.props.onPress(item)
    const { tree } = this.state
    const fieldKeys = this.getFieldKeys()
    let index = null
    tree.some((treeItem, treeIndex) => {
      if (treeItem[fieldKeys.idKey] === item[fieldKeys.idKey]) {
        index = treeIndex
        return true
      }
    })
    const tmpTree = tree.concat()
    tmpTree.splice(index, 1, {
      ...item,
      [fieldKeys.activeKey]: !item[fieldKeys.activeKey]
    })

    this.setState({
      tree: tmpTree
    })
  }

  renderItem (data?, level?) {
    const { tree } = this.state
    const { activeIcon, inactiveIcon } = this.props
    const fieldKeys = this.getFieldKeys()
    if (!data) {
      data = tree.filter((item) => {
        return item[fieldKeys.pIdKey] == null
      })
    }
    level = level || 1

    return (
      <View>
        {
          data.map((item, index) => {
            const children = tree.filter((treeItem) => {
              return treeItem[fieldKeys.pIdKey] === item[fieldKeys.idKey]
            })
            return (
              <View
                key={index}
                style={[
                  {
                    marginLeft: 20 * (level - 1)
                  }
                ]}>
                <TouchableOpacity
                  style={[treeViewStyles.item ]}
                  onPress={this.handlePress.bind(this, item)}>
                  {
                    children.length && <View style={treeViewStyles.itemIcon}>
                      {item[fieldKeys.activeKey] ? activeIcon : inactiveIcon}
                    </View>
                  }
                  <Text style={[treeViewStyles.itemText]}>{item[fieldKeys.labelKey]}</Text>
                </TouchableOpacity>
                {children.length && !!item[fieldKeys.activeKey] ? this.renderItem(children, level + 1) : null}
              </View>
            )
          })
        }
      </View>
    )

  }

  render () {
    return (
      <View
        style={[treeViewStyles.container, this.props.style]}>
        {this.renderItem()}
      </View>
    )
  }
}
