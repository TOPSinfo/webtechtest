// store/session/reducers.ts
import { combineReducers } from 'redux'
import { Action } from './actions'

// States' definition
  type QuestionList = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
  }
export interface QuestionReducer {
  listQuestion: QuestionList[],
  currentQuestion?: QuestionList,
  isLoading: boolean
}

export interface State {
  questionReducer: QuestionReducer
}

const getUpdatedList = (stateList: QuestionList[], updateQue: string, updateData: QuestionList) => {
    return stateList.map(list => {
      if (list.question === updateQue) {
        list = updateData
      }
      return list
    })
}

const questionReducer = (state: QuestionReducer = { listQuestion: [], isLoading: false }, action: Action): QuestionReducer => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'GET_LIST':
      return { ...state, listQuestion: action.listQuestion }
    case 'GET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.currentQuestion }
    case 'LOAD_MORE_QUESTION':
      return { ...state, listQuestion: [ ...action.moreQuestion, ...state.listQuestion]}
    case 'DELETE_QUESTION':
      return { ...state, currentQuestion: {category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: [] },
        listQuestion: state.listQuestion.filter(list => list.question !== action.question)}
    case 'ADD_QUESTION':
      return { ...state, listQuestion: [ action.addData, ...state.listQuestion]}
    case 'UPDATE_QUESTION':
      return { ...state, currentQuestion: {category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: [] },
        listQuestion: getUpdatedList(state.listQuestion, action.updateQue , action.updateData)
      }
  }
  return state
}
export default combineReducers<State>({
  questionReducer
})