import React, {useState, useContext} from 'react';
import {GlobalContext} from "../contexts/globalContext";
import {signInPasswordValid} from "../utils";
import {signin} from "../firebase";
import {Link, useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input} from "antd";
import st from './authAndSignUp.module.scss'
import AccessDenied from "./AccessDenied";

const SignIn = () => {

    const {currentUser, setAlert} = useContext(GlobalContext)
    const navigate = useNavigate()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const onFinish = async ({email, password}) => {
        setIsButtonDisabled(true)
        try {
            if (signInPasswordValid(password)) {
                await signin(email, password)
                setAlert({type: 'success', message: 'Вы успешно вошли в аккаунт!'})
                navigate('/profile')
            } else {
                throw new Error('Пароль или логин введены неверно!')
            }
        } catch (e) {
            setAlert({type: 'error', message: e.message})
        } finally {
            setTimeout(() => {
                setAlert(null)
                setIsButtonDisabled(false)
            }, 3000)
        }
    }


    const onFinishFailed = errorInfo => console.log(errorInfo)

    if (!currentUser) {
        return (
            <div className={st.container}>
                <Form
                    style={{minWidth: '400px', padding: '20px'}}
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                            Войти
                        </Button>

                        <Link to={'/sign-up'}><Button style={{marginLeft: '8px'}}>Регистрация</Button></Link>
                    </Form.Item>


                    <Form.Item>
                        <Button>
                            Забыли пароль?
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }

    return <AccessDenied reason={'authorized'}/>
};

export default SignIn;