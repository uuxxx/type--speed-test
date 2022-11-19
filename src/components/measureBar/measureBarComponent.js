import React, {useContext} from 'react';
import {GameContext} from "../../contexts/gameContext";
import {DashboardOutlined, ReloadOutlined, RiseOutlined} from "@ant-design/icons";
import st from './measureBar.module.scss'


const MeasureBarComponent = () => {
    const {signsPerMinute, accuracy} = useContext(GameContext)
    return (
        <ul className={st.container}>
            <li>
                <div className={st.itemHeader}>
                    <DashboardOutlined />
                    <div>Скорость</div>
                </div>

                <span className={st.value}>
                    {signsPerMinute}<span className={st.unitOfMeasurement}>зн./мин</span>
                </span>
            </li>

            <li>
                <div className={st.itemHeader}>
                    <RiseOutlined/>
                    <div>Точность</div>
                </div>

                <span className={st.value}>
                    {accuracy}<span className={st.unitOfMeasurement}>%</span>
                </span>
            </li>


            <li>
                <div className={st.itemHeader}>
                    <ReloadOutlined />
                    <div>Заново</div>
                </div>
            </li>
        </ul>
    );
};

export default MeasureBarComponent;