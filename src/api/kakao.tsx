import React, { useEffect } from "react";
import KakaoButton from "../components/kakao-btn";

declare global{
    interface Window{
        Kakao: any;
    }
}

const Kakao: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.onload = () => {
            const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_API;
            if (window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init(javascriptKey);
            }
        };
        document.head.appendChild(script);
        
        if (window.Kakao && !window.Kakao.isInitialized()) {
            const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_API;
            window.Kakao.init(javascriptKey);
        }
    }, []);
  
    const loginKakao = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                redirectUri: 'http://localhost:3000',
                success: (authObj: any) => {
                    console.log('로그인 성공', authObj);
                    getUserInfo();
                },
                fail: (err: any) => {
                    console.error('로그인 실패', err);
                }
            });
        } else {
            console.error('Kakao 객체가 초기화되지 않았습니다.');
        }
    };

    const getUserInfo = () => {
        if (window.Kakao && window.Kakao.API) {
            window.Kakao.API.request({
                url: 'v2/user/me',
                success: (res: any) => {
                    console.log(res);
                },
                fail: (err: any) => {
                    console.error(err);
                }
            });
        } else {
            console.error('Kakao 객체가 초기화되지 않았습니다.');
        }
    };

    return (
        <div>
            <KakaoButton onClick={loginKakao} />
        </div>
    );      
};

export default Kakao;
