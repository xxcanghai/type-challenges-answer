
/* _____________ Your Code Here _____________ */

// 我的答案：
// 将字符串转换为元组后再调用其number索引得到联合类型
type StringToArray<S extends string, A extends any[] = []> =
    S extends `${infer Char}${infer Other}`
    ? StringToArray<Other, [...A, Char]> : A;
type StringToUnion<T extends string> = StringToArray<T>[number]


// 网友的更优解：直接不通过中间元组类型，扣出第一个字符后组合成递归成联合类型，赞
// type StringToUnion<T extends string> = T extends `${infer L}${infer R}` ? L | StringToUnion<R> : never

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<StringToUnion<"">, never>>,
    Expect<Equal<StringToUnion<"t">, "t">>,
    Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
    Expect<Equal<StringToUnion<"coronavirus">, "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s">>,
]
