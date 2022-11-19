import React, {useContext, useState} from 'react';
import {GlobalContext} from "../contexts/globalContext";
import {
    updateProfileUsernameAndPhoto,
    signout,
    uploadProfilePhoto,
} from "../firebase";
import {getDownloadURL} from 'firebase/storage'
import {accountCreationDate} from "../utils";
import {useNavigate} from "react-router-dom";
import AccessDenied from "./AccessDenied";
import {Avatar, Button, Card, Dropdown, Input, Menu, message} from "antd";
import Meta from "antd/es/card/Meta";
import {UserOutlined} from "@ant-design/icons";
import CustomAvatarUpload from "../components/upload/avatar/CustomAvatarUpload";

const Profile = () => {

    const {currentUser, setAlert} = useContext(GlobalContext)
    const [isExitButtonDisabled, setIsExitButtonDisabled] = useState(false)
    const [isAvatarAndUsernameEditable, setIsAvatarAndUsernameEditable] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState('') // base64 url
    const [userNamePreview, setUserNamePreview] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const signOutHandler = async () => {
        try {
            setIsExitButtonDisabled(true)
            await signout()
            setAlert({type: 'success', message: 'Вы вышли из аккаунта!'})
            navigate('/sign-in')
        } catch (e) {
            setAlert({type: 'error', message: e.message})
        } finally {
            setTimeout(() => setAlert(null), 3000)
            setIsExitButtonDisabled(false)
        }
    }

    const userNamePreviewInputHandler =  e => {
        const value = e.target.value
        if(value.length < 11) setUserNamePreview(value)
    }

    const updateProfileData = async () => {
        setLoading(true)
        try {
            const {ref} = await uploadProfilePhoto(avatarPreview)
            const url = await getDownloadURL(ref)
            await updateProfileUsernameAndPhoto(userNamePreview, url)
            message.success('Данные обновлены!')
        } catch (e) {
            message.error('Что-то пошло не так!')
        } finally {
            setLoading(false)
            setIsAvatarAndUsernameEditable(false)
        }
    }

    const onReturnHandler = () => {
        setIsAvatarAndUsernameEditable(false)
        setAvatarPreview('')
    }

    const dropDownItems = <Menu items = {[
        {
            key: 1,
            label: (
                <span onClick={() => setIsAvatarAndUsernameEditable(true)} key={'change-username'}>Редактировать профиль</span>
            )
        },
        {
            key: 2,
            label: (
                <span key={'change-password'}>Сменить пароль</span>
            )
        },
        {
            key: 3,
            label: (
                <span key={'change-email'}>Сменить email</span>
            )
        },
    ]}/>

    if (currentUser) {
        return (
            <Card
                style={{maxWidth: '600px', margin: '80px auto'}}
                actions={[
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                        <Button onClick={signOutHandler} disabled={isExitButtonDisabled} key={'logout'}>Выйти</Button>
                        <div>
                            {
                                isAvatarAndUsernameEditable &&
                                <>
                                    <Button onClick={updateProfileData} disabled={loading} style={{marginRight: '5px'}}>Сохранить</Button>
                                    <Button onClick={onReturnHandler} style={{marginRight: '5px'}}>Назад</Button>
                                </>
                            }
                            <Dropdown overlay={dropDownItems} trigger={['click']} placement="bottomLeft">
                                <Button>Действия</Button>
                            </Dropdown>
                        </div>
                    </div>
                ]}
            >
                <Meta
                    avatar={
                        <div style={{position: 'relative', overflow: 'hidden'}}>
                            <Avatar
                                size={60}
                                src={currentUser.photoURL || ''}
                                icon={<UserOutlined/>}
                            />
                            {
                                avatarPreview &&
                                <Avatar
                                    size={60}
                                    src={avatarPreview}
                                    style={{position: 'absolute', top: 0, left: 0}}
                                />
                            }
                            <CustomAvatarUpload
                                setIsEditable={setIsAvatarAndUsernameEditable}
                                isEditable={isAvatarAndUsernameEditable}
                                setAvatarPreview={setAvatarPreview}
                                avatarPreview={avatarPreview}
                            />
                        </div>
                    }
                    title={
                        <ul>
                            <li>
                                Email: {currentUser.email}
                            </li>
                            <li>
                                Имя пользователя:
                                {
                                    !isAvatarAndUsernameEditable ?
                                         ' ' + (currentUser.displayName || 'Не задано')
                                        : <Input
                                            value={userNamePreview}
                                            onChange={userNamePreviewInputHandler}
                                            style={{borderBottom: '1px solid #55C5FF'}}
                                            bordered={false}
                                        />
                                }
                            </li>
                        </ul>
                    }
                    description={`Аккаунт создан: ${accountCreationDate(+currentUser.metadata.createdAt)}`}
                />
            </Card>
        );
    }

    return (
        <AccessDenied reason={'unauthorized'}/>
    )
};

export default Profile;