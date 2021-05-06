
/* _____________ 你的代码 _____________ */

// 我的答案：
// 都不能称之为答案，只能兼容3个参数，只能说通过测试case...
type PromiseResult<T> = T extends Promise<infer U> ? U : T;
declare function PromiseAll<A, B, C>(values: readonly [A, B, C]): Promise<[PromiseResult<A>, PromiseResult<B>, PromiseResult<C>]>


// 网友答案：完美！
// 将ABC或多个元素通过{}进行展开，成功的解决了只用一个泛型参数会导致成为联合类型的问题。
// declare function PromiseAll<T extends any[]>(values: readonly [...T]):
//     Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
    Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
    Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
    Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
]
