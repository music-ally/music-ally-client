import React, { useEffect } from "react";
import KakaoButton from "../components/kakao-btn";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

declare global {
    interface Window {
        Kakao: any;
    }
}

const Kakao: React.FC = () => {
    const navigate = useNavigate();

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
    }, []);

    const checkEmailExistence = async (email: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/email`, { email });
            return response.data.exists;
        } catch (error) {
            console.error('Email check error:', error);
            return false;
        }
    };

    const loginKakao = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                redirectUri : 'http://192.168.219.168:3000/home',
                success: async (authObj: any) => {
                    console.log('로그인 성공', authObj);
                    localStorage.setItem('access_token', authObj.access_token);
                    localStorage.setItem('kakaoRefreshToken', authObj.refresh_token);
                    if (window.Kakao && window.Kakao.API) {
                        window.Kakao.API.request({
                            url: '/v2/user/me',
                            success: async (res: any) => {
                                const email = res.kakao_account.email;
                                const sub = res.id;

                                if (email) {
                                    const emailExists = await checkEmailExistence(email);
                                    if (emailExists) {
                                        alert('이미 가입된 이메일입니다. 이메일 로그인을 시도해주세요.');
                                        navigate('/login');
                                    } else {
                                        navigate('/sns-signup', { state: { email, social_id: sub } });
                                    }
                                } else {
                                }
                            },
                            fail: (err: any) => {
                                console.error('사용자 정보 요청 실패', err);
                            }
                        });
                    }
                },
                fail: (err: any) => {
                    console.error('로그인 실패', err);
                },
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
