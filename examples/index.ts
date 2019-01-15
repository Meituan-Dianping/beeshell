import { AppRegistry } from '@mrn/react-native'

// 自定义主题
// 第一步，这个必须放在最前面
import './customTheme'

// 第二步，import 带有组件库的 APP
import App from './App'

// 这里注册 mrnproject 只是举例，可以是全集团不冲突的任意名字
// package.json 中 mrn.moduleName 必须与其保持一致
AppRegistry.registerComponent('roo-mobile-rn', () => App)
