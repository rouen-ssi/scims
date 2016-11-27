declare var API_URL: string
declare var __DEV__: boolean

export type Thunk<State, Action> = (dispatch: (state: Action) => void, getState: () => State) => any
