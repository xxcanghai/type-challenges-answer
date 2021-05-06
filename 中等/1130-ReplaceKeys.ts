
/* _____________ Your Code Here _____________ */

type ReplaceKeys<U, T extends string, Y> = {
    [K in keyof U]: K extends T
    ? K extends keyof Y
        ? Y[K]
        : never
    : U[K]
}

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type NodeA = {
    type: 'A'
    name: string
    flag: number
}

type NodeB = {
    type: 'B'
    id: number
    flag: number
}

type NodeC = {
    type: 'C'
    name: string
    flag: number
}

type ReplacedNodeA = {
    type: 'A'
    name: number
    flag: string
}

type ReplacedNodeB = {
    type: 'B'
    id: number
    flag: string
}

type ReplacedNodeC = {
    type: 'C'
    name: number
    flag: string
}

type NoNameNodeA = {
    type: 'A'
    flag: number
    name: never
}

type NoNameNodeC = {
    type: 'C'
    flag: number
    name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
    Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
    Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1130/answer
  > View solutions: https://tsch.js.org/1130/solutions
  > More Challenges: https://tsch.js.org
*/

