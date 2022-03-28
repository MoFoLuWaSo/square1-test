import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    INIT_URL,
    SIGNOUT_USER_SUCCESS,
    USER_DATA
} from "../../constants/ActionTypes";
import {fetchRecords} from "./Common";
import {USER} from "../../constants/ServerUrl";
import axios from 'axios';


export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const getUser = (location = "/") => {

    return (dispatch) => {
        dispatch({type: FETCH_START});

        fetchRecords(USER).then(res => {
            if (res.success) {
                dispatch({type: FETCH_SUCCESS});
                dispatch({type: USER_DATA, payload: res.user});
            } else {
                dispatch({type: FETCH_ERROR, payload: 'Problem verifying your identity'});
                // window.location.reload();

            }
        }).catch(err => {
            dispatch({type: FETCH_ERROR, payload: 'Error'});
            //  window.location.reload();
            console.log(err);
        });
    }
};


export const userSignOut = () => {

    return (dispatch) => {
        dispatch({type: FETCH_START});

        axios.post('/logout').then(({data}) => {

            if (data.success) {

                dispatch({type: FETCH_SUCCESS});
                dispatch({type: SIGNOUT_USER_SUCCESS});
            } else {

                dispatch({type: FETCH_ERROR, payload: data.error});
                dispatch({type: SIGNOUT_USER_SUCCESS});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});

            dispatch({type: SIGNOUT_USER_SUCCESS});
            console.log("Error****:", error.message);
        });
    }
};


export const userSignIn = (url, data) => {

    return new Promise((resolve, reject) => {
        axios.post(url, data).then(({res}) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });

};
