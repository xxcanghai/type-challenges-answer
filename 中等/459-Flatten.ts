
/* _____________ 你的代码 _____________ */

// 我的答案：
// type Flatten<A extends any[], O extends any[] = []> =
//     A extends [infer First, ...infer Other]
//     ? First extends any[]
//         ? Flatten<[...First, ...Other], [...O]>
//         : Flatten<Other, [...O, First]>
//     : O;


// 网友答案：此方案较好，不新增额外泛型参数，并且思路清晰，理解简单，赞一个
type Flatten<T> =
    T extends [infer head, ...infer tail]
    ? [...Flatten<head>, ...Flatten<tail>]
    : T extends [] ? [] : [T];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]