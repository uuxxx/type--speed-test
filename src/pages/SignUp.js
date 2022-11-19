import React, {useState, useContext} from 'react';
import {signup} from "../firebase";
import {signUpPasswordsValid} from "../utils";
import {GlobalContext} from "../contexts/globalContext";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input} from "antd";
import AccessDenied from "./AccessDenied";
import st from './authAndSignUp.module.scss'


const SignUp = () => {

    const {currentUser, setAlert} = useContext(GlobalContext)
    const navigate = useNavigate()

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const onFinish = async ({email, password, confirmPassword}) => {
        setIsButtonDisabled(true)
        try {
            if(signUpPasswordsValid(password, confirmPassword)) {
                await signup(email, password)
                setAlert({type: 'success', message: `Аккаунт ${email} успешно зарегестрирован!`})
                navigate('/profile')
            } else {
                throw new Error('Пароли не совпадают')
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

    if(!currentUser) {

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
                            label="Пароль"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, подтвердите пароль!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item style={{marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
                            <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                                Регистрация
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
        );
    }

    return <AccessDenied reason={'authorized'}/>
};

export default SignUp;