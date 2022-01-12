import { problemConstants } from '../actions/problem/constant';

const problem = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.FETCH_PROBLEM_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
        },
      };
    case problemConstants.BROWSE_PROBLEM_SUCCESS:
      return action.payload.data.problems.reduce((acc, item) => (
        { ...acc, [item.id]: { ...item } }), state);
    default:
      return state;
  }
};

export default problem;
