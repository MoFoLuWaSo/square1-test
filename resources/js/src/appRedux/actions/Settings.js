import {SWITCH_LANGUAGE} from "../../constants/ActionTypes";


export function switchLanguage(locale) {
  return (dispatch) => {
    dispatch({
      type: SWITCH_LANGUAGE,
      payload: locale
    });
  }
}
