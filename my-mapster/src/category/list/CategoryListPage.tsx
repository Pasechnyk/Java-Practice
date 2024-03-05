import {Button, Col, Form, Input, Pagination, Row, Select} from "antd"; // Додано Select для вибору поля сортування
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ICategorySearch, IGetCategories} from "./types.ts";
import http_common from "../../http_common.ts";
import CategoryCard from "./CategoryCard.tsx";

// Компонент сторінки списку категорій
const CategoryListPage = () => {
    // Стан для зберігання даних категорій
    const [data, setData] = useState<IGetCategories>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });

    // Стан для зберігання параметрів пошуку і сортування
    const [searchParams, setSearchParams] = useSearchParams();

    // Стан для зберігання параметрів форми пошуку
    const [formParams, setFormParams] = useState<ICategorySearch>({
        name: searchParams.get('name') || "",
        description: searchParams.get('description') || "", // Додала поле для опису
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 2,
        sortBy: searchParams.get('sortBy') || "id", // Додала параметр для сортування
    });

    // Стан для форми пошуку
    const [form] = Form.useForm<ICategorySearch>();

    // Функція, яка викликається після відправки форми пошуку
    const onSubmit = async (values: ICategorySearch) => {
        findCategories({...formParams, page: 1, name: values.name, description: values.description});
    }

    // Ефект, який викликається після завантаження компонента
    useEffect(() => {
        http_common.get<IGetCategories>("/api/categories/search", {
            params: {
                ...formParams,
                page: formParams.page-1
            }
        })
            .then(resp => {
                console.log("Items", resp.data);
                setData(resp.data);
                form.setFieldsValue(formParams);
            });
    }, [formParams]);

    // Розпакування даних категорій
    const {content, totalElements} = data;

    // Функція видалення категорії
    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/api/categories/${id}`);
            setData({ ...data, content: content.filter(x => x.id != id)} );
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    // Функція зміни сторінки категорій
    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({...formParams, page, size: newPageSize});
    };

    // Функція зміни поля сортування
    const handleSortChange = async (sortBy: string) => {
        findCategories({...formParams, sortBy});
    };

    // Функція пошуку категорій
    const findCategories = (model: ICategorySearch) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    // Функція оновлення параметрів пошуку
    const updateSearchParams = (params : ICategorySearch) =>{
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value!="") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    // Повертаємо верстку сторінки
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button size={"large"}>Додати</Button>
            </Link>

            <Row gutter={16}>
                <Form form={form} onFinish={onSubmit} layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >
                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Опис" // Додала поле для введення опису
                        name="description"
                        htmlFor="description"
                    >
                        <Input autoComplete="description"/>
                    </Form.Item>

                    <Form.Item
                        label="Сортувати за" // Додала поле для вибору сортування
                        name="sortBy"
                        htmlFor="sortBy"
                    >
                        <Select defaultValue="id" onChange={handleSortChange}>
                            <Select.Option value="id">ID</Select.Option>
                            <Select.Option value="name">Назва</Select.Option>
                            <Select.Option value="description">Опис</Select.Option>
                        </Select>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Пошук
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>Список пустий</h2> // Якщо список категорій пустий, відображаємо повідомлення про це
                        ) : (
                            content.map((item) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        // console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={formParams.page}
                    defaultPageSize={formParams.size}
                    total={totalElements}
                    onChange={handlePageChange}
                    pageSizeOptions={[1, 2, 5, 10]}
                    showSizeChanger
                />
            </Row>
        </>
    )
}

export default CategoryListPage; // Експорт компонента
