import React, {useContext} from 'react';
import {GlobalContext} from "../../contexts/globalContext";
import {Alert} from "antd";
import {CSSTransition} from "react-transition-group";
import st from './alert.module.scss'

const CustomAlert = () => {

    const {alert} = useContext(GlobalContext)

    return (
        <CSSTransition
            in={!!alert}
            timeout={3000}
            classNames={{
                enterActive: st.show,
                exitActive: st.hide
            }}
        >
            <Alert
                type={alert?.type}
                message={alert?.message}
                className={st.alert}
            />
        </CSSTransition>
    );
};

export default CustomAlert;