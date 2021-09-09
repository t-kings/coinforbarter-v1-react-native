export interface ReducerActionType<T, U> {
  type: T;
  payload: ReducerPayloadType<U>;
}

export type ReducerPayloadType<
  T,
  U = {[K in keyof T]: Pick<T, K>},
> = Partial<T> & U[keyof U];
