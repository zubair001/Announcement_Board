import React, {useState, useEffect} from "react";
import {
    Layout,
    Row,
    Col,
    Form,
    Button,
    Input,
    Card,
    Radio
} from "antd";
import {utils} from "../utils/utils";
import { postServices } from "../services/postServices";


const {Header, Content} = Layout;
const baseUrl = 'http://localhost:3001';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/posts`)
            const json = await data.json();
            setPosts(json);
        };
        fetchData().catch(console.error);
    }, [newPost])

    const onSubmit = async (values) => {
        const createPost = await postServices.createPost(values);
        if(typeof createPost !== 'undefined')
            setNewPost(!newPost);
            form.resetFields();
    };

    const delPost = async (id) => {
      const deletePost = await postServices.delPost(id);
      if(deletePost)
        setNewPost(!newPost);
    }

    const filterDate = async (days) => {
        const fromDate = utils.getOldDate(days);
        const toDate = new Date();
        const filteredPost = await postServices.filterPost(fromDate, toDate);
        setPosts(filteredPost);
    }


    return (

        <Layout>
            <Header>
                <h1 style={
                    {color: '#fff'}
                }>
                    Announcement Board</h1>
            </Header>
            <Content>
                <Row gutter={
                    [0, 16]
                }>
                    <Col span={22}
                        offset={1}>
                        <Form form={form}
                            onFinish={onSubmit}>
                            <Row style={
                                {marginTop: '10px'}
                            }>
                                <Col span={20}
                                    offset={1}>
                                    <Form.Item name="post" label="Text"
                                        rules={
                                            [{
                                                    required: true
                                                },]
                                    }>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </Form.Item>
                                </Col>


                            </Row>

                        </Form>
                    </Col>
                    <Col span={20}
                        offset={1}>

                        <Radio.Group onChange={
                                (e) => setPosts(e.target.value)
                            }
                            defaultValue={"all"}>
                            <Radio.Button onClick={
                                () => {
                                    setNewPost(!newPost)
                                }
                            }>All</Radio.Button>
                            <Radio.Button onClick={
                                () => {
                                    filterDate(1)
                                }
                            }>Today</Radio.Button>
                            <Radio.Button onClick={
                                () => {
                                    filterDate(7)
                                }
                            }>Last 7 Days</Radio.Button>
                            <Radio.Button onClick={
                                () => {
                                    filterDate(30)
                                }
                            }>Last 30 Days</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={22}
                        offset={1}>
                        {
                        posts?.map(post => {
                            return (
                                <Card key={
                                        post.id
                                    }
                                    type="inner">
                                    <Row>
                                        <Col span={12}>
                                            <p>{
                                                `${
                                                    post.post
                                                } on ${
                                                    post.date.substring(0, 10)
                                                }`
                                            }</p>
                                        </Col>
                                        <Col span={12}>
                                            <Button danger
                                                onClick={
                                                    () => {
                                                        delPost(post.id)
                                                    }
                                            }>Delete</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            )

                        })
                    } </Col>


                </Row>
            </Content>
        </Layout>
    )
}

export default Posts;
