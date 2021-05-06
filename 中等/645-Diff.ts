

/* _____________ Your Code Here _____________ */

type Diff<O, O1> = Omit<O1, keyof O>

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type Foo = {
    name: string
    age: string
}
type Bar = {
    name: string
    age: string
    gender: number
}

type cases = [
    Expect<Equal<Diff<Foo, Bar>, { gender: number }>>
]
