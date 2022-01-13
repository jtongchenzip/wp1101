import { submissionConstants } from '../actions/submission/constant';
import { problemConstants } from '../actions/problem/constant';

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
      return {
        submission_id: action.payload.data.id,
        account_id: action.payload.data.account_id,
        submit_time: action.payload.data.submit_time,
        total_pass: action.payload.data.total_pass !== null ? action.payload.data.total_pass : '',
        total_fail: action.payload.data.total_fail !== null ? action.payload.data.total_fail : '',
        judgecases: [],
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
      return {
        ...state,
        judgecases: action.payload.data,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_SUCCESS: {
      const { data, judgecase } = action.payload;

      return {
        submission_id: data.id,
        account_id: data.account_id,
        submit_time: data.submit_time,
        total_pass: data.total_pass !== null ? data.total_pass : '',
        total_fail: data.total_fail !== null ? data.total_fail : '',
        judgecases: judgecase,
      };
    }
    default:
      return state;
  }
};

export default submission;
