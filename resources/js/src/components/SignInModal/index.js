import {Form, Input, Modal, Spin} from "antd";
import React, {useState} from "react";
import Helpers from "../../util/Helpers";
import {userSignIn} from "../../appRedux/actions";
import {LOGIN_PAGE} from "../../constants/ServerUrl";
import ErrorMessage from "../ErrorMessage";

const SignInModal = (props) => {
    const {open, isOpen} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);

    const handleLogin = (data) => {
        form.validateFields().then(values => {
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);

            userSignIn(LOGIN_PAGE, formData).then(res => {

            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal
            width={640}
            visible={open}
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
