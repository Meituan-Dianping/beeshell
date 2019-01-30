// 所有的组件示例
import Button from './Button'
import Icon from './Icon'

import NavigationBar from './NavigationBar'

import Form from './Form'
import Input from './Input'
import Radio from './Radio'
import Checkbox from './Checkbox'
import Switch from './Switch'
import Slider from './Slider'
import Rate from './Rate'
import Stepper from './Stepper'
import Scrollpicker from './Scrollpicker'
import Calendar from './Calendar'
import Cascader from './Cascader'

import Modal from './Modal'
import Dialog from './Dialog'
import Tip from './Tip'
import SlideModal from './SlideModal'
import Actionsheet from './Actionsheet'
import BottomModal from './BottomModal'
import Picker from './Picker'

import Tab from './Tab'
import Progress from './Progress'
import Longlist from './Longlist'
import FilterPanel from './FilterPanel'
import Dropdown from './Dropdown'
import Badge from './Badge'
import Tag from './Tag'
import Carousel from './Carousel'

console.disableYellowBox = true

export const pageList = [
  {
    screen: Button,
    key: 'Button',
    group: 'general',
    label: '按钮'
  },

  {
    screen: Icon,
    key: 'Icon',
    group: 'general',
    label: '图标'
  },

  {
    screen: NavigationBar,
    key: 'NavigationBar',
    group: 'navigation',
    label: '导航条'
  },

  {
    screen: Form,
    key: 'Form',
    group: 'dataEntry',
    label: '表单'
  },

  {
    screen: Input,
    key: 'Input',
    group: 'dataEntry',
    label: '输入框'
  },

  {
    screen: Radio,
    key: 'Radio',
    group: 'dataEntry',
    label: '单选'
  },

  {
    screen: Checkbox,
    key: 'Checkbox',
    group: 'dataEntry',
    label: '多选'
  },
  {
    screen: Switch,
    key: 'Switch',
    group: 'dataEntry',
    label: '开关'
  },
  {
    screen: Slider,
    key: 'Slider',
    group: 'dataEntry',
    label: '滑块'
  },
  {
    screen: Rate,
    key: 'Rate',
    group: 'dataEntry',
    label: '评分'
  },
  {
    screen: Stepper,
    key: 'Stepper',
    group: 'dataEntry',
    label: '计步器'
  },

  {
    screen: Scrollpicker,
    key: 'Scrollpicker',
    label: '滚动选择',
    group: 'dataEntry'
  },

  {
    screen: Calendar,
    key: 'Calendar',
    label: '日历',
    group: 'dataEntry'
  },

  {
    screen: Cascader,
    key: 'Cascader',
    label: '级联菜单',
    group: 'dataEntry'
  },


  {
    screen: Carousel,
    key: 'Carousel',
    group: 'dataDisplay',
    label: '轮播'
  },

  {
    screen: Progress,
    key: 'Progress',
    group: 'dataDisplay',
    label: '进度条'
  },

  {
    screen: Badge,
    key: 'Badge',
    group: 'dataDisplay',
    label: '角标'
  },

  {
    screen: Tag,
    key: 'Tag',
    group: 'dataDisplay',
    label: '标签'
  },

  {
    screen: Tab,
    key: 'Tab',
    group: 'dataDisplay',
    label: '标签页'
  },

  {
    screen: Longlist,
    key: 'Longlist',
    group: 'dataDisplay',
    label: '长列表'
  },

  {
    screen: FilterPanel,
    key: 'FilterPanel',
    group: 'other',
    label: 'FilterPanel'
  },

  {
    screen: Modal,
    key: 'Modal',
    label: '基础弹窗',
    group: 'feedback'
  },

  {
    screen: Dialog,
    key: 'Dialog',
    label: '对话框',
    group: 'feedback'
  },

  {
    screen: Tip,
    key: 'Tip',
    label: '弹窗提示',
    group: 'feedback'
  },

  {
    screen: SlideModal,
    key: 'SlideModal',
    label: '拉动弹窗',
    group: 'feedback'
  },
  {
    screen: Actionsheet,
    key: 'Actionsheet',
    group: 'feedback',
    label: '行动面板'
  },

  {
    screen: BottomModal,
    key: 'BottomModal',
    label: '半页弹窗',
    group: 'feedback'
  },

  {
    screen: Picker,
    key: 'Picker',
    label: '筛选',
    group: 'feedback'
  },

  {
    screen: Dropdown,
    key: 'Dropdown',
    label: 'Dropdown',
    group: 'other'
  }
]
