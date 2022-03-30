import {Form, Input, InputNumber, Modal, Progress, Spin, message, Button} from "antd";
import React, {useEffect, useState} from "react";
import Helpers from "../../util/Helpers";
import { userSignOut} from "../../appRedux/actions";
import {REGISTER, SEND_EMAIL_VERIFICATION} from "../../constants/ServerUrl";
import ErrorMessage from "../ErrorMessage";
import zxcvbn from "zxcvbn";
import {ReloadOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {USER_DATA} from "../../constants/ActionTypes";
import {useHistory} from "react-router-dom";

const RegisterModal = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);

    const {open, isOpen} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [notify, setNotify] = useState(null);
    const [loading, isLoading] = useState(false);
    const [strength, setStrength] = useState(0);
    const [confirmCode, setConfirmCode] = useState(0);
    const [mount, isMount] = useState(true);
    const [verified, isVerified] = useState(0);//0 = not registered, 1 = registered not verified
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
        if (confirmCode === 0) {
            generateCode();
        }

        if (authUser) {
            if (!authUser.email_verified_at) {
                isVerified(1);
            }
        }
    }
    const generateCode = () => {
        setConfirmCode(Math.round(Math.random() * 9999));
    }
    const handleRegistration = (data) => {
        if (loading) {
            return;
        }

        if (strength < 3) {
            setError("Password is too weak, must be at least 75% strong");
            return;
        } else {
            setError(null);
        }

        if (form.getFieldValue('code').toString() !== confirmCode.toString()) {
            setError("Confirmation code does not match");
            return;
        }
        form.validateFields().then(values => {
            isLoading(true);
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);
            formData.delete('password');
            formData.append('password', Buffer.from(values['password']).toString('base64'));
            formData.delete('password_confirmation');
            formData.append('password_confirmation', Buffer.from(values['password_confirmation']).toString('base64'));
            formData.append('code_confirmation', confirmCode.toString());

            axios.post(REGISTER, formData).then(res => {
                let result = res.data;

                if (result === "") {

                    isVerified(1);

                    generateCode();
                    message.success("Registration successful, please check your email for verification link");
                } else if (!result.success) {
                    setError(result.error);
                    message.error("Registration failed!");
                } else if (result.success) {

                    if (!result.user.email_verified_at) {
                        isVerified(1);
                    } else {
                        dispatch({type: USER_DATA, payload: result.user});
                        message.info("You are already signed in to an account");
                        history.push('/home');
                    }
                }
                isLoading(false);
            }).catch(err => {
                console.log(err);
                isLoading(false);
            });

        }).catch(err => {
            console.log(err);
            isLoading(false);
        })
    }
    const handlePasswordInput = (e) => {
        let password = zxcvbn(e.target.value);
        setStrength(password.score);

    }

    const registrationForm = () => {
        return (
            <div>

                <Form
                    name="register"
                    layout={"vertical"}
                    form={form}
                    scrollToFirstError={true}

                >
                    <Form.Item label="Name" className="w-full"
                               name="name"
                               rules={[{
                                   required: true,
                                   message: "Please enter your name"
                               }]}
                    >
                        <Input className="p-2"/>

                    </Form.Item>
                    <Form.Item label="Email Address" className="w-full"
                               name="email"
                               rules={[{
                                   required: true,
                                   type: "email",
                                   message: "Please enter a valid email address"
                               }]}
                    >
                        <Input className="p-2"/>

                    </Form.Item>
                    <div className="lg:flex justify-between lg:space-x-2">
                        <Form.Item label="Password" className="w-full"
                                   name="password"

                                   rules={[{
                                       required: true,
                                       message: "Please enter a password"
                                   }]}
                        >
                            <Input.Password className="p-2" onChange={handlePasswordInput}/>

                        </Form.Item>
                        <Form.Item label="Confirm Password" className="w-full"
                                   name="password_confirmation"
                                   rules={[{
                                       required: true,
                                       message: "Please enter a confirmation password"
                                   }]}
                        >
                            <Input.Password className="p-2"/>

                        </Form.Item>
                    </div>
                    <div><p>Strength:</p>
                        <Progress
                            size="small"
                            percent={(strength * 100) / 4}
                            status={strength <= 2 ? "exception" : strength === 3 ? "active" : "success"}
                        />
                    </div>
                    <div className="lg:flex justify-between lg:space-x-2">
                        <div onClick={generateCode}>

                            <ReloadOutlined className="cursor-pointer"/>
                        </div>
                        <div className="p-1 text-center bg-pink-500 w-1/2">
                            <p className="font-semibold text-2xl strike-through text-white line-through ">{confirmCode}</p>
                        </div>
                        <Form.Item label="Enter the conde in the pink square" className="w-full"
                                   name="code"
                                   rules={[{
                                       required: true,
                                       message: "The code in the pink square is required"
                                   }]}
                        >
                            <InputNumber className="p-2"/>

                        </Form.Item>

                    </div>
                </Form>
            </div>
        );
    }

    const resendVerificationLink = () => {
        isLoading(true);
        axios.post(SEND_EMAIL_VERIFICATION, []).then(res => {
            let result = res.data

            if (result === "") {
                setNotify(true);
            }
            isLoading(false);

        }).catch(err => {
            console.log(err);
            isLoading(false);
        })
    }

    const verificationForm = () => {
        return (
            <div>
                <div className="mx-auto flex justify-center mb-5">
                    <img className="w-16" alt="WebBlog" src="/images/logo/webblog_logo.png"/>
                </div>
                <div className="bg-white p-3 w-full mx-auto shadow-md rounded">
                    <div className="flex justify-center">
                        <img className="w-28" alt="Verify Email" src="/images/logo/verify-email.svg"/>

                    </div>
                    <div className="text-center">

                        <p className="font-semibold text-xl">Just one more step, Lets verify your email address</p>
                        <p className="text-sm pt-3">We already sent a verification link to <span
                            className="font-bold">{authUser ? authUser.email : 'your email'}</span>, please check your
                            inbox
                            and click on the
                            link to
                            verify your email</p>
                        {notify && (
                            <p className="text-green-600 mt-4">New Verification Link has been successfully sent to
                                your
                                email
                                address</p>
                        )}
                        {error && (
                            <p className="text-red-600 mt-4">{error}</p>
                        )}

                        <div className="pt-3">

                            <a onClick={() => {
                                dispatch(userSignOut());
                            }}>Sign out</a>
                        </div>
                        <p>This is a test no email has actually been sent, hit the home button below to login </p>
                        <div className="pt-3">

                            <button className="bg-blue-500 p-2" onClick={() => {
                                history.push('/home');
                            }}>Home</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Modal
            width={440}
            visible={open}
            onCancel={() => {
                setError(null);
                form.resetFields();
                isOpen(false);
            }}

            title={verified === 0 ? "User Registration" : "Verify Email Address"}
            okText={verified === 0 ? "Register" : "Re-send Verification Link"}
            cancelText="Cancel"
            forceRender={true}
            onOk={verified === 0 ? handleRegistration : resendVerificationLink}
        >
            <Spin spinning={loading} tip="Loading...">
                <ErrorMessage error={error}/>
                {verified === 0 && (
                    <>
                        {registrationForm()}
                    </>
                )}
                {verified === 1 && (
                    <>
                        {verificationForm()}
                    </>
                )}
            </Spin>
        </Modal>
    );
}

export default RegisterModal;
