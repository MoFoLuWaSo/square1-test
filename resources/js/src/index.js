import React from "react";
import ReactDOM from "react-dom";
import WebBlogApp from './WebBlogApp';

const render = Component => {
    ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    );
};

render(WebBlogApp);
