// 所有的组件示例
import Button from './Button'
import Icon from './Icon'

import NavigationBar from './NavigationBar'

import Form from './Form'
import Input from './Input'
import Radio from './Radio'
import Checkbox from './Checkbox'
import Switch from './Switch'

import Scrollpicker from './Scrollpicker'


import Modal from './Modal'
import Dialog from './Dialog'
import Tip from './Tip'

import SlideModal from './SlideModal'
import Actionsheet from './Actionsheet'
import BottomModal from './BottomModal'
import Picker from './Picker'



// import Dropdown from './Dropdown'

import Tab from './Tab'
import Progress from './Progress'
// import Select from './Select'

// import Toast from './Toast'
// import Stepper from './Stepper'

// import Cascader from './Cascader'

import Badge from './Badge'
// import Rate from './Rate'
// import Loading from './Loading'
// import Slider from './Slider'
import Carousel from './Carousel'


// import Popover from './Popover'
// import Calendar from './Calendar'
// import Tags from './Tags'
// yarn new import 的占位

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
    screen: () => {},
    key: 'Slider',
    group: 'dataEntry',
    label: '滑块'
  },
  {
    screen: () => {},
    key: 'Rate',
    group: 'dataEntry',
    label: '评分'
  },
  {
    screen: () => {},
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
    screen: () => {},
    key: 'Tags',
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
    screen: () => {},
    key: 'Longlist',
    group: 'dataDisplay',
    label: '长列表'
  },

  {
    screen: () => {},
    key: 'FilterPanel',
    group: 'dataDisplay',
    label: '筛选器'
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


  // {
  //   screen: Tab,
  //   key: 'Tab',
  //   label: '选项卡'
  // },
  // {
  //   screen: Checkbox,
  //   key: 'Checkbox',
  //   label: '复选框'
  // },
  // {
  //   screen: Radio,
  //   key: 'Radio',
  //   label: '单选框'
  // },
  // {
  //   screen: Slider,
  //   key: 'Slider',
  //   label: '滑块'
  // },
  // {
  //   screen: Form,
  //   key: 'Form',
  //   label: '表单'
  // },
  // {
  //   screen: Input,
  //   key: 'Input',
  //   label: '输入框'
  // },
  // {
  //   screen: Cascader,
  //   key: 'Cascader',
  //   label: '级联菜单'
  // },
  // {
  //   screen: Rate,
  //   key: 'Rate',
  //   label: '评分'
  // },
  // {
  //   screen: Stepper,
  //   key: 'Stepper',
  //   label: '计数器'
  // },
  // {
  //   screen: NavigationBar,
  //   key: 'NavigationBar',
  //   label: '导航栏'
  // },
  // {
  //   screen: Carousel,
  //   key: 'Carousel',
  //   label: '轮播'
  // },
  // {
  //   screen: Select,
  //   key: 'Select',
  //   label: '选择框'
  // },
  // {
  //   screen: Badge,
  //   key: 'Badge',
  //   label: '角标'
  // },
  // {
  //   screen: Progress,
  //   key: 'Progress',
  //   label: '进度条'
  // },
  // {
  //   screen: Loading,
  //   key: 'Loading',
  //   label: '加载'
  // },
  // {
  //   screen: Tags,
  //   key: 'Tags',
  //   label: '标签集合'
  // },
  // {
  //   screen: Popover,
  //   key: 'Popover',
  //   label: '下拉选择'
  // },
  // {
  //   screen: Toast,
  //   key: 'Toast',
  //   label: '小提示'
  // },
  // {
  //   screen: Calendar,
  //   key: 'Calendar',
  //   label: '日历'
  // },
  // // 下面是基础组件，名字需要商榷一些
  // // 可以展示出来，但 example 要求统一漂亮一点～

  // {
  //   screen: Dropdown,
  //   key: 'Dropdown',
  //   label: '业务组件'
  // }
  // yarn new pageList 的占位
]
