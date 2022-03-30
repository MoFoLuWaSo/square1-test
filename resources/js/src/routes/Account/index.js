import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Helmet from "react-helmet";
import {Table, Typography} from "antd";

import Helpers from "../../util/Helpers";
import {fetchRecords, userSignOut} from "../../appRedux/actions";
import {BLOG_POSTS} from "../../constants/ServerUrl";
import AddPost from "./AddPost";

const Account = () => {
    const dispatch = useDispatch();
    const [mount, isMount] = useState(true);
    const {authUser} = useSelector(({auth}) => auth);
    const history = useHistory();
    const [pagination, setPagination] = useState({current: 1, pageSize: 20, from: 1});
    const {Paragraph} = Typography;
    const [loading, isLoading] = useState(false);
    const [openPost, isPostOpen] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const columns = [
        {
            title: 'S/N',
            render: (text, record, index) => {
                return <span>{index + pagination.from}</span>;

            },
            width: "6%"

        }, {
            title: 'Title',
            dataIndex: 'title',
        }, {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record, index) => {
                return (
                    <Paragraph ellipsis={{rows: 3, expandable: true, symbol: 'see more'}}>
                        {text}
                    </Paragraph>
                );
            }
        }, {
            title: 'Publication Date',
            dataIndex: 'publication_date',
            render: (text => {
                return Helpers.displayDateTime(text);
            }),
            sorter: true,
        },
        // {
        //     title: 'Author',
        //     dataIndex: 'user_id',
        //     render: (text => {
        //         return text;
        //     })
        // }
    ];
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
    }, [authUser]);


    const mountedRequests = () => {
        if (authUser) {
            if (!authUser.email_verified_at) {
                history.push('/');
            } else {
                getBlogPosts();
            }
        }

    }

    const getBlogPosts = (field = sortField, order = sortOrder, paging = pagination) => {
        if (loading) {
            return;
        }
        if (!field) {
            field = 'publication_date';
        }
        if (!order) {
            order = 'desc';
        }
        if (!paging.current) {
            paging.current = 1;
        }
        isLoading(true);
        fetchRecords(BLOG_POSTS + "?sort_by=" + field + "&direction=" + order + "&page=" + paging.current + "&per_page=" + paging.pageSize + '&user_id=' + authUser.id).then((res) => {

            setBlogPosts(res.data);
            setPagination({
                current: res.paginate.current_page,
                pageSize: res.paginate.per_page,
                total: res.paginate.total,
                from: res.paginate.from,
            });

            isLoading(false);
        }).catch(err => {
            isLoading(false);
        });

    }

    const handlePostChange = (paging, filters, sorter) => {

        let field = "";
        let order = "";

        if (sorter) {
            field = sorter.field;
            order = sorter.order;

            if (order === "ascend") {
                order = "asc";
            } else if (order === "descend") {
                order = "desc";
            }
        }

        setSortField(field);
        setSortOrder(order);
        getBlogPosts(field, order, paging);
    }


    return (
        <div>
            <div className="lg:max-w-8xl lg:mx-auto  sm:px-20 py-5 webblog ">
                <Helmet>

                    <title>{`Welcome Home`}</title>
                    <meta name="description" content="a web blogging platform for the lovers of photography"/>

                </Helmet>
                <div>

                    <div className="flex justify-between rounded">

                        <div className=" flex items-center text-white mb-20">
                            <a href="/"> <img src="images/logo/webblog_logo.png" width="70"/></a>
                            <div className="text-xl text-white ml-2 ">
                                <span className="font-semibold text-white">web</span>blog
                            </div>
                        </div>

                        <div className="  text-white mb-20">
                            <button title="Sign out" onClick={() => {
                                dispatch(userSignOut());

                                history.push('/login');

                            }}><img src="images/logo/power.png" width="70"/></button>

                        </div>
                    </div>
                    <div className="text-center ">

                        <p className="text-white text-4xl italic leading-3">Blog Posts</p>
                        <p className="text-purple-400 text-xl italic leading-3">make your post count</p>
                    </div>
                    <AddPost open={openPost} isOpen={isPostOpen} getBlogPosts={getBlogPosts}/>
                    <div className="mt-35 p-16 bg-white rounded">
                        <div>
                            <button onClick={() => {
                                isPostOpen(true);
                            }} className="bg-blue-500 my-2 h-10 text-white rounded-full px-8 shadow-lg">Create Post
                            </button>
                        </div>
                        <Table
                            columns={columns}
                            pagination={pagination}
                            rowKey="id"
                            dataSource={blogPosts}
                            loading={loading}
                            onChange={handlePostChange}

                            scroll={{x: "max-content"}}/>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Account;
