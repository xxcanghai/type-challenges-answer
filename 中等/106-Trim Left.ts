
/* _____________ Your Code Here _____________ */

type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer U}` ? TrimLeft<U> : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<TrimLeft<'str'>, 'str'>>,
    Expect<Equal<TrimLeft<' str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
    Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
]