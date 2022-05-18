// TODO: importar actions
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return action.email;
  default:
    return state;
  }
}

export default userReducer;
