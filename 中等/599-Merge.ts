
/* _____________ Your Code Here _____________ */


// 因为K是F和S的keys的集合，所以在使用前需要再将K进行优先级依次判定一次
type Merge<F, S> = {
    [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
};

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type Foo = {
    a: number;
    b: string;
};
type Bar = {
    b: number;
};

type cases = [
    Expect<Equal<Merge<Foo, Bar>, {
        a: number;
        b: number;
    }>>
]

