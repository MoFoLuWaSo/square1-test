import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    HIDE_MESSAGE,
    SET_CURRENT,
    SHOW_MESSAGE, SIGNOUT_USER_SUCCESS, USER_DATA
} from "../../constants/ActionTypes";
import axios from '../../util/Api';


export const fetchStart = () => {
    return {
        type: FETCH_START
    }
};

export const fetchSuccess = () => {
    return {
        type: FETCH_SUCCESS
    }
};

export const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: error
    }
};

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
};


export const setCurrent = (current) => {
    return {
        type: SET_CURRENT,
        payload: current
    }
}

export const fetchRecords = (url) => {


    return new Promise((resolve, reject) => {
        axios.get(url).then(({data}) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
};

export const saveRecords = (url, data) => {

    return new Promise((resolve, reject) => {
        axios.post(url, data).then(({data}) => {

            resolve(data);

        }).catch(err => {
            reject(err);
            console.log(err);

        });
    });


};





