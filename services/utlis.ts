export type RemoveFromUnion<T, R> = T extends R ? never : T;
