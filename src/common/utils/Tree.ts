const DEFAULT_OPTIONS = {
  idKey: 'id',
  pIdKey: 'pId',
  childrenKey: 'children',

  type: 'nested',  // nested flattened
  data: []
}

function Tree (options) {
  this.options = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const { type, data } = options

  this.data = [
    ...this.parse(type, data)
  ]

}


Tree.prototype.parse = function () {
  return this[arguments[0] + 'Parser'].call(this, arguments[1])
}

Tree.prototype.nestedParser = function (data) {
  const ret = deepFirstRecursive.call(this, data)
  return ret

  /**
   * 深度优先
   *       +-D
   *   +-B-|
   * A-|   +-E
   *   +-C-F
   *
   * 找到 B 节点后把 B 作为父节点，children 数组作为数据，进入下次递归
   */

  function deepFirstRecursive(data, pItem, unique) {
    pItem = pItem || null
    unique = unique || { id: 1 }
    let result = []

    data.forEach((item) => {
      const tmpItem = {
        ...item
      }

      // 没有唯一标志时增加一个
      if (tmpItem[this.options.idKey] == null) {
        tmpItem[this.options.idKey] = unique.id++
      }

      // 没有对父节点的引用关系时增加一个
      if (pItem && tmpItem[this.options.pIdKey] == null) {
        tmpItem[this.options.pIdKey] = pItem[this.options.idKey]
      }

      result.push(tmpItem)

      if (tmpItem[this.options.childrenKey] && tmpItem[this.options.childrenKey].length) {
        const children = tmpItem[this.options.childrenKey]
        tmpItem[this.options.childrenKey] = children.map((child) => {
          return child[this.options.idKey]
        })
        const restList = deepFirstRecursive.call(this, children, tmpItem, unique)
        result = result.concat(restList)
      }
    })
    return result
  }


}

Tree.prototype.getData = function () {
  return this.data
}

Tree.prototype.flattenedParser = function (data) {
  let result = data.concat()

  data.forEach((item) => {
    if (item[this.options.pIdKey]) {
      result = result.map((tmpItem) => {
        if (tmpItem[this.options.idKey] === item[this.options.pIdKey]) {
          return {
            ...tmpItem,
            [this.options.childrenKey]: [
              ...(tmpItem[this.options.childrenKey] || [])
            ].concat(item[this.options.idKey])
          }
        } else {
          return tmpItem
        }
      })
    }
  })

  return result
}

export default Tree
