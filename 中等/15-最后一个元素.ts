


/* _____________ 你的代码 _____________ */

// type Last<T extends any[]> = T[1] extends undefined ? true : false

type source = [3, 2, 1]
type str = 1 | 2 | 3
// type Values<T extends any[]> = T[number]
type Values = source[number]

type B = Exclude<Values, source[0]>
type D = [str]
type Last<T extends any[]> = Exclude<T[number], T[0]> extends never ? T[0] : Exclude<T[number], T[0]>//Last<[...Exclude<T[number],T[0]>]>
type UnionLast<T>=Exclude<, T[0]> extends never ? T[0] : Exclude<T[number], T[0]>

type A = UnionLast<1|2|3>

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

