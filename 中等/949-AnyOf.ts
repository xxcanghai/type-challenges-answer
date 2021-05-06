
// 数组中所有元素均为false时才返回false，否则返回true。即有任意元素为true则返回true。


/* _____________ Your Code Here _____________ */

// 整体思路
// 第一步：实现判定数组所有项都是某一个类型。例如:如果T是一个全部均为1的数组则返回false，有任意1以外的元素则返回true
// type AllTypeOf<T extends readonly any[], R extends boolean = false> =
//     T extends [infer F, ...infer Rest]
//     ? F extends 1
//         ? AllTypeOf<Rest, false>
//         : true
//     : R


// 第二步：判定某个类型T转换为题目要求的boolean的结果（按题目要求 [] 和 {} 都是 false）
// 由于任何类型都可以 extends {} 等式均成立，所以判定是否为空 {} 采用keyof来判定
// type Bool<T> =T extends (0 | '' | false | []) ? false :
//     keyof T extends keyof {} ? false : true;



// 第三步：将一跟二结合起来，判定数组所有项都是某一个类型
type AnyOf<T extends readonly any[], R extends boolean = false> =
    T extends [infer F, ...infer Rest]
    ? F extends (0 | '' | false | [])
        ? AnyOf<Rest, false>
        : keyof F extends keyof {} 
            ? AnyOf<Rest, false>
            : true
    : R


// 网友答案：很精彩！
// 通过 T[number] extends 来实现了数组所有项的匹配学到了，新技能get√ ，比用复杂的递归要简单太多了
// type AnyOf<T extends any[]> = T[number] extends 0 | '' | false | [] | {[key: string]: never}
//     ? false : true;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
    Expect<Equal<AnyOf<[]>, false>>,
]