import React, { Component, ReactNode } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native'

import { Icon } from '../../components/Icon'

export interface SelectPanelProps {
  selectPanelInfo: any[],
  onSelected: (choice: ChoiceType, selectPanelInfo: any[]) => void,
  selectedIcon: ReactNode,
  selectedTextColor: string,
  panelMaxHeight: number,
  choiceHeight: number,
  textSize: number,
  isRightSideText: boolean,
}

export interface ChoiceType {
  isSelected: boolean,
  rightText: string,
  text: string,
  id: string,
}

import selectPanelStyles from './styles'
const styles = StyleSheet.create<any>(selectPanelStyles)

class SelectPanel extends Component <SelectPanelProps, any> {
  static defaultProps = {
    selectedIcon: <Icon type={'check'} size={14} style={styles.closeIcon} tintColor={'lightgray'} />,
    selectedTextColor: '#FECB2E',
    panelMaxHeight: 271,
    choiceHeight: 45,
    textSize: 14,
    selectPanelInfo: [],
    isRightSideText: false,
  }

  renderPanelItem() {
    if (!this.props.selectPanelInfo || this.props.selectPanelInfo.length === 0) {
      return null
    }
    return this.props.selectPanelInfo.map((choice) => {
      const icon = choice.isSelected ? this.props.selectedIcon : null
      let rightSide = icon
      if (this.props.isRightSideText) {
        rightSide = (
          <Text
            style={[
              styles.basicSelectText,
              choice.isSelected && { color: this.props.selectedTextColor },
              { fontSize: this.props.textSize }
            ]}
          >
            {choice.rightText}
          </Text>
        )
      }

      return (
        <TouchableOpacity
          style={[styles.selectItem, { height: this.props.choiceHeight }]}
          key={'choice' + choice.id}
          onPress={() => {
            const selectPanelInfo =
              JSON.parse(JSON.stringify(this.props.selectPanelInfo))
            selectPanelInfo.forEach((selectItem) => {
              selectItem.isSelected = selectItem.id === choice.id
            })

            if (this.props.onSelected) {
              this.props.onSelected(choice, selectPanelInfo)
            }
          }}
        >
          <Text
            style={[
              styles.basicSelectText,
              choice.isSelected && { color: this.props.selectedTextColor },
              { fontSize: this.props.textSize }
            ]}
          >
            {choice.text}
          </Text>
          {rightSide}
        </TouchableOpacity>
      )
    })
  }

  render() {
    if (!this.props.selectPanelInfo || this.props.selectPanelInfo.length === 0) {
      return null
    }
    const panelItems = this.renderPanelItem()
    return (
      <View style={styles.container}>
        <View style={[styles.selectPanel, { maxHeight: this.props.panelMaxHeight }]}>
          <ScrollView>
            {panelItems}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export { SelectPanel }
