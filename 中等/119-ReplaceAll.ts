
/* _____________ Your Code Here _____________ */

type ReplaceAll<S extends string, From extends string, To extends string> =
    From extends `` ? S :
    S extends `${infer L}${From}${infer R}` ? `${L}${ReplaceAll<`${To}${R}`, From, To>}` : S;


type a = ReplaceAll<'foobarfoobar', 'ob', 'b'>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
    Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
    Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
    Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]
