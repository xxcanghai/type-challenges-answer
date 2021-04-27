
/* _____________ 你的代码 _____________ */

// 第一版，答案不正确，思路不对，按照K默认值为never来想
// type MyReadonly2<T, K extends keyof T = never> = K extends keyof T ? ({
//   readonly [P in K]: T[P];
// } & {
//     [P in Exclude<keyof T, K>]: T[P];
//   }) : Readonly<T>;

// 第二版，很理想的正确答案。K的默认为是全部keyof T
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>


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
