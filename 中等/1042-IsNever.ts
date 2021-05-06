// 实现IsNever的类型。该类型采用输入泛型 T。如果类型解析为never，则返回true，否则返回false。

/* _____________ Your Code Here _____________ */

// 两种解法：
// 方案1：通过将泛型T放入数组内形成元组
type IsNever<T> = [T] extends [never] ? true : false;
// 方案2：通过组合成数组后再进行对比
type IsNever2<T> = T[] extends never[] ? true : false;


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<IsNever<never>, true>>,
    Expect<Equal<IsNever<never | string>, false>>,
    Expect<Equal<IsNever<"">, false>>,
    Expect<Equal<IsNever<undefined>, false>>,
    Expect<Equal<IsNever<null>, false>>,
    Expect<Equal<IsNever<[]>, false>>,
    Expect<Equal<IsNever<{}>, false>>,
]
