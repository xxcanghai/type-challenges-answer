
/* _____________ 你的代码 _____________ */


// 写了很多遍，最终还是利用递归写出来了（因为使用了两个类型，所以并不是最佳解决方案）：
type ExcludeFirst<T extends any[]> = T extends [any, ...infer F] ? F : never;
type Last<T extends any[]> = T extends [infer F] ? F : Last<ExcludeFirst<T>>;


// 网友的解决方案：
// 因为最后一个元素的index是length-1,而ts类型不能进行运算所以 人为增加一个元素后读取其length属性，得到最后一个元素的类型，简直思路清奇，大开眼界
type Last2<T extends any[]> =[never, ...T][T['length']];

// 网友的解决方案2：
// 此解决方案应该是标准解决方案，没有使用其他类型组合，也非递归或读取length属性等骚操作。
type Last3<T extends any[]> = T extends [...infer _, infer F] ? F : never


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

