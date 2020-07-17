import { questionTypes } from "./question.types";
import * as QuestionServices from "../services/question.service";

export const addQuestion = (data) => async (dispatch) => {
  try {
    const res = await QuestionServices.addQuestion(data);
    dispatch({
        type: questionTypes.ADD_QUESTION,
        payload: data,
      });
  } catch (err) {
      console.log('add question fail')
  }
};

export const editQue = (data) => async (dispatch) => {
  try {
    dispatch({
        type: questionTypes.GET_CURRENT_QUESTION,
        payload: data,
      });
  } catch (err) {
      console.log('edit error')
  }
};

export const listQue = () => async (dispatch) => {
  try {
    const res = await QuestionServices.getQuestionList();
    if (res) {
      dispatch({
        type: questionTypes.GET_LIST,
        payload: res,
      });
    }
  } catch (err) {
      console.log('list error')
  }
};
