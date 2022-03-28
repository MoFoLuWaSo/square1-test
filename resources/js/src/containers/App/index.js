import React, {memo, useEffect, useState} from "react";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import AppLocale from "../../lngProvider";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import MainApp from "./MainApp";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecords, getUser, setInitUrl } from "../../appRedux/actions";


const App = () => {
    const dispatch = useDispatch();
    const {initURL, authUser} = useSelector(({auth}) => auth);
    const [mount, isMount] = useState(true);
    const {locale, isDirectionRTL} = useSelector(({settings}) => settings);
    const currentAppLocale = AppLocale[locale.locale];
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    useEffect(() => {

        dispatch(setInitUrl(location.pathname));
        history.push(location.pathname);

    }, [dispatch, initURL, location.pathname, location.search]);

    useEffect(() => {
        let timeOutId = 0;
        if (mount) {

            timeOutId = setTimeout(() => {
                mountedRequests();
            }, 1000);
        }
        return () => {

            clearTimeout(timeOutId);
            isMount(false);
        }
    }, []);


    const mountedRequests = () => {
        dispatch(getUser());

    }


    return (
        <ConfigProvider locale={currentAppLocale.antd} direction={isDirectionRTL ? 'rtl' : 'ltr'}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>

                <Switch>

                    <Route path={`${match.url}`} component={MainApp}/>
                </Switch>
            </IntlProvider>
        </ConfigProvider>
    )
};


export default memo(App);
