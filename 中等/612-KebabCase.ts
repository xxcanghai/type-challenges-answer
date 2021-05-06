
/* _____________ Your Code Here _____________ */

// 我的答案
// 要么使用2个泛型参数，要么使用两个类型，最后也没想出来如何只用一个泛型参数和一个类型就实现的方案....
type Kebab<S extends string> =
    S extends `${infer F}${infer O}`
    ? F extends Lowercase<F>
        ? `${F}${Kebab<O>}`
        : `-${Lowercase<F>}${Kebab<O>}`
    : S;
type KebabCase<S extends string> = Kebab<Uncapitalize<S>>

// 网友答案：完美，只用一个泛型参数和一个类型实现。
// 关键点在于，我使用字符串第一个字符做大小写判断，而他使用第二个字符做判定，就解决了首字符串大写不加横线的问题
// type KebabCase<S> = S extends `${infer S1}${infer S2}`
//   ? S2 extends Uncapitalize<S2>
//     ? `${Uncapitalize<S1>}${KebabCase<S2>}`
//     : `${Uncapitalize<S1>}-${KebabCase<S2>}` 
//   : S;

type a = KebabCase<'FooBarBaz'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
    Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
    Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
    Expect<Equal<KebabCase<'-'>, '-'>>,
    Expect<Equal<KebabCase<''>, ''>>,
    Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


