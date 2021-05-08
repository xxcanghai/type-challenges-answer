
/* _____________ 你的代码 _____________ */

type Length<T extends any> = T extends { "length": number } ? T["length"] : never;


/*
其他人的答案：
type Length<T extends {length: number}> = T['length']
type Length<T extends any> = T extends ReadonlyArray<any> ? T['length'] : never;

*/

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
]
