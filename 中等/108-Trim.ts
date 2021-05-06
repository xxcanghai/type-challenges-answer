
/* _____________ Your Code Here _____________ */

type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer U}` ? TrimLeft<U> : S;
type TrimRight<S extends string> = S extends `${infer U}${Space}` ? TrimRight<U> : S;
type Trim<S extends string> = TrimLeft<TrimRight<S>>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Trim<'str'>, 'str'>>,
    Expect<Equal<Trim<' str'>, 'str'>>,
    Expect<Equal<Trim<'     str'>, 'str'>>,
    Expect<Equal<Trim<'str   '>, 'str'>>,
    Expect<Equal<Trim<'     str     '>, 'str'>>,
    Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
]