import { useNavigate } from "react-router-dom";
import { IProductCreate, IUploadedFile } from "./types.ts";
import { Button, Form, Input, Row, Upload } from "antd";
import { Link } from "react-router-dom";
import { UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import http_common from "../../http_common.ts";

const ProductCreatePage = () => {
    // Використовуємо navigate для переходу між сторінками
    const navigate = useNavigate();
    // Використовуємо useState для зберігання стану форми
    const [form] = Form.useForm<IProductCreate>();

    // Подія для відправки форми
    const onSubmit = async (values: IProductCreate) => {
        try {
            // Використовуємо post запит для створення товару
            await http_common.post("/api/products/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Переходимо на головну сторінку
            navigate('/');
        } catch (ex) {
            console.log("Exception create product", ex);
        }
    }

    return (
        <>
            <h1>Додати товар</h1>
            {/* Форма для створення товару */}
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onSubmit}
                      layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >
                    {/* Поле для введення назви */}
                    <Form.Item
                        label={"Назва"}
                        name={"name"}
                        htmlFor={"name"}
                        rules={[
                            { required: true, message: "Це поле є обов'язковим!" },
                            { min: 3, message: "Довжина поля 3 символи" }
                        ]}
                    >
                        <Input autoComplete="name" />
                    </Form.Item>

                    {/* Поле для завантаження зображення */}
                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="image"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{ required: true, message: 'Оберіть фото товару!' }]}
                    >
                        <Upload
                            showUploadList={{ showPreviewIcon: false }}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/*@ts-expect-error*/}
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    {/* Кнопки для збереження та скасування */}
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                            Додати
                        </Button>
                        {/* Перехід на головну сторінку */}
                        <Link to={"/"}>
                            <Button style={{ margin: 10 }} htmlType="button">
                                Скасувати
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Row>
        </>
    );
}

export default ProductCreatePage;

