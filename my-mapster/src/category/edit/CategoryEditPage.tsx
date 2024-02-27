import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Row, Upload, UploadFile} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import http_common from "../../http_common.ts";
import {APP_ENV} from "../../env";
import {ICategoryEdit} from "./types.ts";
import {ICategoryItem} from "../list/types.ts";
import {IUploadedFile} from "../create/types.ts";

const CategoryEditPage = () => {
    // Використовуємо navigate для переходу між сторінками
    const navigate = useNavigate();
    // Використовуємо useParams для отримання параметрів з URL
    const {id} = useParams();
    // Використовуємо useState для зберігання стану форми та файлу
    const [form] = Form.useForm<ICategoryEdit>();
    const [file, setFile] = useState<UploadFile | null>();

    // Подія для відправки форми
    const onSubmit = async (values: ICategoryEdit) => {
        try {
            // Використовуємо put запит для оновлення категорії
            await http_common.put("/api/categories", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Переходимо на головну сторінку
            navigate('/');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    // Ефект для отримання категорії за ID
    useEffect(() => {
        http_common.get<ICategoryItem>(`/api/categories/${id}`)
            .then(resp => {
                const {data} = resp;
                // Заповнюємо форму та зображення
                form.setFieldsValue(data);
                setFile(
                    {
                        uid: '-1',
                        name: data.image,
                        status: 'done',
                        url: `${APP_ENV.BASE_URL}/uploading/150_${data.image}`,
                    });
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);

    return (
        <>
            {/* Заголовок сторінки */}
            <h1>Редагування категорії</h1>
            {/* Форма для редагування категорії */}
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
                    {/* Поле ID категорії, приховане */}
                    <Form.Item
                        name="id"
                        hidden
                    />

                    {/* Поле для введення назви */}
                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    {/* Поле для введення опису */}
                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    {/* Поле для завантаження файлу */}
                    <Form.Item
                        name="file"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        {/* Зображення або кнопка для завантаження нового файлу */}
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={file ? [file] : []}
                            onChange={(data) => {
                                setFile(data.fileList[0]);
                            }}

                        >
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/*@ts-expect-error*/}
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    {/* Кнопки для збереження та скасування */}
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

        </>
    )
}

export default CategoryEditPage;
