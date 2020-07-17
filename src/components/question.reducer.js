import { questionTypes } from "./question.types";

const initialState = {
    list: [],
    current_que: {}
}

export default function (state, action) {
    const { type, payload } = action;
    state = initialState;
    switch (type) {
        case questionTypes.GET_LIST:
            return {
                ...state,
                list: state.list.append(payload),
            };
        case questionTypes.GET_CURRENT_QUESTION:
            return {
                current_que: payload,
            };
        case questionTypes.ADD_QUESTION:
            return {
                ...state,
                list: state.list.append(payload),
            };
        
      default:
        return state;
    }
  }
  