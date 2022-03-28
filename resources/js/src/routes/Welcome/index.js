import React, {useEffect, useRef, useState} from "react";
import {Badge, Button, Card, Carousel, Pagination} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined, EyeInvisibleOutlined, InboxOutlined} from "@ant-design/icons";
import Helmet from "react-helmet";

import {GET_PUBLIC_POSTS} from "../../constants/ServerUrl";
import {fetchRecords} from "../../appRedux/actions";
import SignInModal from "../../components/SignInModal";
import RegisterModal from "../../components/RegisterModal";
import Helpers from "../../util/Helpers";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Welcome = () => {
    const {Meta} = Card;
    const [mount, isMount] = useState(true);
    const [loading, isLoading] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 30, from: 1});
    const [openSignIn, isSignInOpen] = useState(false);
    const [openRegister, isRegisterOpen] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const slider = useRef();
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
        getBlogPosts();
    }
    const getBlogPosts = (paging = pagination) => {
        isLoading(true);
        fetchRecords(GET_PUBLIC_POSTS + '?page=' + paging.current + '&per_page' + paging.pageSize + '&sort_by=publication_date&direction=desc').then(res => {
            // setPagination({
            //     current: res.data.paginate.current_page,
            //     pageSize: res.data.paginate.per_page,
            //     total: res.data.paginate.total,
            //     from: res.data.paginate.from,
            // });
            setBlogPosts(res.data);
            isLoading(false);
        }).catch(err => {
            console.log(err);
            isLoading(false);
        });
    }
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newPosts = reorder(
            blogPosts,
            result.source.index,
            result.destination.index
        );

        setBlogPosts(newPosts);
    }
    const onPageChange = (page) => {

        getBlogPosts({pageSize: pagination.pageSize, current: page});
    }

    return (


        <div className="lg:max-w-8xl lg:mx-auto  sm:px-20 py-5 webblog ">
            <Helmet>

                <title>{`Welcome to WebBlog by Square 1`}</title>
                <meta name="description" content="a web blogging platform for the lovers of photography"/>

            </Helmet>
            <header>
                <div className=" flex items-center text-white mb-20">
                    <img src="images/logo/webblog_logo.png" width="70"/>
                    <div className="text-xl text-white ml-2 "><span className="font-semibold text-white">web</span>blog
                    </div>
                </div>

                <div className="mt-20 pt-16 flex justify-between">
                    <div className="w-full xl:w-2/5 lg:w-2/5 sm:w-full md:w-1/2">

                        <div className="bg-white p-10 rounded space-y-3 ">
                            <h1 className="font-bold text-2xl">a blog about photography</h1>
                            <p className="text-baseline">Discover beautiful photos and stories about them </p>
                            <button onClick={() => {
                                isRegisterOpen(true);
                            }} className="bg-blue-500 my-2 h-10 text-white rounded-full px-8 shadow-lg">Get
                                started
                            </button>
                            <button onClick={() => {
                                isSignInOpen(true);
                            }} className="ml-3 my-2 h-10 text-blue-500 rounded-full px-8 shadow-lg">Login
                            </button>
                        </div>
                    </div>
                    <div className=" w-full xl:w-2/5 lg:w-2/5 sm:w-full md:w-1/2 -mt-36">

                        <Carousel autoplay={false} ref={ref => {

                            slider.current = ref;
                        }}>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="Square1" src="images/carousels/square1_logo1.jpg"/>}
                                >
                                    <Meta title="SQUARE1" description="www.square1.io.com"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik1" src="images/carousels/photo1.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik2" src="images/carousels/photo2.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik3" src="images/carousels/photo3.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik4" src="images/carousels/photo4.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik5" src="images/carousels/photo5.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="freepik6" src="images/carousels/photo6.jpg" width="400px"/>}
                                >
                                    <Meta title="Attribution to Freepik"
                                          description="https://www.freepik.com/psd/flower"/>
                                </Card>
                            </div>
                            <div>
                                <Card
                                    hoverable
                                    style={{width: 400}}
                                    cover={<img alt="Square1" src="images/carousels/square1_logo.jpg" width="400px"/>}
                                >
                                    <Meta title="Square1" description="https://square1.io/"/>
                                </Card>
                            </div>
                        </Carousel>
                        <div>
                            <Button onClick={() => {
                                let current = carouselIndex - 1;
                                if (carouselIndex === 0) {
                                    current = 7;
                                }
                                setCarouselIndex(current);
                                slider.current.goTo(current);
                            }}><ArrowLeftOutlined/></Button>
                            <Button onClick={() => {
                                let current = carouselIndex + 1;
                                if (carouselIndex === 7) {
                                    current = 0;
                                }
                                setCarouselIndex(current);
                                slider.current.goTo(current);

                            }}><ArrowRightOutlined/></Button>
                        </div>
                    </div>
                </div>

            </header>

            <SignInModal open={openSignIn} isOpen={isSignInOpen}/>
            <RegisterModal open={openRegister} isOpen={isRegisterOpen}/>


            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {provided => (
                        <div className="grid grid-cols-2 gap-10 mt-5"
                             ref={provided.innerRef} {...provided.droppableProps}>

                            {blogPosts.map((post, index) => {
                                return (
                                    <Draggable draggableId={`${index}`} index={index} key={index}>
                                        {provided => (
                                            <div ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps} className="shadow-lg">
                                                <Badge.Ribbon text={Helpers.displayDateTime(post.publication_date)}
                                                              color={(post.id % 2) === 0 ? "purple" : "pink"}>
                                                    <div className="bg-white p-10 rounded space-y-3 ">
                                                        <h1 className="font-bold text-2xl">{post.title}</h1>
                                                        <p className="text-baseline">{post.description} </p>
                                                        <button
                                                            className="ml-3 my-2 h-10 text-blue-500 rounded-full px-8 shadow-lg">Author: {post.id}
                                                        </button>

                                                    </div>
                                                </Badge.Ribbon>
                                            </div>)}
                                    </Draggable>


                                );
                            })}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
            </DragDropContext>
            <Pagination className="pb-2" size="small"
                        defaultCurrent={pagination.current}
                        total={pagination.total}
                        onChange={onPageChange}
                        pageSize={pagination.pageSize}/>
        </div>

    );
}

export default Welcome;
