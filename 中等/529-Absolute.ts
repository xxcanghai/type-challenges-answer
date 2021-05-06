
/* _____________ Your Code Here _____________ */

// 我的答案：
type Absolute<T extends number | string | bigint> =
    `${T}` extends `${infer First}${infer Other}`
    ? First extends `-` ? Other : `${T}`
    : `${T}`;


// 网友的更优解：减少了一次判定，直接判断是否是横线开头即可
// type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Absolute<0>, '0'>>,
    Expect<Equal<Absolute<-0>, '0'>>,
    Expect<Equal<Absolute<10>, '10'>>,
    Expect<Equal<Absolute<-5>, '5'>>,
    Expect<Equal<Absolute<'0'>, '0'>>,
    Expect<Equal<Absolute<'-0'>, '0'>>,
    Expect<Equal<Absolute<'10'>, '10'>>,
    Expect<Equal<Absolute<'-5'>, '5'>>,
    Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
    Expect<Equal<Absolute<9_999n>, '9999'>>,
]