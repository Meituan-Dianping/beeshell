// 所有的组件示例
import Button from './Button'
import Icon from './Icon'

import Form from './Form'
import Input from './Input'
import Radio from './Radio'

import Actionsheet from './Actionsheet'

// import Checkbox from './Checkbox'
// import Modal from './Modal'
// import SlideModal from './SlideModal'

// import Scrollpicker from './Scrollpicker'
// import Dialog from './Dialog'
// import Dropdown from './Dropdown'

// import Tab from './Tab'
// import Progress from './Progress'
// import Select from './Select'
// import NavigationBar from './NavigationBar'
// import Tip from './Tip'
// import Toast from './Toast'
// import Stepper from './Stepper'
// import Switch from './Switch'
// import Cascader from './Cascader'

// import Badge from './Badge'
// import Rate from './Rate'
// import Loading from './Loading'
// import Slider from './Slider'
// import Carousel from './Carousel'

// import Picker from './Picker'
// import Popover from './Popover'
// import Calendar from './Calendar'
// import Tags from './Tags'

// import BottomModal from './BottomModal'
// yarn new import 的占位

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
    screen: () => {},
    key: 'Radio',
    group: 'dataEntry',
    label: '单选'
  },

  {
    screen: () => {},
    key: 'Checkbox',
    group: 'dataEntry',
    label: '多选'
  },
  {
    screen: () => {},
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
    screen: () => {},
    key: 'Carousel',
    group: 'dataDisplay',
    label: '轮播'
  },

  {
    screen: () => {},
    key: 'Progress',
    group: 'dataDisplay',
    label: '进度条'
  },

  {
    screen: () => {},
    key: 'Badge',
    group: 'dataDisplay',
    label: '角标'
  },

  {
    screen: () => {},
    key: 'Tag',
    group: 'dataDisplay',
    label: '标签'
  },

  {
    screen: () => {},
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
    screen: Actionsheet,
    key: 'Actionsheet',
    group: 'feedback',
    label: '行动面板'
  },

  // {
  //   screen: BottomModal,
  //   key: 'BottomModal',
  //   label: '半页弹窗'
  // },
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
  //   screen: Scrollpicker,
  //   key: 'Scrollpicker',
  //   label: '滚动选择'
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
  //   screen: Dialog,
  //   key: 'Dialog',
  //   label: '对话框'
  // },
  // {
  //   screen: Form,
  //   key: 'Form',
  //   label: '表单'
  // },
  // {
  //   screen: Switch,
  //   key: 'Switch',
  //   label: '开关'
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
  //   screen: Picker,
  //   key: 'Picker',
  //   label: '筛选'
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
  //   screen: Tip,
  //   key: 'Tip',
  //   label: '顶部提示'
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
  //   screen: Modal,
  //   key: 'Modal',
  //   label: '底层类'
  // },
  // {
  //   screen: SlideModal,
  //   key: 'SlideModal',
  //   label: '底层类'
  // },
  // {
  //   screen: Dropdown,
  //   key: 'Dropdown',
  //   label: '业务组件'
  // }
  // yarn new pageList 的占位
]
