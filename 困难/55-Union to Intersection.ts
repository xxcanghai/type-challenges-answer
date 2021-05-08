// 实现高级util类型 UnionToIntersection<U>，将联合类型转换为交叉类型
// type I = Union2Intersection<'foo' | 42 | true> // 期望得到： 'foo' & 42 & true


/* _____________ 你的代码 _____________ */

// 这道题我没写出来，以下为网友的答案：
// 详见：https://github.com/type-challenges/type-challenges/issues/122
type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never


// 核心思路如下：
// 利用函数的参数extends判定，只有当函数参数同时包含a和b时即{a:1,b:1}，才能符合 (_: infer T) => any 的泛型T的类型约束，也就是{a: 1} & {b: 1}
type f1 = (_: { a: 1 }) => any
type f2 = (_: { b: 1 }) => any
type test = (f1 | f2) extends (_: infer T) => any ? T : never;// {a: 1} & {b: 1} ✅

// 如果把联合类型放在函数返回值，也是不成立的。
type f3 = () => { a: 1 }
type f4 = () => { b: 1 }
type test2 = (f3 | f4) extends () => infer T ? T : never; // { a: 1 } | { b: 1 } ❌


/* _____________ 测试用例 _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
    Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]
