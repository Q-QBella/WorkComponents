/**
 * 枚举类
 *
 * @param props  [{key: number|string, value: number|string, ...other}]
 * @example
 *  const StepEnum = new Enum([
 *    { key: 'STEP1', name: '步骤1', value: 1 },
 *    { key: 'SETP2', name: '步骤2', value: 2 },
 *  ]);
 *
 * @class Enum
 *
 * @method get(value) 通过value获取当前列的值
 *                    return { key: 'SETP2', name: '步骤2', value: 2 }
 *
 * @returns {key1: number|string, key2: number|string}
 * {
 *   CREATE: 1,
 *   APPROVED: 2,
 * }
 */
export default class Enum {
  /**
   * 初始化
   * @param {Array} props []
   */
  constructor (props = []) {
    this.__props = {}
    if (props.length) {
      props.forEach((element) => {
        if (element.key && element.value) {
          this[element.key] = element.value
          this.__props[element.value] = element
        } else {
          console.error(element + 'Enum缺少必要的key或value')
        }
      })
    }
  }

  /**
   * 根据value获取对象值
   * @param {string|number} value 状态值
   */
  get (value) {
    return this.__props[value]
  }

  /**
   * 获取枚举数组
   */
  getArray () {
    const arr = []
    for (const key in this.__props) {
      if (Object.prototype.hasOwnProperty.call(this.__props, key)) {
        arr.push(this.__props[key])
      }
    }
    return arr
  }
}
