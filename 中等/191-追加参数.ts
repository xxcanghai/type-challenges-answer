
/* _____________ 你的代码 _____________ */

// 我的答案：
// 如果单纯的用 (...args: T,a:A)=>R 则会提示“rest 参数必须是参数列表中的最后一个参数”
// 所以转换将参数列表转换为元组就可以避开这个限制，再解构出来就解决了。
type AppendArgument<Fn extends Function, A> = Fn extends (...args: infer T) => infer R ? (...args: [...T, A]) => R : never;


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
    Expect<Equal<Case1, Result1>>,
    Expect<Equal<Case2, Result2>>,
]