import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "../util/asyncComponent";


const App = ({match}) => (
    <div>
        <Switch>

            <Route path={`${match.url}home`} component={asyncComponent(() => import('./Account'))}/>
            <Route path={`${match.url}login`} component={asyncComponent(() => import('./Welcome'))}/>
            <Route path={`${match.url}/`} component={asyncComponent(() => import('./Welcome'))}/>


        </Switch>
    </div>
);

export default App;
