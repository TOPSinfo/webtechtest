import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
const axios = require('axios');

// Action Definition
type QuestionList = {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

export interface SetListQuestion {
  type: 'GET_LIST'
  listQuestion: QuestionList[],
}

export interface EditQuestion {
  type: 'GET_CURRENT_QUESTION'
  currentQuestion: QuestionList
}

export interface SetMoreQuestion {
  type: 'LOAD_MORE_QUESTION'
  moreQuestion: QuestionList[]
}

export interface SetDeleteQuestion {
  type: 'DELETE_QUESTION'
  question: string
}

export interface SetAddQuestion {
  type: 'ADD_QUESTION'
  addData: QuestionList
}

export interface SetUpdateQuestion {
  type: 'UPDATE_QUESTION'
  updateQue: string
  updateData: QuestionList
}

export interface SetLoader {
  type: 'IS_LOADING'
  isLoading: boolean
}

// Union Action Types
export type Action = SetLoader | SetListQuestion | EditQuestion | SetMoreQuestion | SetDeleteQuestion | SetAddQuestion | SetUpdateQuestion

// Action Creators
export const loader = (isLoading: boolean): SetLoader => {
  return { type: 'IS_LOADING', isLoading }
}

export const list = (listQuestion: QuestionList[]): SetListQuestion => {
  return { type: 'GET_LIST', listQuestion }
}

export const edit = (currentQuestion: QuestionList): EditQuestion => {
  return { type: 'GET_CURRENT_QUESTION', currentQuestion }
}

export const loadMore = (moreQuestion: QuestionList[]): SetMoreQuestion => {
  return { type: 'LOAD_MORE_QUESTION', moreQuestion}
}

export const deleteQue = (question: string): SetDeleteQuestion => {
  return { type: 'DELETE_QUESTION', question}
}

export const add = (addData: QuestionList): SetAddQuestion => {
  return { type: 'ADD_QUESTION', addData }
}

export const update = (updateQue: string, updateData: QuestionList): SetUpdateQuestion => {
  return { type: 'UPDATE_QUESTION', updateQue, updateData }
}

// thunk action
export const setList = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(loader(true))
      axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
      .then((res: any) => {
        console.log('----res', res)
        dispatch(list(res.data.results))
        dispatch(loader(false))
            console.log('set list in progress')
            resolve()
          })
      })
  }
}

export const editQuestion = (data: QuestionList): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(edit(data))
      console.log('edit in progress')
    })
  }
}

export const loadMoreQuestion = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(loader(true))
      axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
      .then((res: any) => {
        console.log('----res', res)
        dispatch(loader(false))
        dispatch(loadMore(res.data.results))
        console.log('load more list in progress')
        resolve()
      })
    })
  }
}

export const deleteQuestion = (question: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(deleteQue(question))
      console.log('delete in progress')
    })
  }
}

export const addQuestion = (data: QuestionList): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(add(data))
      console.log('add in progress')
    })
  }
}

export const updateQuestion = (updateQue: string, data: QuestionList): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(update(updateQue, data))
      console.log('update in progress')
    })
  }
}