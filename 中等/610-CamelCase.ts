
/* _____________ Your Code Here _____________ */


// 我的答案：
type CamelCase<S extends string> =
    S extends `${infer L}-${infer Char}${infer R}`
    ? Char extends `-`
        ? `${L}-${CamelCase<`-${R}`>}`
        : `${L}${Char extends Uppercase<Char> ? `-${Char}` : Uppercase<Char>}${CamelCase<R>}`
    : S;


// 网友更优解：
// 同样利用内置类型Capitalize自动处理开头大写，利用Capitalize转换前后是否相等来排除多个中横线的问题
// type CamelCase<S> = S extends `${infer S1}-${infer S2}`
//     ? S2 extends Capitalize<S2>
//         ? `${S1}-${CamelCase<S2>}`
//         : `${S1}${CamelCase<Capitalize<S2>>}`
//     : S


type a = CamelCase<'foo--bar----baz'>

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
    Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
    Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
    Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
    Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
    Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
    Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
    Expect<Equal<CamelCase<'-'>, '-'>>,
    Expect<Equal<CamelCase<''>, ''>>,
    Expect<Equal<CamelCase<'😎'>, '😎'>>,
]