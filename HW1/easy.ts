// K может быть только ключами T
export type MyPick<T, K extends keyof T> = {
    // Для каждого ключа из K извлекаем его тип из T
    [P in K]: T[P];
};

// Просто обращаемся к N-ому элементу массива, чтобы получить его тип
export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

// Создаем массив с первым элементом Elem и копируем после него все элементы ArrayType
export type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

// Если T является подтипом U, то исключаем его, иначе - сохраняем
export type MyExclude<T, U> = T extends U ? never : T;