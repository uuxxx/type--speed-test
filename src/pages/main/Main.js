import React, {createRef} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FileHandler from "../../FileHandler";
import CustomTextUpload from "../../components/upload/text/CustomTextUpload";
import {getAmountOfTextsInDB, uploadText} from "../../firebase";
import {Button, List, message, Modal} from "antd";
import {CloseOutlined, UploadOutlined} from "@ant-design/icons";
import './styles.scss'


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filesPreview: [],
            modal: {isOpened: false, title: '', text: ''},
            isLoading: false
        }
        this.addFileToPreview = this.addFileToPreview.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.deleteAllFilesFromPreview = this.deleteAllFilesFromPreview.bind(this)
        this.deleteFileFromPreview = this.deleteFileFromPreview.bind(this)
        this.uploadTexts = this.uploadTexts.bind(this)
    }

    componentDidMount() {
        const filesPreview = JSON.parse(localStorage.getItem('textFiles') || '[]')
        this.setState({filesPreview})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.filesPreview.length !== this.state.filesPreview.length) {
            localStorage.setItem('textFiles', JSON.stringify(this.state.filesPreview))
        }
    }

    async uploadTexts() {
        this.setState({isLoading: true})
        try {
            let counter = await getAmountOfTextsInDB()
            const requests = this.state.filesPreview.map(el => {
                counter++
                return uploadText(el, counter - 1)
            })
            await Promise.all(requests)
            this.setState({isLoading: false, filesPreview: []})
            message.success('Тексты были успешно загружены!')
        } catch (e) {
            message.error('Что-то пошло не так, повторите попытку!')
        }
    }

    addFileToPreview(file) {
        if (this.state.filesPreview.find(el => el.name === file.name)) {
            throw new Error('Файл с таким именем уже добален')
        }

        const fileReader = new FileHandler(file)
        fileReader.getStringFromBlob()
            .then(text => {
                this.setState({filesPreview: [...this.state.filesPreview, {text, name: file.name}]})
            })
    }

    deleteFileFromPreview(filename) {
        const filesPreview = this.state.filesPreview.filter(el => el.name !== filename)
        this.setState({filesPreview})
    }

    deleteAllFilesFromPreview() {
        if (window.confirm('Вы уверены, что хотите удалить все тексты?')) {
            this.setState({filesPreview: []})
        }
    }

    handleModalOpen(title) {
        const {text} = this.state.filesPreview.find(el => el.name === title)
        this.setState({modal: {isOpened: true, title, text}})
    }

    handleModalClose() {
        this.setState({modal: {...this.state.modal, isOpened: false}})
    }

    render() {
        return (
            <>
                <Modal
                    open={this.state.modal.isOpened}
                    title={this.state.modal.title}
                    onCancel={this.handleModalClose}
                    footer={[
                        <Button onClick={this.handleModalClose} key={1} type={'primary'}>Закрыть</Button>
                    ]}
                >
                    <p>{this.state.modal.text}</p>
                </Modal>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '30px'
                }}>
                    <CustomTextUpload
                        addFileToPreview={this.addFileToPreview}
                    />
                    {this.state.filesPreview.length > 0 &&
                        <>
                            <Button
                                size={'large'}
                                shape={'round'}
                                icon={<CloseOutlined/>}
                                onClick={this.deleteAllFilesFromPreview}
                            >
                                Удалить все
                            </Button>

                            <Button
                                type={'primary'}
                                shape={'round'}
                                icon={<UploadOutlined/>}
                                loading={this.state.isLoading}
                                size={'large'}
                                onClick={this.uploadTexts}
                            >
                                Загрузить на сервер
                            </Button>
                        </>
                    }
                </div>

                <List
                    style={{maxWidth: '800px', margin: '0 auto'}}
                    size="small"
                    bordered={this.state.filesPreview.length > 0}
                >
                    <TransitionGroup>
                        {
                            this.state.filesPreview.map((item, index) => {
                                const ref = createRef()
                                return (
                                    <CSSTransition
                                        key={item.name}
                                        nodeRef={ref}
                                        timeout={500}
                                        classNames={'fileItem'}
                                    >
                                        <List.Item ref={ref}>
                                            <div>
                                                {`${index + 1}) ${item.name}`}
                                            </div>
                                            <div>
                                                <Button style={{marginRight: '5px'}}
                                                        onClick={() => this.handleModalOpen(item.name)}>Посмотреть
                                                    текст</Button>
                                                <Button
                                                    onClick={() => this.deleteFileFromPreview(item.name)}>&times;</Button>
                                            </div>
                                        </List.Item>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </List>

                {
                    !this.state.filesPreview.length &&
                    <h2 className={'noTextYetHeader'}>Вы пока не добавили текстов...</h2>
                }
            </>
        )
    }
}


