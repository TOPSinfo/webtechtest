import { combineReducers } from "redux";
import questionReducer from '../components/question.reducer'

export default combineReducers({
    question:questionReducer
  });
  