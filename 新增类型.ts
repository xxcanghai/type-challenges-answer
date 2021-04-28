// -----------官方内置类型------------

/** 从类型 T 中根据 Key 筛选, 返回新类型 */
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };
// 例如：Pick<{ a: any, b: any, c: any }, 'a' | 'b'> // -> {a:any, b:any}


/** 构造具有一组类型为T的属性K的类型 */
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };
// 例如：Record<'a' | 'b', number> // -> {a:number, b:number}

/** 从一组中移除某些元素,从 T 里移除 U */
// type Exclude<T, U> = T extends U ? never : T;
// 例如：Exclude<'a'|'b'|'c', 'a'|'b'> // -> 'c'

/** 从一组中提取某个元素，从 T 中提取可分配给 U 的那些类型 */
// type Extract<T, U> = T extends U ? T : never;
// 例如：Extract<'a' | 'b',  'b' | 'c'> // -> 'b'

/** 将类型 T 中所有key为 K 的属性删除（与Pick相反） */
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// 例如：Omit<{ a: any, b: any, c: any }, 'a' | 'b'> // -> {c:any}




// -----------个人新增------------


/** 从类型 T 中根据指定类型 U 来筛选, 返回新类型 */
type PickType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
}
// type PickTypeDemo1 = PickType<{ a: string, b: number, c: boolean }, number>
// -> { b: number; } 筛选出所有类型为number的新类型
// type PickTypeDemo2 = PickType<{ a: string, b: number, c: boolean }, number | string>
// -> { a: string; b: number; } 筛选出所有类型为number或string的新类型



/** 从类型 T 中删除所有类型为 U 的属性，返回新类型 */
type OmitType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K]
}
// type OmitType1 = OmitType<{ a: string, b: number, c: boolean }, number>
// -> { a: string;c: boolean;} 删除所有类型为number的属性，返回新类型
// type OmitType2 = OmitType<{ a: string, b: number, c: boolean }, number | string>
// -> { c: boolean; } 删除所有类型为number或string的属性，返回新类型


/** 获取所有类型 T 中属性的类型为 U 的字段key的集合 */
type KeyofPickType<T, U> = keyof PickType<T, U>;
// 旧实现：
// type KeyofType<T, U> = {
//     [K in keyof T]: T[K] extends U ? K : never;
// }[keyof T];
// type KeyofPickTypeDemo1 = KeyofPickType<{ a: string, b: number, c: boolean }, number>
// -> 'b' 获取所有类型为number的key集合
// type KeyofPickTypeDemo2 = KeyofPickType<{ a: string, b: number, c: boolean }, number | string>
// -> 'a' | 'b' 获取所有类型为number或string的key集合


/** 获取所有类型 T 中属性的类型不为 U 的字段key的集合 */
type KeyofOmitType<T, U> = keyof OmitType<T, U>;
// type KeyofOmit
// TypeDemo1 = KeyofOmitType<{ a: string, b: number, c: boolean }, number>
// -> 'a' | 'c' 获取所有类型不为number的key集合
// type KeyofOmitTypeDemo2 = KeyofOmitType<{ a: string, b: number, c: boolean }, number | string>
// -> 'c' 获取所有类型不为number且不为string的key集合


/** 获取元组类型中第一个元素的类型 */
type First<T extends any[]> = T extends [infer F, ...any] ? F : never;
// type FirstDemo1 = First<[1, 2, 3]> // -> 1 
// type FirstDemo2 = First<[string, number, Promise<any>]> // -> string


/** 获取元组类型中除了第一个元素以外的其他类型 */
type ExcludeFirst<T extends any[]> = T extends [any, ...infer F] ? F : never;
// type ExcludeFirstDemo1 = ExcludeFirst<[1, 2, 3]> // -> [2, 3]
// type ExcludeFirstDemo2 = ExcludeFirst<[string, number, Promise<any>]> // -> [number, Promise<any>]


/** 获取元组类型中最后一个元素的类型 */
type Last<T extends any[]> = T extends [...infer _, infer F] ? F : never
// type LastDemo1 = Last<[1, 2, 3]> // -> 3
// type LastDemo2 = Last<[string, number, Promise<any>]> // -> Promise<any>


/** 获取元组类型中除了最后一个元素以外的其他类型 */
type ExcludeLast<T extends any[]> = T extends [...infer F, any] ? F : never;
// type ExcludeLastDemo1 = ExcludeLast<[1, 2, 3]> // -> [1, 2]
// type ExcludeLastDemo2 = ExcludeLast<[string, number, Promise<any>]> // -> [string, number]
