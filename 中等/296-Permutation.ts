

/* _____________ Your Code Here _____________ */

// 是在是没写出来...
// 以下为网友答案：https://github.com/type-challenges/type-challenges/issues/614

type Permutation<T, K=T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never

type Permuted = Permutation<'a' | 'b'>  // ['a', 'b'] | ['b' | 'a']


// ---------------test------------------

type Permutation2<T, K> = T extends T
    ? [K, Exclude<T, K>]
    : never

type a = Permutation<'A' | 'B', 'A' | 'B'>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Permutation<'A'>, ['A']>>,
    Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
    Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
    Expect<Equal<Permutation<never>, []>>,
]






type And<A extends number, B extends number> = `${A}${B}`;
type AndDemo1 = And<1 | 2, 3>;// "13" | "23"
type AndDemo2 = And<1, 2 | 3>;// "12" | "13"
type AndDemo3 = And<1 | 2, 3 | 4>;// "13" | "14" | "23" | "24"

type And2<A extends number, B extends number> = A extends A ? [`${A}${B}`] : 2;
type And2Demo1 = And2<1 | 2, 3>;// ["13"] | ["23"]
type And2Demo2 = And2<1, 2 | 3>;// ["12" | "13"]
type And2Demo3 = And2<1 | 2, 3 | 4>;// ["13" | "14"] | ["23" | "24"]  💗差异

type And3<A extends number, B extends number> = B extends B ? [`${A}${B}`] : never;
type And3Demo1 = And3<1 | 2, 3>;// ["13" | "23"]
type And3Demo2 = And3<1, 2 | 3>;// ["13"] | ["12"]
type And3Demo3 = And3<1 | 2, 3 | 4>;// ["13" | "23"] | ["14" | "24"] 💗差异