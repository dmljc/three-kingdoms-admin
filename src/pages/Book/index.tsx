import { SetStateAction, useEffect, useState } from 'react';
import { Button, Card, Avatar, Form, Input, message } from 'antd';
import CreateModal from './CreateModal.tsx';
import { UpdateBook } from './interface.ts';
import { list } from './api';
import './index.css';

const { Meta } = Card;

const BookManage = () => {
    const [bookList, setBookList] = useState<Array<UpdateBook>>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [modalType, setModalType] = useState<string>('create');

    async function fetchData() {
        try {
            const resp = await list(name);

            if (resp.success) {
                setBookList(resp.data);
            }
        } catch (e) {
            message.error(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [name]);

    const onSearch = (values: { name: SetStateAction<string> }) => {
        setName(values.name);
    };

    return (
        <div id="bookManage">
            <h1>英雄管理系统</h1>
            <div className="content">
                <div className="book-search">
                    <Form
                        name="search"
                        layout="inline"
                        colon={false}
                        onFinish={onSearch}
                    >
                        <Form.Item label="英雄名称" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label=" ">
                            <Button type="primary" htmlType="submit">
                                搜索英雄
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: 'green' }}
                                onClick={() => {
                                    setModalOpen(true);
                                    setModalType('create');
                                }}
                            >
                                添加英雄
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="book-list">
                    {bookList?.map(book => {
                        return (
                            <Card
                                className="card"
                                hoverable
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={`http://localhost:3000/${book.avatar}`}
                                    />
                                }
                            >
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={`http://localhost:3000/${book.avatar}`}
                                        />
                                    }
                                    title={book.name}
                                    description={book.description}
                                />
                                <div className="links">
                                    <a
                                        onClick={() => {
                                            setModalType('detail');
                                        }}
                                    >
                                        详情
                                    </a>
                                    <a
                                        onClick={() => {
                                            setModalOpen(true);
                                            setModalType('update');
                                            console.log('item=====>', book)
                                        }}
                                    >
                                        编辑
                                    </a>
                                    <a href="#">删除</a>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <CreateModal
                isOpen={modalOpen}
                modalType={modalType}
                handleClose={() => {
                    fetchData();
                    setModalOpen(false);
                }}
            />
        </div>
    );
};

export default BookManage;
