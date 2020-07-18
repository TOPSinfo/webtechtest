import { questionTypes } from "./question.types";
// interface IState = {
//     list: []array,
//     current_que: Object
// }

const getUpdatedList = (stateList, deleteQue) => {
    return stateList.filter(list => list.question !== deleteQue)
}

export default (state = {
    list: [],
    current_que:{}
}, action) => {
        const { type, payload } = action;
        
        switch (type) {
        case questionTypes.GET_LIST:
            return {
                ...state,
                list: payload,
            };
        case questionTypes.LOAD_MORE_LIST:
            return {
                ...state,
                list: payload.append(state.list)
            }
        case questionTypes.GET_CURRENT_QUESTION:
            return {
                current_que: payload,
            };
        case questionTypes.ADD_QUESTION:
            return {
                ...state,
                // list: state.list.append(payload),
                list: payload,
            };
        case questionTypes.DELETE_QUESTION:
            return {
                ...state,
                list: getUpdatedList(state.list, payload)
            }
        
      default:
        return state;
    }
  }
  