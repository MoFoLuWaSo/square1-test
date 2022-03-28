import {Form, Input, InputNumber, Modal, Progress, Spin} from "antd";
import React, {useEffect, useState} from "react";
import Helpers from "../../util/Helpers";
import {saveRecords} from "../../appRedux/actions";
import {REGISTER} from "../../constants/ServerUrl";
import ErrorMessage from "../ErrorMessage";
import zxcvbn from "zxcvbn";
import {ReloadOutlined} from "@ant-design/icons";


const RegisterModal = (props) => {
    const {open, isOpen} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);
    const [strength, setStrength] = useState(0);
    const [confirmCode, setConfirmCode] = useState(0);
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
        if (confirmCode === 0) {
            generateCode();
        }
    }
    const generateCode = () => {
        setConfirmCode(Math.round(Math.random() * 9999));
    }
    const handleRegistration = (data) => {
        if (strength < 3) {
            setError("Password is too weak");
            return;
        } else {
            setError(null);
        }

        if (form.getFieldValue('code').toString() !== confirmCode.toString()) {
            setError("Confirmation code does not match");
            return;
        }
        isLoading(true);
        form.validateFields().then(values => {
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);
            saveRecords(REGISTER, formData).then(res => {
                generateCode();
                isLoading(false);
            }).catch(err => {
                console.log(err);
                isLoading(false);
            });
            isLoading(false);
        }).catch(err => {
            console.log(err);
            isLoading(false);
        })
    }
    const handlePasswordInput = (e) => {
        let password = zxcvbn(e.target.value);
        setStrength(password.score);

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
            title="User Registration"
            okText="Register"
            cancelText="Cancel"
            forceRender={true}
            onOk={handleRegistration}
        >
            <Spin spinning={loading} tip="Loading...">
                <ErrorMessage error={error}/>
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
                        <Input string={true} className="p-2"/>

                    </Form.Item>
                    <Form.Item label="Email Address" className="w-full"
                               name="email"
                               rules={[{
                                   required: true,
                                   type: "email",
                                   message: "Please enter a valid email address"
                               }]}
                    >
                        <Input className="p-2" string={true}/>

                    </Form.Item>
                    <div className="lg:flex justify-between lg:space-x-2">
                        <Form.Item label="Password" className="w-full"
                                   name="password"

                                   rules={[{
                                       required: true,
                                       message: "Please enter a password"
                                   }]}
                        >
                            <Input.Password className="p-2" string={true} onChange={handlePasswordInput}/>

                        </Form.Item>
                        <Form.Item label="Confirm Password" className="w-full"
                                   name="password_confirmation"
                                   rules={[{
                                       required: true,
                                       message: "Please enter a confirmation password"
                                   }]}
                        >
                            <Input.Password className="p-2" string={true}/>

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
            </Spin>
        </Modal>
    );
}

export default RegisterModal;
