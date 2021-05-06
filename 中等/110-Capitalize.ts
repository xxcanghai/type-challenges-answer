
/* _____________ Your Code Here _____________ */

// 我的答案
// 值得高兴的一件事是，写完这个答案后，去官网的issues上看了下居然没有一个写出比我更简洁的解决方案的。
// 遂贡献了一个方案：https://github.com/type-challenges/type-challenges/issues/1356
type CharMap = { "a": "A", "b": "B", "c": "C", "d": "D", "e": "E", "f": "F", "g": "G", "h": "H", "i": "I", "j": "J", "k": "K", "l": "L", "m": "M", "n": "N", "o": "O", "p": "P", "q": "Q", "r": "R", "s": "S", "t": "T", "u": "U", "v": "V", "w": "W", "x": "X", "y": "Y", "z": "Z" }
type Capitalize<S extends string> =
    S extends `${infer First}${infer U}` ?
    (First extends keyof CharMap ? `${CharMap[First]}${U}` : S)
    : S;


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Capitalize<'foobar'>, 'Foobar'>>,
    Expect<Equal<Capitalize<'FOOBAR'>, 'FOOBAR'>>,
    Expect<Equal<Capitalize<'foo bar'>, 'Foo bar'>>,
    Expect<Equal<Capitalize<'f'>, 'F'>>,
    Expect<Equal<Capitalize<''>, ''>>,
]