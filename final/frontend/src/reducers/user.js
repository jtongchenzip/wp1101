import { authConstants } from '../actions/user/constant';

const initialState = {
  isAuthenticated: false,
  token: '',
  tokenExpired: false,
  username: '',
  real_name: '',
  student_id: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.user.token,
        tokenExpired: false,
        username: action.user.username,
        real_name: action.user.real_name,
        student_id: action.user.student_id,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        isAuthenticated: false,
        token: '',
        tokenExpired: false,
      };
    case authConstants.TOKEN_EXPIRED:
      return {
        isAuthenticated: false,
        token: '',
        tokenExpired: true,
      };
    default:
      return state;
  }
};

export default user;
