import {Link, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import App from "../../routes";
import React from "react";

const MainApp = () => {
    const match = useRouteMatch();
    let {pathname} = useSelector(({common}) => common);
    const {authUser} = useSelector(({auth}) => auth);
    let selectedKeys = pathname.substr(1);
    let defaultOpenKeys = selectedKeys.split('/')[1];


    return (
        <main>
            <App match={match}/>
        </main>
    );
}

export default MainApp;
