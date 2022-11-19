import React, {useContext} from 'react';
import {Button} from "antd";
import {DashboardOutlined, RiseOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {GameContext} from "../../contexts/gameContext";
import st from './gamecomplete.module.scss'


const GameComplete = () => {
    const {signsPerMinute, accuracy, reset} = useContext(GameContext)
    return (
        <div className={st.container}>
            <div className={st.certificateBlock}>
                <div className={st.stat}>
                    <DashboardOutlined className={st.icon}/>
                    <div>
                        <div>Скорость</div>
                        <div>{signsPerMinute} <span>зн./мин</span></div>
                    </div>
                </div>
                <div className={st.stat}>
                    <RiseOutlined className={st.icon}/>
                    <div>
                        <div>Точность</div>
                        <div>{accuracy}<span>%</span></div>
                    </div>
                </div>
            </div>
            <div className={st.descriptionBlock}>
                <h2>Отбей пятишечку! Сертификат почти у тебя.</h2>
                <p>Чтобы получить сертификат печати — просто зарегистрируйся. А еще ты откроешь доступ ко всем урокам, которые помогут тебе улучшить скорость печати.</p>
                <Button type={'primary'}>Получить сертификат</Button>
                <Link to={'/game'}>
                    <Button
                        onClick={reset}
                        type={'default'}
                        style={{marginLeft: '10px'}}
                    >Попробовать еще</Button>
                </Link>
            </div>
        </div>
    );
};

export default GameComplete;