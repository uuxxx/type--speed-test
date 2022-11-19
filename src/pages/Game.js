import React from 'react'
import {TextBlock} from "../components/textBlock/TextBlock";
import MeasureBarComponent from "../components/measureBar/measureBarComponent";
import {downloadRandomText, getAmountOfTextsInDB} from "../firebase";
import {LoadingOutlined} from "@ant-design/icons";


export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            isLoading: true
        }
    }

    async componentDidMount() {
        const text = await downloadRandomText()
        this.setState({text, isLoading: false})
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: '64px',
                bottom: 0,
                right: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }}>
                {
                    this.state.isLoading
                        ?
                        <LoadingOutlined style={{fontSize: '50px', color: 'white'}}/>
                        :
                        <>
                            <TextBlock textAsString={this.state.text}/>
                            <MeasureBarComponent/>
                        </>
                }
            </div>
        )
    }
}