/**
 * Created by mengqian02 on 2017-08-09.
 * 使用新的 ConfirmModal 渲染的 兼容老用法
 */

import React from 'react';
import ConfirmModal from '../Modal/extensions/ConfirmModal';

const AlertInterface = {
  instance: null,
  alert(title, body, buttons, options) {
    const cancelable = options && typeof options.cancelable === 'boolean' ? options.cancelable : false;
    const autoCloseOnPress = options && typeof options.autoCloseOnPress === 'boolean' ? options.autoCloseOnPress : true;
    const cancelTitle = buttons && buttons[0] ? buttons[0].text : '取消';
    // 兼容老逻辑, 老逻辑采用 text 来判断
    let cancelCallback;
    if(buttons && buttons[0] && buttons[0].text) {
      cancelCallback = buttons[0].onPress ? buttons[0].onPress : () => {};  
    }
    
    const confirmTitle = buttons && buttons[1] ? buttons[1].text : '确认';

    // 兼容老逻辑, 老逻辑采用 text 来判断
    let confirmCallback;
    if(buttons && buttons[1] && buttons[1].text) {
      confirmCallback = buttons[1].onPress ? buttons[1].onPress : () => {};  
    }

    let props = {
      ...ConfirmModal.defaultProps,
      title,
      body,
      cancelable,
      autoCloseOnPress,
      cancelTitle,
      confirmTitle,
      cancelCallback,
      confirmCallback,
    }

    if(typeof body !== 'string') {
      delete props.body;
      props.children = body;
    }

    this.instance = new ConfirmModal(props);
    this.instance.open();
  },
  close() {
    this.instance.close();
  },
};

export default AlertInterface;