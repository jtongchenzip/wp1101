import agent from '../agent';
import { problemConstants } from './constant';

const readProblem = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.FETCH_PROBLEM_START });
    const res = await agent.post(`/problem/${id}`, config);
    dispatch({ type: problemConstants.FETCH_PROBLEM_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: problemConstants.FETCH_PROBLEM_FAIL,
      error,
    });
  }
};

const addProblem = (title, start_time, end_time, file, description, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
    params: {
      title,
      start_time,
      end_time,
      description,
    },
  };
  const formData = new FormData();
  formData.append('upload_file', file);
  try {
    dispatch({ type: problemConstants.ADD_PROBLEM_START });
    const res = await agent.post('/problem', formData, config);
    dispatch({ type: problemConstants.ADD_PROBLEM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: problemConstants.ADD_PROBLEM_FAIL,
      error,
    });
  }
};

const editProblem = (problem_id, title, start_time, end_time, file, description, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      title,
      start_time,
      end_time,
      description,
    },
  };
  const formData = new FormData();
  formData.append('upload_file', file);
  try {
    dispatch({ type: problemConstants.EDIT_PROBLEM_START });
    await agent.patch(`/problem/${problem_id}`, formData, config);
    dispatch({ type: problemConstants.EDIT_PROBLEM_SUCCESS });
  } catch (error) {
    dispatch({ type: problemConstants.EDIT_PROBLEM_FAIL });
  }
};

const readProblemLastSubmission = (problem_id, token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.FETCH_LAST_SUBMISSION_START });
    const res = await agent.get(`/problem/${problem_id}/last-submission`, config);
    dispatch({ type: problemConstants.FETCH_LAST_SUBMISSION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: problemConstants.FETCH_LAST_SUBMISSION_FAIL, error });
  }
};

export {
  readProblem, addProblem, editProblem, readProblemLastSubmission,
};
