
/* _____________ 你的代码 _____________ */

type TupleToObject<T extends readonly any[]> = {
    [K in T[number]]: K;
  }
  
  
  /* _____________ 测试用例 _____________ */
  import { Equal, Expect } from '@type-challenges/utils'
  
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  
  type cases = [
    Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y'}>>,
  ]