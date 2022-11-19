import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const AccessDenied = ({reason}) => {

    const title = reason === 'authorized' ? 'Вы уже авторизованы!' : 'Вы не вошли в аккаунт!'

    const extra = () => {
        if(reason === 'authorized') {
            return (
                <Button type="primary" key="console">
                    <Link to={'/profile'}>Профиль</Link>
                </Button>
            )
        }

        return (
            <>
                <Button type="primary" key="sign-in">
                    <Link to={'/sign-in'}>Войти</Link>
                </Button>
                <Button style={{marginLeft: '10px'}} type="primary" key="sign-up">
                    <Link to={'/sign-up'}>Зарегистрироваться</Link>
                </Button>
            </>
        )
    }

    return (
        <Result
            title={title}
            extra={extra()}
        />
    );
};

export default AccessDenied;