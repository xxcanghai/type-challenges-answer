
/* _____________ 你的代码 _____________ */

type Awaited<T> = T extends Promise<infer U> ? U : never


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>,
]
