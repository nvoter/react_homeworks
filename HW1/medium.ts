// T не может быть функцией, только объектом
export type DeepPartial<T> = T extends object 
? { 
    // Для каждого ключа из T добавляем оператор ?, чтобы свойство стало необязательным
    // Применяем функцию к каждому значению, чтобы вложенные свойства также стали необязательными
    [K in keyof T]?: DeepPartial<T[K]>; 
} : T; // Если T - примитивный тип, просто возвращаем его

// Если получается разбить строку на первую букву (First) и оставшуюся часть (Rest)
export type MyCapitalize<T extends string> = T extends '${infer First}${infer Rest}' 
// Делаем первую букву заглавной, остальную часть строки не трогаем
? '${Uppercase<First>}${Rest}' 
: T; // Если не получилось разбить на First и Rest, просто возвращаем тип T

// T может быть только объектом
export type DeepMutable<T> = T extends object
? { 
    // Делаем каждое свойство изменяемым, убирая модификатор readonly 
    -readonly [K in keyof T]: DeepMutable<T[K]>; 
} : T; // Если T не объект, просто возвращаем его

export type ParseURLParams<StringElem extends string> =
    // Разбиваем строку на начало URL (Beginning), пераметр (Param) и оставшуюся часть (Rest)
    StringElem extends `${infer Beginning}:${infer Param}/${infer Rest}`
    // Если получается, возвращаем параметр и парсим оставшуюся часть URL
    ? Param | ParseURLParams<Rest>
    // Если не получается, проверяем, оканчивается ли строка на параметр
    : StringElem extends `${infer Beginning}:${infer Param}`
    // Если оканчивается, возвращаем его
    ? Param
    // Иначе в URL нет параметров
    : never;