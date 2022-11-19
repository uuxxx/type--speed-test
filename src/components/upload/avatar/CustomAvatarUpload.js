import React, {useRef, useEffect} from 'react';
import FileHandler from "../../../FileHandler";
import {message} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import st from './customAvatarUpload.module.scss'

const CustomAvatarUpload = ({isEditable, setAvatarPreview}) => {

    const inputRef = useRef(null)

    useEffect(() => {
        const input = inputRef.current
        const boundHandleInput = handleInput.bind(this)
        input.addEventListener('change', boundHandleInput)
        return () => input.removeEventListener('change', boundHandleInput)
    }, [])

    function handleInput() {
        const file = inputRef.current.files[0]
        if (!file) return
        beforeSetPreviewAvatar(file)
    }


    function beforeSetPreviewAvatar(file) {

        const avatar = new FileHandler(file)

        if (!avatar.isSizeLessThan2MB()) {
            message.error('Размер файла не должен превышать 2MB!')
            return
        }

        if (!avatar.isTypeEqualToPngOrJpg()) {
            message.error('Тип файла должен быть JPG или PNG!')
            return
        }

        avatar.getBase64URL()
            .then(url => setAvatarPreview(url))
            .catch(() => message.error('Ошибка во время чтения файла!'))
    }


    return (
        <>
            <label htmlFor={'avatar'} className={`${st.inputAvatarLabel} ${isEditable ? st.editable : ''}`}>
                <PlusCircleOutlined className={st.addIcon}/>
            </label>
            <input ref={inputRef} type={'file'} id={'avatar'} className={st.inputFile} multiple={false}/>
        </>
    );

};

export default CustomAvatarUpload;