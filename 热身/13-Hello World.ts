/* _____________ 你的代码 _____________ */

type HelloWorld = string // expected to be a string


/* _____________ 测试用例 _____________ */
import { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>
]