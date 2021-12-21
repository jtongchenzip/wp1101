import { submissionConstants } from '../../actions/submission/constant';
import { browseJudgeCase } from '../../actions/submission/submission';

const initialState = {
  addSubmission: null,
  browseJudgeCase: null,
  fetchSubmission: null,
};

export default function submission(state = initialState, action) {
  switch (action.type) {
    case submissionConstants.ADD_SUBMISSION_START:
      return {
        ...state,
        addSubmission: true,
      };
    case submissionConstants.ADD_SUBMISSION_SUCCESS:
    case submissionConstants.ADD_SUBMISSION_FAIL:
      return {
        ...state,
        addSubmission: false,
      };
    case submissionConstants.FETCH_SUBMISSION_START:
      return {
        ...state,
        fetchSubmission: true,
      };
    case submissionConstants.FETCH_SUBMISSION_SUCCESS:
    case submissionConstants.FETCH_SUBMISSION_FAIL:
      return {
        ...state,
        fetchSubmission: false,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_START:
      return {
        ...state,
        browseJudgeCase: true,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
    case submissionConstants.BROWSE_JUDGE_CASE_FAIL:
      return {
        ...state,
        browseJudgeCase: false,
      };
    default:
      return state;
  }
}
