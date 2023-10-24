import React, { useState, useEffect } from 'react';
import http from "../../network/axios";
import './index.css';

const LoginPage = (props) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [accessKey, setAccessKey] = useState('');

    useEffect(() => {
        getAccessKey();
        const interval = setInterval(() => {
            if (props.displayPage) {
                checkLoginState();
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [props.displayPage]);

    const getAccessKey = async () => {
        try {
            const accessKeyResponse = await http.get('/login/qr/key');
            const accessKeyData = accessKeyResponse.data.data;
            setAccessKey(accessKeyData);
            generateQRCode(accessKeyData.unikey);
        } catch (error) {
            console.error('获取accessKey时发生错误：', error);
        }
    };

    const generateQRCode = async (accessKey) => {
        try {
            const apiUrl = `/login/qr/create?key=${accessKey}&qrimg=1`;
            const response = await http.get(apiUrl);

            if (response.status === 200) {
                const qrCodeUrl = response.data.data.qrimg;
                setQrCodeUrl(qrCodeUrl);
                console.log('二维码生成成功！');
            } else {
                console.log('生成二维码失败');
            }
        } catch (error) {
            console.error('发生错误：', error);
        }
    };

    const checkLoginState = async () => {
        try {
            const apiUrl = `/login/qr/check?key=${accessKey.unikey}`;
            const response = await http.get(apiUrl);
            const code = response.data.code;
            switch (code) {
                case 801:
                    console.log('正在等待扫码');
                    break;

                case 802:
                    console.log('待确认');
                    break;

                case 800:
                    console.log('二维码已失效');
                    break;

                case 803:
                    console.log('授权登录成功');
                    props.handlePageClose(); // 设置登录状态为 false，隐藏登录页面
                    break;

                default:
                    console.log('未知状态');
            }

        } catch (error) {
            console.error('检查登录状态失败', error);
        }
    }

    return (
        <div className={`Login-Page ${props.displayPage ? '' : 'hiddenOpen'}`}>
            <div className={`Close-Page ${props.displayPage ? '' : 'hiddenClose'}`}>
                <div className="Close" onClick={props.handlePageClose}></div>
            </div>
            <div>
                <h3 className="Login-PageFont">扫码登录</h3>
                {qrCodeUrl ? (
                    <div className="QR-code">
                        <img src={qrCodeUrl} alt="QR Code" />
                    </div>
                ) : (
                    <div className="QR-code">Loading QR code...</div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
