function adjustFont(fontSize, times) {
    return {
        fontSize,
        lineHeight: parseInt(fontSize * (times || 1.2), 10),

        // For Android；在 iOS 中无效，所以设置倍数过高可能导致中文文本垂直不居中，而英文是居中的，可以在中后面加一个 &nbsp; 使得中文垂直居中！！！！
        textAlignVertical: 'center',  
    }
}


export default {
    adjustFont,
}