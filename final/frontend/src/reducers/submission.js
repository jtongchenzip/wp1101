import { submissionConstants } from '../actions/submission/constant';

const initialState = {
  submission_id: '',
  account_id: '',
  submit_time: '',
  total_pass: '',
  total_fail: '',
  judgecases: [],
};

const submission = (state = initialState, action) => {
  switch (action.type) {
    case submissionConstants.ADD_SUBMISSION_SUCCESS:
      return {
        ...state,
        submission_id: action.payload.submission_id,
      };
    case submissionConstants.FETCH_SUBMISSION_SUCCESS:
      console.log(action);
      console.log(action.payload.data);
      return {
        submission_id: action.payload.data.id,
        account_id: action.payload.data.account_id,
        submit_time: action.payload.data.submit_time,
        total_pass: action.payload.data.total_pass === null ? action.payload.total_pass : '',
        total_fail: action.payload.data.total_fail === null ? action.payload.total_fail : '',
        judgecases: [],
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
      console.log(action.payload.data);
      return {
        ...state,
        judgecases: action.payload.data,
      };
    default:
      return state;
  }
};

export default submission;
