import { TOGGLE_LOCAL_AUTH } from '../actions';

import { LocalAuthState } from '../../interfaces/LocalAuthState';

import type { LocalAuthActionTypes } from '../../types/LocalAuthActionTypes';

const initialState: LocalAuthState = {
  localAuth: false,
};

export const localAuthReducer = (
  state = initialState,
  action: LocalAuthActionTypes
) => {
  switch (action.type) {
    case TOGGLE_LOCAL_AUTH:
      return {
        ...state,
        localAuth: !state.localAuth,
      };

    default:
      return state;
  }
};
