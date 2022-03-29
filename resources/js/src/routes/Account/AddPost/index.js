import {Form, Input, message, Modal, Spin} from "antd";
import {BLOG_POSTS} from "../../../constants/ServerUrl";
import Helpers from "../../../util/Helpers";
import React, {useState} from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import axios from "axios";

const AddPost = (props) => {
    const {isOpen, open, getBlogPosts} = props;
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);
    const handleSavePost = () => {

        if (loading) {
            return;
        }

        form.validateFields().then(values => {
            isLoading(true);
            let formData = new FormData();
            formData = Helpers.objectFormBuilder(formData, values);
            setError(null);

            axios.post(BLOG_POSTS, formData).then(res => {
                let result = res.data;
                if (result.success) {
                    message.success("Post successfully created");
                    form.resetFields();
                } else {
                    setError(result.error);
                    message.warn("Error while creating your post");
                }
                isLoading(false);
            }).catch(err => {
                console.log(err);
                isLoading(false);
            });
        }).catch(err => {
            console.log(err);
            isLoading(false);
        });
    }


    return (
        <Modal
            width={540}
            title={<div className="text-center">Create Post</div>} centered
            visible={open}
            onCancel={() => {
                form.resetFields();
                getBlogPosts();
                isOpen(false);
            }}
            okText="Save"
            cancelText="Close"
            forceRender={true}
            onOk={handleSavePost}
        >
            <Spin spinning={loading} tip="Processing...">
                <ErrorMessage error={error}/>
                <Form
                    name="post"
                    layout={"vertical"}
                    form={form}
                    scrollToFirstError={true}

                >
                    <Form.Item label="Title" className="w-full"
                               name="title"
                               rules={[{
                                   required: true,
                                   message: "Give your post a title"
                               }]}
                    >
                        <Input className="p-2"/>

                    </Form.Item>


                    <Form.Item label="Description" className="w-full"
                               name="description"

                               rules={[{
                                   required: true,
                                   message: "A description is required"
                               }]}
                    >
                        <Input.TextArea/>

                    </Form.Item>


                </Form>
            </Spin>

        </Modal>
    );
}

export default AddPost;
