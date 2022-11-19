import React, {useEffect, useRef} from 'react';
import {DownloadOutlined} from '@ant-design/icons'
import {Button, message} from "antd";
import st from './customTextUpload.module.scss'
import FileHandler from "../../../FileHandler";

const CustomTextUpload = ({addFileToPreview, styles}) => {
    const labelRef = useRef(null)
    const inputRef = useRef(null)


    useEffect(() => {
        const input = inputRef.current
        const boundInputHandleInput = handleInput.bind(this)
        input.addEventListener('change', boundInputHandleInput)

        return () => input.removeEventListener('change', boundInputHandleInput)
    }, [])


    function handleInput() {
        const file = inputRef.current.files[0]
        if(!file) return
        beforeSetFilesPreview(file)
    }


    function beforeSetFilesPreview(file) {
        const textFile = new FileHandler(file)
        try {
            if (!textFile.isTypeEqualToTxt()) {
                throw new Error('Тип файла должен быть .txt!')
            }

            if (!textFile.isSizeLessThan2MB()) {
                throw new Error('Размер файла должен быть меньше 2 MB!')
            }
            addFileToPreview(file)
        } catch (e) {
            message.error(e.message)
        }
    }

    function handleOnLabelClick () {
        inputRef.current.value = null
        labelRef.current.click()
    }

    return (
        <div style={styles}>
            <label ref={labelRef} htmlFor={'text'}>
                <Button
                    onClick={handleOnLabelClick}
                    type={'primary'}
                    shape={'round'}
                    icon={<DownloadOutlined/>}
                    size={'large'}
                >
                    Загрузить текст
                </Button>
            </label>
            <input ref={inputRef} className={st.label} type="file" id={'text'}/>
        </div>
    );
};

export default CustomTextUpload;