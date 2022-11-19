import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница не найдена"
            extra={<Button type="primary"><Link to={'/'}>Вернуться домой</Link></Button>}
        />
    );
};

export default NotFound;