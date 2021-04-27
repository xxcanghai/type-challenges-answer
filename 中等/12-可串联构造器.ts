
/* _____________ 你的代码 _____________ */

type Chainable<U = {}> = {
    option<K extends string, T>(key: K, value: T): Chainable<Record<K, T> & U>
    get(): U
}


/* _____________ 测试用例 _____________ */
import { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result = a
    .option('foo', 123)
    .option('bar', { value: 'Hello World' })
    .option('name', 'type-challenges')
    .get()

type cases = [
    Expect<Alike<typeof result, Expected>>
]

type Expected = {
    foo: number
    bar: {
        value: string
    }
    name: string
}

