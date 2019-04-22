import { useTheme } from '../src/common/styles/variables'

// 获取自定义主题的变量
// 以下是示例
const customTheme = {
  mtdBrandPrimary: '#ffd800',
  mtdBrandPrimaryDark: '#FFA000',
  mtdBrandSuccess: '#61cb28',
  mtdBrandWarning: '#ff8400',
  mtdBrandDanger: '#f23244',
  mtdBrandInfo: '#188afa'
}

const tmp = useTheme(customTheme)
export default tmp
