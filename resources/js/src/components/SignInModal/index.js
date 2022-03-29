import {Form, Input, Modal, Spin} from "antd";
import React, {useEffect, useState} from "react";
import Helpers from "../../util/Helpers";

import {LOGIN_PAGE, REGISTER} from "../../constants/ServerUrl";
import ErrorMessage from "../ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getUser} from "../../appRedux/actions";

const SignInModal = (props) => {
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const history = useHistory();
    const {open, isOpen, isRegisterOpen} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);
    const [mount, isMount] = useState(true);

    useEffect(() => {

        let timeOutId = 0;
        if (mount) {

            timeOutId = setTimeout(() => {
                mountedRequests();
            }, 1200);
        }
        return () => {

            clearTimeout(timeOutId);
            isMount(false);
        }
    }, []);

    const mountedRequests = () => {


        if (authUser) {
            if (!authUser.email_verified_at) {
                isRegisterOpen(true);
                isOpen(false);
            }
        }
    }

    const handleLogin = (data) => {
        if (loading) {
            return;
        }
        setError(null);
        form.validateFields().then(values => {
            isLoading(true);
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);

            axios.post(LOGIN_PAGE, formData).then(res => {
                let result = res.data;
                if (result.success === false) {
                    setError(result.error);
                } else {

                    if (result.success || !result.two_factor) {
                        dispatch(getUser());
                        history.push('/home');
                    } else {
                        setError(result.error);

                    }
                }
                isLoading(false);
            }).catch(err => {
                console.log(err);
                isLoading(false);
            });
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal
            width={440}
            visible={open}
            title="Login"
            onCancel={() => {
                setError(null);
                form.resetFields();
                isOpen(false);
            }}
            okText="Login"
            cancelText="Cancel"
            forceRender={true}
            onOk={handleLogin}

        >
            <Spin spinning={loading} tip="Loading...">
                <div className="mx-auto flex justify-center mb-5">
                    <img className="w-16" alt="WebBlog" src="images/logo/webblog_logo.png"/>
                </div>
                <ErrorMessage error={error}/>
                <Form
                    name="sign-in"
                    layout={"vertical"}
                    form={form}
                    scrollToFirstError={true}

                >

                    <Form.Item label="Email Address" className="w-full"
                               name="email"
                               rules={[{
                                   required: true,
                                   type: "email",
                                   message: "Please enter a valid email address"
                               }]}
                    >
                        <Input className="p-2" string="Test"/>

                    </Form.Item>
                    <div className="lg:flex justify-between lg:space-x-2">
                        <Form.Item label="Password" className="w-full"
                                   name="password"
                                   rules={[{
                                       required: true,
                                       message: "Please enter a password"
                                   }]}
                        >
                            <Input.Password className="p-2" string="Test"/>

                        </Form.Item>

                    </div>

                </Form>
            </Spin>

        </Modal>
    );
}

export default SignInModal;
