declare var API_URL: string

export type Thunk<State, Action> = (dispatch: (state: Action) => void, getState: () => State) => any
