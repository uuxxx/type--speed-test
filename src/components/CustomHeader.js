import React, {useEffect, useState, useContext} from 'react';
import {Menu, Layout} from "antd";
import {Link, useLocation} from "react-router-dom";
import {GlobalContext} from "../contexts/globalContext";

const {Header} = Layout


const headerItems = [
    {label: 'Загрузка текстов', pathname: '/'},
    {label: 'Тестирование', pathname: '/game'},
    {label: 'Обучение', pathname: '/learn'},
    {label: 'Вход', pathname: '/sign-in'},
    {label: 'Регистрация', pathname: '/sign-up'},
    {label: 'Профиль', pathname: '/profile'}
]

const CustomHeader = () => {

    const {currentUser} = useContext(GlobalContext)

    const {pathname} = useLocation()

    const [keysOfSelectedItems, setKeysOfSelectedItems] = useState([pathname])

    useEffect(() => {
        setKeysOfSelectedItems([pathname])
    }, [pathname])


    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={keysOfSelectedItems}
                items={headerItems.map(({label, pathname}) => {
                    if(!currentUser && label === 'Профиль') return
                    if(currentUser && (label === 'Вход' || label === 'Регистрация')) return
                    return {
                        key: pathname,
                        label: <Link to={pathname}>{label}</Link>,
                    }
                })}
            />
        </Header>
    );
};

export default CustomHeader;