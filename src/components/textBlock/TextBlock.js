import React, {useEffect, useContext, useState, useMemo} from 'react'
import {useNavigate} from "react-router-dom";
import {GameContext} from "../../contexts/gameContext";
import MeasureBar from "../measureBar/MeasureBar";
import st from './textBlock.module.scss'


export const TextBlock = ({textAsString}) => {

    textAsString = textAsString.substring(1, textAsString.length - 1)

    const initialTextValue = useMemo(renderText, [textAsString])
    const [text, setText] = useState(initialTextValue)

    let currentCharacterIndex = 0
    let mistakes = 0


    const navigate = useNavigate()
    const {setContextValue} = useContext(GameContext)


    useEffect(() => {
        document.addEventListener('keypress', onKeyPressHandler)

        return () => document.removeEventListener('keypress', onKeyPressHandler)
    }, [])


     function renderText() {
        const res = []
        for (let i = 0; i < textAsString.length; i++) {
            const characterObj = {
                label: textAsString[i],
                status: i < 1 ? 'current' : 'black'
            }
            res.push(characterObj)
        }
        return res
    }


    function typingSpeedAndAccuracy(delay) {
        let seconds = 0
        const id = setInterval(() => {
            if (currentCharacterIndex === text.length) {
                clearInterval(id)
                return
            }
            seconds++
            if (seconds % delay === 0) {
                const signsPerMinute = MeasureBar.signsPerMinute(currentCharacterIndex + 1, seconds)
                const accuracy = MeasureBar.accuracy(currentCharacterIndex + 1, mistakes)
                setContextValue(prev => ({...prev, signsPerMinute, accuracy}))
            }
        }, 1000)
    }


    function onKeyPressHandler(e) {
        e.preventDefault()
        const textArray = [...text]
        if (e.key === text[currentCharacterIndex].label) {
            if (currentCharacterIndex === 0) typingSpeedAndAccuracy(2)
            if (currentCharacterIndex === text.length - 1) {
                textArray[currentCharacterIndex].status = 'passed'
                setText(textArray)
                navigate('/game-complete')
                currentCharacterIndex++
                return
            }
            currentCharacterIndex++
            textArray[currentCharacterIndex - 1].status = 'passed'
            textArray[currentCharacterIndex].status = 'current'
        } else {
            textArray[currentCharacterIndex].status = 'warn'
            mistakes++
        }

        setText(textArray)
    }


    function defineClassName(status) {
        const classes = {
            'passed': st.wpassed,
            'current': st.wgreen,
            'warn': st.wred
        }

        return classes[status]
    }

    const renderTextJSX = () => text.map(({label, status}, index) => (
        <span className={defineClassName(status)} key={index}>{label}</span>
    ))

    return (
        <div className={st.container}>
            {renderTextJSX()}
        </div>
    )
}
