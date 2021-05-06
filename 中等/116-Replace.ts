
/* _____________ Your Code Here _____________ */

// 我的答案：
type Replace<S extends string, From extends string, To extends string> =
    S extends `${infer L}${From extends `` ? never : From}${infer R}` ? `${L}${To}${R}` : S;

// 网友答案：（逻辑更加容易理解）
// type Replace<S extends string, From extends string, To extends string> =
//     From extends '' ? S : S extends `${infer from}${From}${infer end}` ? `${from}${To}${end}` : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
    Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'', '', ''>, ''>>,
]
