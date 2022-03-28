import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router';
import Auth from "./Auth";
import Common from "./Common";
import Settings from "./Settings";


export default (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth,
    common: Common,
    settings: Settings,
});
