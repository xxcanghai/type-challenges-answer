
/* _____________ Your Code Here _____________ */

// 我的答案：第一版，虽然最终实际使用没问题但是测试case不通过
// type AppendToObject<T, U extends string, V> = T & {
//     [K in U]: V
// }

// 我的答案第二版，结果和测试都通过了，但是实在是不太优雅，看起来就很恶心...
type AppendToObject<T, U extends string, V> = {
    [K in keyof (T & { [P in U]: V })]: (T & { [P in U]: V })[K]
}



// 网友的答案：此方案更优，简单清晰
// type AppendToObject<T, U extends keyof any, V> = {
//     [K in keyof T | U]: K extends keyof T ? T[K] : V;
// };


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
    Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
    Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]

type test1 = {
    key: 'cat'
    value: 'green'
}

type testExpect1 = {
    key: 'cat'
    value: 'green'
    home: boolean
}

type test2 = {
    key: 'dog' | undefined
    value: 'white'
    sun: true
}

type testExpect2 = {
    key: 'dog' | undefined
    value: 'white'
    sun: true
    home: 1
}

type test3 = {
    key: 'cow'
    value: 'yellow'
    sun: false
}

type testExpect3 = {
    key: 'cow'
    value: 'yellow'
    sun: false
    isMotherRussia: false | undefined
}
