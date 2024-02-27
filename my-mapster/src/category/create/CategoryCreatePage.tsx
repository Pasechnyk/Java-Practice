import {useNavigate} from "react-router-dom";
import {ICategoryCreate, IUploadedFile} from "./types.ts";
import {Button, Form, Input, Row, Upload} from "antd";
import {Link} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {UploadChangeParam} from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import http_common from "../../http_common.ts";

const CategoryCreatePage = () => {
    // Використовуємо navigate для переходу між сторінками
    const navigate = useNavigate();

    // Використовуємо useState для зберігання стану форми
    const [form] = Form.useForm<ICategoryCreate>();

    // Подія для відправки форми
    const onHandlerSubmit = async (values: ICategoryCreate) => {
        try {
            // Використовуємо post запит для створення категорії
            await http_common.post("/api/categories/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Переходимо на головну сторінку
            navigate('/');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    return (
        <>
            {/* Заголовок сторінки */}
            <h1>Додати категорію</h1>
            {/* Форма для створення категорії */}
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onHandlerSubmit}
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
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 3, message: "Довжина поля 3 символи"}
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    {/* Поле для введення опису */}
                    <Form.Item
                        label={"Опис"}
                        name={"description"}
                        htmlFor={"description"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 10, message: "Довжина поля 10 символи"}
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    {/* Поле для завантаження файлу */}
                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="image"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{required: true, message: 'Оберіть фото категорії!'}]}
                    >
                        {/* Зображення або кнопка для завантаження нового файлу */}
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/*@ts-expect-error*/}
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    {/* Кнопки для збереження та скасування */}
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Додати
                        </Button>
                        {/* Перехід на головну сторінку */}
                        <Link to={"/"}>
                            <Button style={{margin: 10}} htmlType="button">
                                Скасувати
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Row>
        </>
    );
}

export default CategoryCreatePage;
