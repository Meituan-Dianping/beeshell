import PropTypes from 'prop-types';

export const CascaderPropTypes = {
  options: PropTypes.shape(CascaderItemPropTypes), // 数据列表
  assignedOption: PropTypes.shape(CascaderItemPropTypes), // 默认选中值
  onConfirm: PropTypes.func, // 确认调用
  onChange: PropTypes.func, // 用户选择层级等时调用
  onSyncData: PropTypes.func, // 异步调用数据接口
  flexCols: PropTypes.arrayOf(PropTypes.number), // 宽度占比
  structKeys: PropTypes.arrayOf(PropTypes.string), // structKeys
  itemStyle: PropTypes.any, // 单独一项样式
  itemSelectedStyle: PropTypes.any, // 单独一项选中样式
  autoAddEntire: PropTypes.bool, // 自动添加全部, 允许用户模糊选择
};

export const CascaderItemPropTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.shape(CascaderItemPropTypes),
};