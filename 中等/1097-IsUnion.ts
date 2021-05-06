// 实现一个类型 IsUnion，它接受一个输入类型T并返回是否T解析为并集类型。

/* _____________ Your Code Here _____________ */

// 这道题我想了很久依然没答出来
// 以下为网友的答案：（详见：https://github.com/type-challenges/type-challenges/issues/1140）
type IsUnion<T, C extends T = T> = (T extends T ? C extends T ? true : unknown : never) extends true ? false : true;

// 第二个更简单的答案：
// type IsUnion<T, B = T> = T extends B ? [B] extends [T] ? false : true : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<IsUnion<string>, false>>,
    Expect<Equal<IsUnion<string | number>, true>>,
    Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
    Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
    Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
    Expect<Equal<IsUnion<{ a: string | number }>, false>>,
    Expect<Equal<IsUnion<[string | number]>, false>>,
    // Cases where T resolves to a non-union type.
    Expect<Equal<IsUnion<string | never>, false>>,
    Expect<Equal<IsUnion<string | unknown>, false>>,
    Expect<Equal<IsUnion<string | any>, false>>,
    Expect<Equal<IsUnion<string | 'a'>, false>>,
]
