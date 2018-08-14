import PropTypes from 'prop-types';


export const CheckboxPropTypes = {
    // 标题
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any,
    ]),
    // 预先设定的选中值
    checkedValues: PropTypes.array,
    // label对齐方式
    iconPosition: PropTypes.oneOf(['left','right']),
    // min 最少可选数量
    min: PropTypes.number,
    // max 最多可选数量
    max: PropTypes.number,
    // onChange(Array) 有数值变化的回调,参数是数组
    onChange: PropTypes.func,
    // 是否有全选按钮
    showAllChecked: PropTypes.bool,
    // 被选中时icon的颜色, rn color string
    checkedColor: PropTypes.string,
}


export const CheckboxItemPropTypes = {
    // 显示文本
    label: PropTypes.string.isRequired,
    // 选中时的值, 默认label
    trueValue: PropTypes.any,
    // 未选中的值, 默认undefined
    falseValue: PropTypes.any,
    // 是否禁用
    disabled: PropTypes.bool,
    // 是否勾选
    checked: PropTypes.bool,  
    // 是否显示下划线 
    hasLine: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left','right']),    
}