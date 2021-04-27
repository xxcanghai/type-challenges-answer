
/* _____________ 你的代码 _____________ */

type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: P extends K ? never : T[P];
}

/*
// 官方答案：(更简单)
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
*/



/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]

interface Todo {
    title: string
    description: string
    completed: boolean
}

interface Expected1 {
    title: string
    completed: boolean
}

interface Expected2 {
    title: string
}
