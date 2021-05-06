
/* _____________ Your Code Here _____________ */

// 我的答案：
// 思路，首先调用字符串的length属性只能得到number，而调用固定数组的length可以得到具体值
// 所以先把字符串转换为数组，然后再调用其length属性即可。
// type stringLength='123'['length'] // number
// type arrayLength=[1,2,3]['length'] //3

type StringToArray<S extends string, A extends any[] = []> = // 增加一个泛型A（Array），默认为空数组
    S extends `${infer Char}${infer Other}` // 判断是否为2个字符
    ? StringToArray<Other, [...A, Char]> // 如果是则递归调用，将第一个字符存入数组并续上后续字符，同时将剩余字符串调用自身
    : A; // 当最后一个字符时返回所有数组
type StringToArrayDemo = StringToArray<'123'> // ["1", "2", "3"]


type LengthOfString<S extends string> = StringToArray<S>['length']
type a = LengthOfString<'123'> // 3

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<LengthOfString<''>, 0>>,
    Expect<Equal<LengthOfString<'kumiko'>, 6>>,
    Expect<Equal<LengthOfString<'reina'>, 5>>,
    Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


type B<T extends any[]> = T['length']
type b = B<[1, 2, 3]>