import { authConstants } from '../../actions/user/constant';

const initialState = {
  auth: null,
  login: null,
  logout: null,
  signup: null,
  fetchAccount: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_FAIL:
      return {
        ...state,
        login: action.error,
      };
    case authConstants.AUTH_SUCCESS:
      return {
        ...state,
        login: null,
      };
    case authConstants.SIGNUP_FAIL:
      return {
        ...state,
        signup: false,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signup: null,
      };
    default:
      return state;
  }
}
