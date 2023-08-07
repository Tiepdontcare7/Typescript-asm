import { Button, Form, Input, Select } from 'antd';
import { IProduct, ICategory } from '../../../types/products';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../api/products';
import { addProducts } from '../../../redux/productSlice';

const { Option } = Select;

type FieldType = {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    categoryId?: number
};

const AddProductPage = () => {
    const dispatch = useDispatch()
    const next = useNavigate()

    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory);

    const onFinish = (values: IProduct) => {
        addProduct(values)
        .then((res) => {
            dispatch(addProducts(res.data))
            alert('Added products')
            next('/admin/dashboard')
        });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed: ' + errorInfo);
    };



    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700, margin: "150px auto", border: "1px solid #999",boxShadow: "0 0 10px #ccc" , borderRadius: "5px", padding: "40px 130px 40px 0" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }]}
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input your description!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Link image"
                name="image"
                rules={[{ required: true, message: 'Please input your image!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: 'Please select category!' }]}
            >
                <Select>
                    {listCategory.map((category) => (
                        <Option key={category.id} value={category.id}> {category.name} </Option>
                    ))}
                </Select>
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{ backgroundColor: '#744898' }} type="primary" htmlType="submit">
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddProductPage