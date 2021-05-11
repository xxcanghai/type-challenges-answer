// 实现高级util类型GetRequired<T>，该类型保留所有必填字段


/* _____________ 你的代码 _____________ */

// 我的第一版答案：解决了 bar?:string 的情况，但是没办法解决 bar?:undefined 的情况
// type GetRequired<T> = {
//     [K in keyof T as T[K] extends Exclude<T[K], undefined> ? K : never]: T[K]
// }

// 网友的完美答案。主要区别在于对 T[K] 做的判断改，将我的 Exclude<T[K], undefined> 改为了 Required<T>[K]
// 而区别主要在于，Exclude undefined 会移除所有推导出undefined的字段（而没有区分是本身就是undefined还是 ? 可选属性），而Required<T>[K]只会移除 ? 可选属性。
type GetRequired<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
};


// 测试Exclude与Required区别：
type A = { bar: undefined }
type ExcludeDemo = Exclude<A['bar'], undefined> // -> never ❌
type RequiredDemo = Required<A>['bar'] // -> undefined ✅

/* _____________ 测试用例 _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<GetRequired<{ foo: number, bar?: string }>, { foo: number }>>,
    Expect<Equal<GetRequired<{ foo: undefined, bar?: undefined }>, { foo: undefined }>>,
]