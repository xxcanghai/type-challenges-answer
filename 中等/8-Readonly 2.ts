// 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
// K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
// 例如

/* _____________ 你的代码 _____________ */

// 我的答案第一版，答案不正确，思路不对，按照K默认值为never来想
// type MyReadonly2<T, K extends keyof T = never> = K extends keyof T ? ({
//   readonly [P in K]: T[P];
// } & {
//     [P in Exclude<keyof T, K>]: T[P];
//   }) : Readonly<T>;

// 我的答案第二版，很理想的正确答案。K的默认为是全部keyof T
// 思路是将T进行分解两个类型，包括K的部分：Pick<T, K>，和排除K的部分：Omit<T, K>，然后将包含K的部分进行Readonly化即可，简单易懂。
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>


/**

上述答案，如果不用官方内置类型，全部自行实际则是：

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
}
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type MyExclude<T, U> = T extends U ? never : T;

type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>

type MyReadonly2<T, K extends keyof T = keyof T> = MyReadonly<MyPick<T, K>> & MyOmit<T, K>

 */

// 网友答案1：不理想，利用了交叉类型中readonly不会被覆盖的特性
// type MyReadonly2<T, K = any> = T & {
//   readonly [key in keyof T as key extends K ? key : never]: T[key]
// }

// 网友答案2：不理想，同上
// type MyReadonly2<T, K extends keyof T = keyof T> = T & {
//   readonly [P in K]: T[P]
// }

type A = MyReadonly2<Todo1>
type B = MyReadonly2<Todo1, 'title' | 'description'>

/* _____________ 测试用例 _____________ */
import { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
