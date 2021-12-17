import { authConstants } from '../../actions/user/constant';

const initailState = {
  auth: null,
  login: null,
  logout: null,
  signup: null,
  fetchAccount: null,
};

export default function auth(state = initailState, action) {
  switch (action.type) {
    case authConstants.AUTH_FAIL:
      return {
        ...state,
        login: action.error,
      };
    case authConstants.SIGNUP_FAIL:
      return {
        ...state,
        signup: false,
      };
    default:
      return state;
  }
}
