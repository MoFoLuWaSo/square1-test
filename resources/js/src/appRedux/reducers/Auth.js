import {INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
    initURL: '',
    authUser: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {


        case INIT_URL: {
            return {...state, initURL: action.payload};
        }

        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,

                authUser: null,
                initURL: ''
            }
        }

        case USER_DATA: {
            return {
                ...state,
                authUser: action.payload,
            };
        }


        default:
            return state;
    }
}
