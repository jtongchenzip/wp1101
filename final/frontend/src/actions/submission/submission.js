import agent from '../agent';
import { submissionConstants } from './constant';

const submitCode = (problem_id, upload_file, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  const formData = new FormData();
  formData.append('upload_file', upload_file);
  try {
    dispatch({ type: submissionConstants.ADD_SUBMISSION_START });
    const res = await agent.post(`/problem/${problem_id}/submission`, formData, config);
    dispatch({ type: submissionConstants.ADD_PROBLEM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: submissionConstants.ADD_PROBLEM_FAIL, error });
  }
};

const readSubmission = (submission_id, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.FETCH_SUBMISSION_START });
    const res = await agent.get(`/submission/${submission_id}`, config);
    dispatch({
      type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.FETCH_SUBMISSION_FAIL,
      error,
    });
  }
};

const browseJudgeCase = (submission_id, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.BROWSE_JUDGE_CASE_START });
    const res = await agent.get(`/submsision/${submission_id}/judge-case`, config);
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.ADD_SUBMISSION_FAIL,
      error,
    });
  }
};
export {
  submitCode,
  browseJudgeCase,
  readSubmission,
};
