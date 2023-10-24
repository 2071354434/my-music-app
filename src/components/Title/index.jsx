import React, {useContext} from 'react';
import "./index.css";
function Close() {
    window.electronAPI.close()
}
function Max() {
    window.electronAPI.maximize()
}
function Min() {
    window.electronAPI.minimize()
}

export default class Title extends React.Component {
    render() {
        return (
            <div className="Title-body">
                <div className="Title-drag"></div>
                <div className="Login" onClick={this.props.handlePageLogin}>登录</div>
                <div onClick={Min} className="box-min"></div>
                <div onClick={Max} className="box-max"></div>
                <div onClick={Close} className="box-close"></div>
            </div>
        );
    }
}
