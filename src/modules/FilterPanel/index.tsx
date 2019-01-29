import React, { Component } from 'react'
import FilterBlock from './FilterBlock'
import { Icon } from '../../components/Icon'


import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ViewStyle,
  RegisteredStyle,
} from 'react-native'

const {
  width, height
} = Dimensions.get('window')

import { FilterPanelStyle } from './styles'
const styles = StyleSheet.create<any>(FilterPanelStyle)

export interface FilterPanelProps {
  filterPanelInfo: any[],
  hasCommonLabals?: boolean,
  onClear?: () => void,
  onConfirm?: (result: any, filterPanelInfo: any) => void,
  commonLabels?: any[],
  modyfyCommonLabels?: (labels: string) => void,
  panelMaxHeight?: number,
  panelMinHeight?: number,
  panelHeight?: number,
  selectedBlockStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  selectedTextStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  activeExpand?: boolean,
}

const processInfo = (info) => {
  if (!info || !info.length) return {}
  const labelMap = {}
  const selectedArr = []
  const infoArr = []
  for (let cIdx = 0, cLen = info.length; cIdx < cLen; cIdx++) {
    const { items } = info[cIdx]
    selectedArr[cIdx] = []
    infoArr[cIdx] = []
    for (let lIdx = 0, lLen = items.length; lIdx < lLen; lIdx++) {
      const { label_id, label_name, selected } = items[lIdx]
      labelMap[label_id] = label_name
      infoArr[cIdx].push(label_id)
      if (selected) {
        selectedArr[cIdx].push(label_id)
      }
    }
  }
  return {
    labelMap,
    selectedArr,
    infoArr,
  }
}

const getCategoryIdx = (arr, id) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i].indexOf(id) > -1) return i
  }
  return -1
}

export class FilterPanel extends Component<FilterPanelProps, any> {

  static defaultProps = {
    commonLabels: [],
    modyfyCommonLabels: () => { },
    hasCommonLabals: false,
    panelMaxHeight: height - 124,
    panelMinHeight: 0,
    activeExpand: false,
  }

  private labelIdToName = {}
  private labelInfoArr = []

  constructor(props) {
    super(props)

    const { labelMap, infoArr, selectedArr } = processInfo(props.filterPanelInfo)

    this.labelIdToName = labelMap || {}
    this.labelInfoArr = infoArr || []
    this.state = {
      isEditing: false,
      selectedArr: selectedArr || [], // 跟info结构对应的两层数据
      editingLabels: [],
      editingSelects: [],
    }
  }

  renderPanelItem = () => {
    const { filterPanelInfo } = this.props
    if (!filterPanelInfo || (filterPanelInfo && filterPanelInfo.length === 0)) {
      return null
    }

    const { selectedArr, editingSelects, isEditing } = this.state
    return filterPanelInfo.map((filterBlock, index) => (
      <FilterBlock
        activeExpand={this.props.activeExpand}
        hasBottomBorder
        type={filterBlock.support_muti_choice || 0}
        value={isEditing ? editingSelects[index] : selectedArr[index]}
        blockData={filterBlock.items}
        blockTitle={filterBlock.category_name}
        id={filterBlock.category_id}
        isEditing={isEditing}
        key={filterBlock.category_id}
        selectedBlockStyle={this.props.selectedBlockStyle}
        selectedTextStyle={this.props.selectedTextStyle}
        setSelectedValue={(selectedValue) => {
          // 初始化选中的时候, 填充单独一项的 selectedCondition
          // console.log(filterBlock.category_name, selectedValue)
          if (isEditing) {
            const editingSelectedNew = [...editingSelects]
            editingSelectedNew[index] = selectedValue
            this.setState({
              editingSelects: editingSelectedNew,
              editingLabels: [].concat(...editingSelectedNew),
            })
          } else {
            const selectedNewArr = [...selectedArr]
            selectedNewArr[index] = selectedValue
            this.setState({
              selectedArr: selectedNewArr,
            })
          }
        }}
      />
    ))
  }

  resetFilterPanelInfoBySelected = () => {
    const { selectedArr } = this.state
    const newInfo = JSON.parse(JSON.stringify(this.props.filterPanelInfo))
    newInfo.forEach((filterBlock, index) => {
      filterBlock.items.forEach((label) => {
        if (selectedArr[index].indexOf(label.label_id) < 0) {
          label.selected = false
        } else {
          label.selected = true
        }
      })
    })
    return newInfo
  }

  deleteLabel = (id) => {
    const cIdx = getCategoryIdx(this.labelInfoArr, id)

    if (cIdx < 0) return // 如果常用标签跟下面的标签不对应
    const newSelects = [...this.state.editingSelects]
    const lIdx = newSelects[cIdx].indexOf(id) // 按道理讲应该不会是-1
    newSelects[cIdx].splice(lIdx, 1)
    this.setState({
      editingSelects: newSelects,
      editingLabels: [].concat(...newSelects),
    })
  }

  toggleMode = () => {
    const { isEditing, editingLabels } = this.state
    const { commonLabels, modyfyCommonLabels } = this.props
    if (isEditing) {
      const commonBars = []
      for (let i = 0, len = editingLabels.length; i < len; i++) {
        const id = editingLabels[i]
        commonBars.push(`${id}:${this.labelIdToName[id]}`)
      }
      modyfyCommonLabels(commonBars.join(','))
      this.setState({
        isEditing: false,
      })
    } else {
      const editingLabels = commonLabels.map(label => label.label_id) // 待编辑的所有常用便签
      const editingSelects = [] // 跟info结构对应的常用标签数组，便于传入FilterBlock
      for (let i = 0, cLen = this.labelInfoArr.length; i < cLen; i++) {
        editingSelects[i] = []
        const labels = this.labelInfoArr[i]
        for (let j = 0, lLen = labels.length; j < lLen; j++) {
          if (editingLabels.indexOf(labels[j]) > -1) {
            editingSelects[i].push(labels[j])
          }
        }
      }
      this.setState({
        isEditing: true,
        editingLabels,
        editingSelects,
      })
    }
  }

  selectLabel = (id) => {
    const { filterPanelInfo } = this.props
    const { selectedArr } = this.state
    const cIdx = getCategoryIdx(this.labelInfoArr, id)
    const selectedNewArr = [...selectedArr]

    if (cIdx < 0) return // 如果常用标签跟下面的标签不对应
    const curIdx = selectedNewArr[cIdx].indexOf(id)

    if (curIdx >= 0) {  // 当前点击的标签是否已选择
      selectedNewArr[cIdx].splice(curIdx, 1)
    } else {
      if (!filterPanelInfo[cIdx].support_muti_choice) { // 如果是单选类型
        selectedNewArr[cIdx] = []
      }
      selectedNewArr[cIdx].push(id)
    }

    this.setState({
      selectedArr: selectedNewArr,
    })
  }

  renderEditPart = () => {
    const { hasCommonLabals, commonLabels } = this.props
    const { editingLabels, selectedArr, isEditing } = this.state
    const selectedCondition = [].concat(...selectedArr)

    if (!hasCommonLabals) return null
    if (isEditing) {
      return (
        <View style={styles.labelWrapper}>
          <View style={styles.labelTitle}>
            <Text style={styles.commonText}>常用标签（最多可设置10个常用标签）</Text>
            <TouchableOpacity style={styles.labelBtn} onPress={this.toggleMode}>
              <Text style={styles.labelBtnText}>完成</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelGroup}>
            {editingLabels.map((labelId) => (
              <View key={labelId} style={styles.basicBtn}>
                <TouchableOpacity style={styles.labelBtnIcon} onPress={() => { this.deleteLabel(labelId) }}>
                  <Icon type={'times-circle'} size={14} style={styles.closeIcon} tintColor={'lightgray'} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{this.labelIdToName[labelId]}</Text>
              </View>
            ))}
          </View>
        </View>
      )
    }
    return (
      <View style={styles.labelWrapper}>
        <View style={styles.labelTitle}>
          <Text style={styles.commonText}>常用标签</Text>
          <TouchableOpacity style={styles.labelBtn} onPress={this.toggleMode}>
            <Text style={styles.labelBtnText}>编辑</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelGroup}>
          {!commonLabels || !commonLabels.length ? <Text style={styles.noLabels}>暂无常用标签，点击编辑按钮设置</Text> :
            commonLabels.map((label) => (
              <TouchableOpacity
                key={label.label_id}
                style={styles.basicBtn}
                onPress={() => this.selectLabel(label.label_id)}
              >
                <Text
                  style={[
                    styles.labelText,
                    selectedCondition.indexOf(label.label_id) > -1 && styles.chosenText
                  ]}
                >{label.label_name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    )
  }

  render() {
    let { panelMaxHeight, panelMinHeight } = this.props
    let usePanelHeight = false

    if (this.props.filterPanelInfo.length === 0) {
      return null
    }

    if (this.props.panelHeight !== undefined) {
      panelMaxHeight = this.props.panelHeight
      panelMinHeight = this.props.panelMinHeight
      usePanelHeight = true
    }

    return (
      <View style={styles.container}>
        <View style={[
          styles.selectPanel,
          { maxHeight: panelMaxHeight, minHeight: panelMinHeight },
          usePanelHeight && { height: this.props.panelHeight },
        ]}
        >
          <ScrollView style={styles.scrollView}>
            {this.renderEditPart()}
            {this.renderPanelItem()}
          </ScrollView>
          {this.state.isEditing ? null :
            <View style={styles.btnGroup}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  const newArr = this.state.selectedArr.map(() => [])
                  this.setState({
                    selectedArr: newArr,
                  })

                  if (this.props.onClear) {
                    this.props.onClear()
                  }
                }}
              >
                <Text style={styles.btnText}>清除条件</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  const selectedCondition = [].concat(...this.state.selectedArr)
                  const result = selectedCondition.join(',')
                  const filterPanelInfo = this.resetFilterPanelInfoBySelected()
                  if (this.props.onConfirm) {
                    this.props.onConfirm(result, filterPanelInfo)
                  }
                }}
              >
                <Text style={styles.btnText}>确定</Text>
              </TouchableOpacity>
            </View>}
        </View>
      </View>
    )
  }
}
