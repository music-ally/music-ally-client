import React, { useEffect } from "react";
import axios from "axios";
import KakaoButton from "../components/kakao-btn";
import { useNavigate } from 'react-router-dom';

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

        if (window.Kakao && !window.Kakao.isInitialized()) {
            const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_API;
            window.Kakao.init(javascriptKey);
        }
    }, []);

    const loginKakao = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                redirectUri: 'http://192.168.219.168:3000/home',
                success: (authObj: any) => {
                    console.log('로그인 성공', authObj);
                    localStorage.setItem('access_token', authObj.access_token);
                    localStorage.setItem("refresh_token", authObj.refresh_token);
                    getUserInfo(authObj.access_token);
                },
                fail: (err: any) => {
                    console.error('로그인 실패', err);
                }
            });
        } else {
            console.error('Kakao 객체가 초기화되지 않았습니다.');
        }
    };

    const getUserInfo = async (accessToken: string) => {
        if (window.Kakao && window.Kakao.API) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: async (res: any) => {
                    console.log(res);
                    const { email, id: social_id } = res.kakao_account;

                    const emailCheckResult = await checkEmailExistence(email);
                    if (emailCheckResult) {
                        const { is_duplicate, signup_method } = emailCheckResult;

                        if (is_duplicate) {
                            if (signup_method === '카카오') {
                                await fetchData(email, social_id);
                            } else {
                                alert("이미 가입된 이메일입니다. 이메일 로그인으로 시도해주세요.");
                            }
                        } else {
                            navigate("/sns-signup", { state: { email, social_id } });
                        }
                    } else {
                        console.error("이메일 확인 중 오류 발생");
                    }
                },
                fail: (err: any) => {
                    console.error(err);
                }
            });
        } else {
            console.error('Kakao 객체가 초기화되지 않았습니다.');
        }
    };

    const checkEmailExistence = async (email: string): Promise<{ is_duplicate: boolean; signup_method: string } | undefined> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/email`, {
                email: email,
            });

            const { success, message, data } = response.data;

            if (success) {
                return {
                    is_duplicate: data.is_duplicate,
                    signup_method: data.signup_method,
                };
            } else {
                return undefined;
            }
        } catch (error) {
            console.error('Email 존재 여부 확인 오류: ', error);
            throw error;
        }
    };

    const fetchData = async (email: string, social_id: number) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login/social`, {
                email: email,
                social_id: social_id,
            });

            const { success, message, data } = response.data;
            if (success) {
                const { access_token, refresh_token } = data;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
            } else {
                console.error(message);
            }
            console.log('Protected data: ', data);
            navigate("/home"); 
        } catch (error) {
            console.error('Error fetching protected data: ', error);
        }
    };

    return (
        <div>
            <KakaoButton onClick={loginKakao} />
        </div>
    );
};

export default Kakao;
