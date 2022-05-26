// TODO: importar actions
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  isLogged: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      isLogged: true,
    };
  default:
    return state;
  }
}

export default userReducer;
