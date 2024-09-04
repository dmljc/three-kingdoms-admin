import { Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Coverupload } from '../../components/index';
import { ModalProps, CreateBook, UpdateBook } from './interface';
import { create, update } from './api';

const { TextArea } = Input;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const CreateModal = (props: ModalProps) => {
    const [form] = useForm<CreateBook>();

    const handleOk = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();

        try {
            const apiUrl = props.modalType === 'create' ? create : update;
            const resp = await apiUrl(values);
            if (resp.success === true) {
                message.success('创建成功');
                form.resetFields();
                props.handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title={props.modalType === 'create' ? '添加英雄' : '编辑英雄'}
            open={props.isOpen}
            onOk={handleOk}
            onCancel={() => props.handleClose()}
            okText={'创建'}
        >
            <Form form={form} colon={false} {...layout}>
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="字名"
                    name="word"
                    rules={[{ required: true, message: '请输入作者的字!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="介绍"
                    name="description"
                    rules={[{ required: true, message: '请输入介绍!' }]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="头像"
                    name="avatar"
                    rules={[{ required: true, message: '请上传头像!' }]}
                >
                    <Coverupload />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateModal;
