import { questionTypes } from "./question.types";
// interface IState = {
//     list: []array,
//     current_que: Object
// }

export default (state = {
        list: [],
        current_que: {}
    }, action) => {
        const { type, payload } = action;
        
        switch (type) {
        case questionTypes.GET_LIST:
            return {
                ...state,
                list: payload,
            };
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
        
      default:
        return state;
    }
  }
  