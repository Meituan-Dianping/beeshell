import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  PixelRatio,
} from 'react-native'
import { CascaderPropTypes } from './PropTypes'
import { colors } from '../../common/styles/varibles'

const screen = Dimensions.get('window');
const arrowRightImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAAXNSR0IArs4c6QAAAOZJREFUOBFjYBgFjMhBcPjwYf2/f/+uZ2RkrLC3t1+FLIeLzYQsAdRc8f//f0UgXnrw4MEwZDlcbBQDODk5c4AKLwINYCHWEBQvgGw5efKk8Ldv3/YCmfpAr/wB4mh83sEwgFRDsBpAiiE4DSDWELwGEGMISiyANKADc3Pzt0xMTHUgcWjs1CKrIWgAMD1YATUugWp6CmQHIhuA1wtQzTuAmniBmp4CsYOjo+MdogwgRjPIIKwuIFYzVgNI0YxhAKmaQQagxAIwsDLwBRhIAzpgQRZgYWHJ/vPnz2egIf3ooY2sbpixAWXdrhToqsrKAAAAAElFTkSuQmCC';

class Cascader extends Component {
  // static PropTypes = CascaderPropTypes;
  static defaultProps = {
    options: [],
    onConfirm: (selected) => {

    },
    onChange: (selected) => {

    },
    assignedOption: undefined,
    onSyncData: undefined,
    structKeys: undefined,
    autoAddEntire: false, // 是否自动添加全部
  }

  constructor(props) {
    super(props);

    this.state = {
      currentSelected: '请选择',
      showList: this.props.showList,
      menuList: [], // 展示用的menulist 用于展示平级数据
    };
    this.selectedChain = [];
    this.isInit = false;
    this.maxLevel = 0;
    this.syncMenu = [];

    // structKeys key值转换
    let structKeysBool = this.props.structKeys && this.props.structKeys.length === 3 ? true : false;
    if(this.props.structKeys && this.props.structKeys.length < 3) {
      throw new Error('structKeys 设置了, 但没有设置全')
    }

    this.LABEL = structKeysBool ? this.props.structKeys[0] : 'label';
    this.VALUE = structKeysBool ? this.props.structKeys[1] : 'value';
    this.CHILDREN = structKeysBool ? this.props.structKeys[2] : 'children';
    this.onSyncMakeRecursion = this.onSyncMakeRecursion.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (this.props.options && this.props.options.length > 0 && !this.isInit) {
      this.init(this.props.options);
    } else {
      // 异步接口自动请求多次 需要用户指定assignedOption
      if (this.props.onSyncData && this.props.assignedOption && this.props.assignedOption.length > 0) {

        // 开始执行递归
        this.onSyncMakeRecursion(0, this.props.assignedOption, self.syncMenu);
      } else {
        this.props.onSyncData({ level: 0, value: undefined}).then((menu) => {
          self.init(menu);
        }, (res) => {
          console.log('has no children can not render');
          self.onSelectFinish(self.selectedChain);
        })
      }
    }

    this.selectedChain = [];
  }

  /**
   * 递归构造异步请求回来的数据结构
   * 
   * @param {any} level 
   * @param {any} options 
   * @param {any} theMenus 
   * @memberof Cascader
   */
  onSyncMakeRecursion(level, options, theMenus) {
    const self = this
    // 退出机制
    if(level < options.length ) {
      const params = { 
        level: level, 
        value: level <= 0 ? undefined : options[level-1]
      }

      this.props.onSyncData(params).then((menu) => {
        // 赋值
        [].push.apply(theMenus, menu);
        
        // console.log(self.syncMenu)
        let theSelItem = theMenus.filter( item => item[self.VALUE] === options[level])[0];
        // console.log(theSelItem);
        if(theSelItem) {
          theSelItem[self.CHILDREN] = [];
          this.onSyncMakeRecursion(level+1, options, theSelItem[self.CHILDREN]);
        } else {
          if( options[level] === -1 ) {
            this.onSyncMakeRecursion(level+1, options, []);
          }
        }
      })
    } else {
      console.log('构造完毕')
      console.log(self.syncMenu)
      self.init(self.syncMenu);
    }
  }


  autoOpen() {
    const self = this;
    // 根据assignedOption获得选中的值
    let _selectedChain = [];
    const menuList = this.state.menuList[0]

    if (this.props.assignedOption && this.selectedChain.length == 0 && menuList.length > 0) {

      let content = '';

      // 递归寻找
      var recursion = function (ele, _assign) {
        if (ele && ele.length > 0 && _assign && _assign.length > 0) {
          let firstElement = _assign.shift()
          let target = ele.filter((item) => {
            return item.value === firstElement
          })[0]
          _selectedChain.push(target);
          // 自动打开
          if (target && target.level > 0 && target.children && target.children.length > 0) {
            self.showNextLevel(target, true)
            recursion(target.children, _assign)
          }
        }
      }

      // 开始执行递归
      recursion(menuList, this.props.assignedOption);
      console.log(_selectedChain);
      // content = _selectedChain.map((item)=>{ return item.label}).join('/');

    }
  }

  /**
   * 数据转换函数用于转换单层数据
   * TODO:
   * @param {any} label 
   * @param {any} value 
   * @param {any} children 
   * @returns 
   * 
   * @memberof Cascader
   */
  transformTreeData(label, value, children) {
    // return new Tree();
    // 放置在 renderContent 之前
  }

  init(_tree) {
    let menu = [];
    // clone _tree
    let tree = _tree.map(a => ({ ...a }));

    // 构造数据
    this.addLevelForTree(tree, 0, this.props.assignedOption);

    // verify
    this.verifyCascaderData()

    // 插入默认的顶级的全部选项
    if(this.props.autoAddEntire) {
      menu.push({
        label: '全部',
        value: -1,
        level: 1,
        selected: false
      });
    }
    
    tree.forEach((item) => {
      item.selected = false;
      menu.push(item)
    })

    this.setState({
      menuList: [menu]
    }, () => {
      // onSyncData 异步加载的情况也支持 autoOpen 自动打开
      this.props.assignedOption && this.autoOpen(menu);
    })
    this.isInit = true;

  }

  /**
   * 验证设置是否合法
   * 
   * @memberof Cascader
   */
  verifyCascaderData() {
    if (this.props.flexCols) {
      // 只有在静态数据的时候校验是否和树的最大深度匹配
      if (this.props.flexCols.length !== this.maxLevel && !this.props.onSyncData) {
        throw new Error("flexCols 数组长度和表格最大列数不一致");
      }
    }
  }

  /**
   * 增加level信息
   * 
   * @param {array} list 总表
   * @param {number} level 层级
   * @param {array} assignedOption 默认选中值
   * @memberof Cascader
   */
  addLevelForTree(list, level, assignedOption) {
    const self = this;
    list.forEach((item) => {
      item.selected = false;

      // structKeys key值转换
      item.label = item[self.LABEL];
      item.value = item[self.VALUE];
      item.children = item[self.CHILDREN];

      // 删除冗余key 
      if(self.props.structKeys) {
        if(self.LABEL !== 'label') delete item[self.LABEL]
        if(self.VALUE !== 'value') delete item[self.VALUE]
        if(self.CHILDREN !== 'children') delete item[self.CHILDREN]
      }

      if (assignedOption && assignedOption.length > 0) {
        let assignedId = assignedOption[level];
        item.selected = assignedId === item.value ? true : false;
      }

      item.level = level + 1;
      // 获取全局最大子树深度
      self.maxLevel = self.maxLevel >= item.level ? self.maxLevel : item.level ;
      if (item.children && item.children.length > 0) {
        this.addLevelForTree(item.children, item.level, assignedOption)
      }
    })
  }

  onSelectFinish(selectedChain) {
    let labels = selectedChain.map((selectedItem) => {
      return { label: selectedItem.label, value: selectedItem.value }
    })

    this.props.onConfirm && this.props.onConfirm(labels);
  }

  onSelectChange(selectedChain) {
    let labels = selectedChain.map((selectedItem) => {
      return { label: selectedItem.label, value: selectedItem.value }
    })

    this.props.onChange && this.props.onChange(labels);
  }


  /**
   * 切换 分类的时候 会后续做清除
   * 
   * @param {any} item 
   * @param {any} event 
   * 
   * @memberof Cascader
   */
  showNextLevel(item, isAutoOpen = false) {
    // console.log(item);
    const self = this;

    let temp = this.state.menuList;
    // 重置链条
    this.selectedChain[item.level - 1] = item;
    // 只取前 item.level 个
    this.selectedChain = this.selectedChain.slice(0, item.level)
    // 同级的清空状态
    temp[item.level - 1].forEach((_i) => {
      _i.selected = false;
    })
    // 点击的选中
    item.selected = true;

    // 判断是有有children
    let hasChildren = false;
    if (item.children && item.children.length > 0) {
      hasChildren = true
    }

    // 数据截断的时候不会有 children
    if (hasChildren) {
      let menu = [];
      // 插入上一级的全部选项
      if(this.props.autoAddEntire) {
        menu.push({
          label: '全部',
          value: -1,
          level: item.level + 1,
          selected: false
        })
      }
      

      item.children.forEach((_item) => {
        if (!isAutoOpen) {
          _item.selected = false;
        }
        menu.push(_item);
      })

      temp[item.level] = menu;
      // 删掉后面所有的列
      if (temp[item.level + 1] && temp[item.level + 1].length > 0) {
        temp.splice(item.level + 1, temp.length)
      }
      this.setState({
        menuList: temp
      });

      // 触发 onSelectChange
      this.onSelectChange(this.selectedChain);

    } else {
      /**
       * 数据截断 ======== 异步请求
       */
      if (this.props.onSyncData) {
        this.props.onSyncData(item).then((menu) => {
          
          menu.map((ele) => {
            ele.level = item.level + 1;
            ele.selected = false;
            // structKeys key值转换
            ele.label = ele[self.LABEL];
            ele.value = ele[self.VALUE];

            // structKeys key值转换
            if(this.props.structKeys) {
              this.props.structKeys.forEach( key => {
                delete ele[key]
              })
            }
          })
          if(this.props.autoAddEntire) {
            menu.unshift({
              label: '全部',
              value: -1,
              level: item.level + 1,
              selected: false,
            })
          }
          
          // 判断 level
          temp[item.level] = menu;
          // 删掉后面所有的列
          if (temp[item.level + 1] && temp[item.level + 1].length > 0) {
            temp.splice(item.level + 1, temp.length)
          }
          this.setState({
            menuList: temp
          });
        }, (res) => {
          console.log('has no children can not render');
          if (temp[item.level] && temp[item.level].length > 0) {
            temp.splice(item.level, temp.length)
          }
          this.setState({
            menuList: temp
          });
          self.onSelectFinish(self.selectedChain);
        })
      }
      // 如果没有设置 onSyncData
      else {
        // 删掉后面所有的列
        if (temp[item.level] && temp[item.level].length > 0) {
          temp.splice(item.level, temp.length)
        }
        this.setState({
          menuList: temp
        });
        self.onSelectFinish(self.selectedChain);
      }
    }
  }

  // 只支持 {label,value,children[{label,value}]} 的结构体
  renderList(datasource) {
    const self = this;
    const genKey = 10 * datasource[0].level + datasource[0].value;
    const flexStyle = this.props.flexCols ? { flex: this.props.flexCols[datasource[0].level - 1] } : '';
    // console.log(flexStyle)
    return (
      <View style={[styles.cascaderMenu, flexStyle]} key={genKey}>
        <ScrollView>
          {datasource.map((item) => {
            return self.renderListItem.bind(self, item)();
          })}
        </ScrollView>
      </View>
    )
  }

  removeKeyStartsWith(obj, letter) {
    Object.keys(obj).forEach(function (key) {
      if (key.match('^' + letter)) delete obj[key];//with regex
    });
  }


  // 渲染单独的一块
  renderListItem(item) {
    const self = this;
    let hasChildren = false;
    // 异步情况下不显示 hasChildren 右侧箭头
    if (item && item.children && item.children.length > 0 && !this.props.onSyncData) {
      hasChildren = true
    }

    // 区分view 和 text 的style属性
    let itemSelectedViewStyle, itemSelectedTextStyle = ''
    if (this.props.itemSelectedStyle) {
      itemSelectedViewStyle = Object.assign({}, this.props.itemSelectedStyle)
      delete itemSelectedViewStyle.color
      this.removeKeyStartsWith(itemSelectedViewStyle, 'font')

      itemSelectedTextStyle = Object.assign({}, this.props.itemSelectedStyle)
      delete itemSelectedTextStyle.backgroundColor
      this.removeKeyStartsWith(itemSelectedTextStyle, 'border')
    }

    return (
      <TouchableOpacity
        onPress={self.showNextLevel.bind(self, item, false)}
        key={item.value}
      >
        <View style={[styles.cascaderMenuItem,
        hasChildren ? styles.cascaderMenuItemHasChildren : '',
        item.selected ? styles.cascaderMenuItemSelected : '',
        item.selected && this.props.itemSelectedStyle ? itemSelectedViewStyle : '',
        this.props.itemStyle,
        ]}
        >
          <Text style={[styles.cascaderMenuText,
          item.selected ? styles.cascaderMenuTextSelected : '',
          item.selected && this.props.itemSelectedStyle ? itemSelectedTextStyle : '',
          ]}
            ellipsizeMode={'middle'}
          >
            {item.label}
          </Text>

          { /*// 选中项箭头Icon
            item.selected ?
              <Image style={styles.selectedIcon} source={require('./selectedIcon.png') } />
            : null
          */}
          { // 有子节点的样式
            hasChildren ?
              <Image style={styles.childIcon} source={{ uri: arrowRightImg, scale: 2 }} />
              : null
          }
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const self = this;

    return (
      <View style={[styles.cascContainer, this.props.style]}>
        {this.state.menuList.map((menu) => {
          return self.renderList(menu)
        })}
      </View>
    )
  }
}

const unit = {
  onePx: 1 / PixelRatio.get(),
};

const styles = StyleSheet.create({
  cascContainer: { justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: 'white', },
  cascaderMenu: { flex: 1, borderRightColor: '#E5E5E5', borderRightWidth: unit.onePx },
  cascaderMenuItem: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 10,
  },
  cascaderMenuItemSelected: { backgroundColor: colors.grayExtraLight,  },
  cascaderMenuItemHasChildren: {},
  cascaderMenuText: { lineHeight: 18, fontSize: 13, flex: 1, },
  cascaderMenuTextSelected: { color: colors.brandPrimary, fontWeight: 'bold' },
  childIcon: { width: 8, height: 12 },
  selectedIcon: { width: 5, height: 8, position: 'absolute', right: 0, },
})


export default Cascader;