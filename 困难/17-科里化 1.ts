/*
实现科里化Currying函数，可以将一个有N个参数的函数，转换为每次只有一个参数的可以调用N次的函数。

在此挑战中，curried函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。
*/


/* _____________ 你的代码 _____________ */

// 我的第一版答案，看起来是没问题的但是没办法通过测试
// 主要原因在于，如果Currying函数的参数是一个字面量的箭头函数表达式，则无法读取实际返回类型 true，只能返回更大范围的类型 boolean
// declare function Currying<A extends any[], R>(fn: (...args: A) => R): Curried<A, R>

// type Curried<A extends any[], R> =
//     A extends [infer First, ...infer Other]
//     ? (arg: First) => Curried<Other, R>
//     : R;


// 3种读取函数的返回值的测试代码：
declare function f1(a: string): true  // 函数声明
declare var f2: (a: string) => true  // 匿名函数表达式

// 第一种，通过泛型在参数中定义。
declare function test1<R>(fn: (...args: any[]) => R): R;
test1(f1) // true ✅
test1(f2) // true ✅
test1((a: string) => true) // boolean ❌

// 第二种，通过泛型约束上去定义。
declare function test2<F extends (...args: any[]) => any>(fn: F): ReturnType<F>;
test2(f1) // true ✅
test2(f2) // true ✅
test2((a: string) => true) // boolean ❌

// 第三种，在泛型最终应用结果处再做判定。可以看出只有这种方法的效果最好，也是符合测试case的要求
declare function test3<F>(fn: F): F extends (...args: any[]) => any ? ReturnType<F> : never;
test3(f1) // true ✅
test3(f2) // true ✅
test3((a: string) => true) // true ✅

// 所以最终正确答案：
// 参考：https://www.typescriptlang.org/docs/handbook/2/functions.html#push-type-parameters-down
declare function Currying<F>(fn: F): Curried<F>
type Curried<F> =
    F extends (...args: infer A) => infer R
    ? A extends [infer First, ...infer Other]
        ? (arg: First) => Curried<(...args: Other) => R>
        : R
    : never;



/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)


type cases = [
    Expect<Equal<
        typeof curried1, (a: string) => (b: number) => (c: boolean) => true
    >>,
    Expect<Equal<
        typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >>,
]
