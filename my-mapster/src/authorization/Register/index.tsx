import {Button, Divider, Flex, Form, Input, Row, Typography, message, Spin} from 'antd';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {Link, useNavigate} from 'react-router-dom';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNotification} from '../../hooks/notification';
import {Status} from '../../utils/enums';
import { IRegister} from "../../interfaces/account";
import { register} from "../../store/accounts/accounts.actions.ts";
import React from 'react';

const Register : React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);
    const status = useAppSelector(state => state.account.status);

    const onFinish = async (values: IRegister) => {
        console.log("values", values)
        try {
            const response = await dispatch(register(values));
            unwrapResult(response);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Spin  tip="Loading" size="large" spinning={status === Status.LOADING}>
            <Row gutter={16}>
                {contextHolder}
                <Divider orientation="left">Вхід</Divider>
                <Flex vertical style={{width: '100%'}} align="center" justify="center">

                    <h1 style={{margin: 100}}>Зареєструватися</h1>

                    <Form
                        name="basic"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 16}}
                        style={{width: 700}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    min: 3,
                                    message: 'Довжина імені має складатися з 3 та більше символів!',
                                },
                                {
                                    required: true,
                                    message: 'Немає імені!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                {
                                    min: 3,
                                    message: 'Довжина прізвища має складатися з 3 та більше символів!',
                                },
                                {
                                    required: true,
                                    message: 'Введіть прізвище!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    min: 10,
                                    message: 'Довжина номеру має складатися з 10 символів!',
                                },
                                {
                                    required: true,
                                    message: 'Введіть номер!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Неправильна пошта!',
                                },
                                {
                                    required: true,
                                    message: 'Введіть пошту!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Введіть пароль!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{required: true, message: 'Підтвердіть пароль!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                            <Button size="large" type="primary" htmlType="submit" style={{paddingInline: 50}}>
                                Зареєструватися
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 24}}>
                            <Typography style={{textAlign: 'center'}}>
                                Є аккаунт? <Link to="/login">Ввійти</Link>
                            </Typography>
                        </Form.Item>
                    </Form>
                </Flex>
            </Row>
        </Spin>
    );
};

export default Register;