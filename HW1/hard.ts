export type Camelize<ObjectType> = ObjectType extends object
  ? {
    // Проходимся по всем ключам ObjectType
    [K in keyof ObjectType as K extends string
        // Если ключ - строка, то преобразуем ее в camelCase
        ? CamelCaseString<K>
        // Иначе просто оставляем как есть
        : K]: Camelize<ObjectType[K]>;
    }
// Если ObjectType не object
: ObjectType;

// Если строку можно разделить на части до нижнего подчеркивания (First) и после него (Rest)
type CamelCaseString<T extends string> = T extends `${infer First}_${infer Rest}`
    // Делаем первую букву First строчной и объединяем First с Rest, преобразованной в PascalCase
    ? `${Lowercase<First>}${Capitalize<CamelCaseString<Rest>>}`
    // Если в строке нет нижний подчеркиваний, просто возвращаем эту строку
    : T;

// Если строку можно разделить на части до точки (Key) и после (Rest)
export type DeepPick<T, Paths extends string> = Paths extends `${infer Key}.${infer Rest}`
    // И часть до точки является ключом T
    ? Key extends keyof T
    ? { 
        // Вызываем DeepPick для Key для рекурсивного поиска ключей
        [K in Key]: DeepPick<T[K], Rest> 
    }
    // Если часть до точки не является ключом T, возвращаем never
    : never
    // Если нет точки, проверяем, является ли Paths ключом T
    : Paths extends keyof T
    ? { 
        // Если является, выбираем только ключи из Paths
        [K in Paths]: T[K] 
    }
// Если не является, то ключей из T вообще не нашлось, возвращаем never
: never;