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
        submission_id: action.payload.submission_id,
      };
    case submissionConstants.FETCH_SUBMISSION_SUCCESS:
      return {
        submission_id: action.payload.submission_id,
        account_id: action.payload.account_id,
        submit_time: action.payload.submit_time,
        total_pass: action.payload.total_pass === null ? action.payload.total_pass : '',
        total_fail: action.payload.total_fail === null ? action.payload.total_fail : '',
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
      return {
        judgecases: action.payload.data,
      };
    default:
      return state;
  }
};
