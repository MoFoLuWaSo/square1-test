import React from "react";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import configureStore, {history} from './appRedux/store';
import App from "./containers/App/index";


const store = configureStore();

const WebBlogApp = () => <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
    </ConnectedRouter>
</Provider>;


export default WebBlogApp;

