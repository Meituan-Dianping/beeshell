import { useTheme } from '../src/common/styles/variables'

// 获取自定义主题的变量
// 以下是示例
const customTheme = {
  // mtdBrandPrimary: '#FFB000',
  // mtdGrayBase: '#333333'
  // buttonBorderRadius: 30
}

const tmp = useTheme(customTheme)
export default tmp
