import PropTypes from 'prop-types';


export const RadioPropTypes = {
    // 标题
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any,
    ]),
    // 预先设定的选中值
    // checkedValue: PropTypes.string,
    // icon对齐方式
    iconPosition: PropTypes.oneOf(['left','right']),
    // onChange(Array) 有数值变化的回调,参数是数组
    onChange: PropTypes.func,
    // 被选中时icon的颜色, rn color string
    selectedColor: PropTypes.string,
}


export const RadioItemPropTypes = {
    // 显示文本
    label: PropTypes.string.isRequired,
    // 选中时的值, 默认label
    trueValue: PropTypes.any,
    // 是否禁用
    disabled: PropTypes.bool,
    // 是否勾选
    checked: PropTypes.bool,  
    // 是否显示下划线 
    hasLine: PropTypes.bool,
    // icon对齐方式
    iconPosition: PropTypes.oneOf(['left','right']),
}