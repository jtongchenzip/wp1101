import { submissionConstants } from '../../actions/submission/constant';

const initialState = {
  addSubmission: null,
  fetchSubmission: null,
  browseJudgeCase: null,
};

export default function submission(state = initialState, action) {
  switch (action.type) {
    case submissionConstants.ADD_SUBMISSION_FAIL:
      return {
        ...state,
        addSubmission: action.error,
      };
    case submissionConstants.ADD_SUBMISSION_SUCCESS:
      return {
        ...state,
        addSubmission: null,
      };
    case submissionConstants.FETCH_SUBMISSION_FAIL:
      return {
        ...state,
        fetchSubmission: action.error,
      };
    case submissionConstants.FETCH_SUBMISSION_SUCCESS:
      return {
        ...state,
        fetchSubmission: null,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_FAIL:
      return {
        ...state,
        browseJudgeCase: action.error,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
      return {
        ...state,
        browseJudgeCase: null,
      };
    default:
      return state;
  }
}
