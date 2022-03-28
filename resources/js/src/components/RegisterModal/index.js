import {Form, Input, Modal, Spin} from "antd";
import React, {useState} from "react";
import Helpers from "../../util/Helpers";
import {saveRecords} from "../../appRedux/actions";
import {REGISTER} from "../../constants/ServerUrl";
import ErrorMessage from "../ErrorMessage";

const RegisterModal = (props) => {
    const {open, isOpen} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);

    const handleRegistration = (data) => {

        form.validateFields().then(values => {
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);
            saveRecords(REGISTER, formData).then(res => {

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
                        <Input className="p-2"/>

                    </Form.Item>
                    <Form.Item label="Email Address" className="w-full"
                               name="email"
                               rules={[{
                                   required: true,
                                   type:"email",
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
                        <Form.Item label="Confirm Password" className="w-full"
                                   name="confirmation_password"
                                   rules={[{
                                       required: true,
                                       message: "Please enter a confirmation password"
                                   }]}
                        >
                            <Input.Password className="p-2"/>

                        </Form.Item>
                    </div>

                </Form>
            </Spin>
        </Modal>
    );
}

export default RegisterModal;
