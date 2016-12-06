declare var API_URL: string
declare var __DEV__: boolean

export type Thunk<State, Action> = (dispatch: (state: Action|Thunk<State, Action>) => void, getState: () => State) => any

declare function deepEqual<T>(actual: T, expected: T, opts?: {strict: boolean}): boolean

declare type Path = string

declare type Location = {}

declare type Query = {[_: string]: any}

declare class Router {
  push(dest: Path|Location): void;

  replace(dest: Path|Location): void;

  go(n: number): void;

  goBack(): void;

  goForward(): void;

  createPath(dest: Path|Location, query?: Query): string;

  createHref(dest: Path|Location, query?: Query): string;

  isActive(dest: Path|Location, indexOnly?: boolean): boolean;
}
