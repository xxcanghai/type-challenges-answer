// 实现一个简单的Vue的类型，主要是实现vue中各个函数内的this指向问题。

/* _____________ 你的代码 _____________ */

declare function SimpleVue<D, C, M>(options: Options<D, C, M>): any

// 实现方案主要依赖于TS内置的 ThisType 类型。
// 详见：https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype

// 计算属性需要独立编写，需要将计算属性的字段函数返回值类型映射为字段的类型
type Computed<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
}

interface Options<D, C, M> {
  data(this: {}): D
  computed: C & ThisType<D & Computed<C> & M>
  methods: M & ThisType<D & Computed<C> & M>
}


/* _____________ 测试用例 _____________ */

import { Equal, Expect } from '@type-challenges/utils'


SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
    age() {
      return 1;
    }
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [
        Expect<Equal<typeof fullname, string>>,
      ] = [] as any
    },
  },
})
