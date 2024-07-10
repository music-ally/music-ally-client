import { styled } from "styled-components";
import bgimg from "../assets/bgimage_01.png"
import profileimg from "../assets/profileimg.png"
import Address from "../components/address-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

const LeftHalf = styled.div`
    flex: 1; /* 왼쪽 절반 */
    width: 50%;
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    @media (max-width: 1200px) {
        flex: 0 0 600px; /* 최소 너비 600px */
    }
`;

const RightHalf = styled.div`
    flex: 1; /* 오른쪽 절반 */
    width: 50%;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    // justify-content: center; /* 수평가운데 */
    align-items: center; /* 수직가운데 */

    @media (max-width: 1200px) {
        flex: 0 0 600px; /* 최소 너비 600px */
    }
`;

const RightWrapper = styled.div`
    width: 400px;
`

const MyProfile = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    // text-align: center;
    margin-top: 20px;
    margin-left: 30px;
`

const ProfileImage = styled.img`
    width: 185px;
    height: 185px;
    border-radius: 50%;
    object-fit: cover;
`;

const Nickname = styled.h3`
    font-size: 30px;
    margin: 10px 0;
`

const Email = styled.h3`
    font-size: 16px;
    color: #BABABA;
`

const Title = styled.h1`
    color: #ECECEC;
    font-weight: 400;
    margin-top: 50px;
    margin-bottom: 40px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Name = styled.div`
    font-size: 18px;
    color: #D1D1D1;
    margin-bottom: 5px;
`

const Input = styled.input`
    padding: 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    width: 100%;
    font-size: 16px;
    background-color: black;
    color: #BFBFBF;
    box-sizing: border-box; // padding 조절하여도 너비 그대로
    border: 1px solid #ffffff; /* 테두리 색상과 두께 조절 */

    &[type = "submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        };
        background-color: #ffffff;
        color: #222222;
        border-radius: 30px;
        font-weight: bold;
        width: 25%;
        margin-top: 10px;
        // padding: 10px;
        align-self: self-end;
    }
`
interface FormData {
    email: string,
    nickname: string,
    password: string,
    confirmPassword: string,
    address: string,
    profileImage: File | null,
}

export default function EditProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
       email: '',
       nickname: '',
       password: '',
       confirmPassword: '',
       address: '',
       profileImage: null, // db에 존재하면 해당 이미지, 없으면 기본이미지
    });

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mypage`);
                setFormData({
                    email: response.data.email,
                    nickname: response.data.nickname,
                    address: response.data.address,
                    password: '',
                    confirmPassword: '',
                    profileImage: null,
                });
            } catch (error) {
                console.error("User 데이터 가져오기 오류 : ", error);
                // alert("사용자 데이터 가져오기 실패");
            }
        };
        fetchData();
    });

    // 폼 입력마다 상태 업데이트
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const onFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setFormData({ ...formData, profileImage: e.target.files[0] as File});
        }
    };

    /*
    // async 처리하여 닉네임 중복 여부 확인
    const handleBlur = (e) => {

    }
    */

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 닉네임 중복 오류 검사
        // 로직 추가하고 추가하기 !!! ***

        // 비밀번호 조건 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

        if( !passwordRegex.test(formData.password) ) {
            alert("비밀번호는 8~12자 사이이며, 영어와 숫자를 반드시 포함해야 합니다.");
            return;
        }

        // 비밀번호 일치 검사
        if( formData.password !== formData.confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // FormData 생성하고 데이터 객체에 추가
        const formDataSend = new FormData();
        formDataSend.append('nickname', formData.nickname);
        formDataSend.append('address', formData.address);
        if (formData.password) {
            formDataSend.append('password', formData.password);
        }
        if (formData.profileImage) {
            formDataSend.append('profileImage', formData.profileImage);
        }

        // 서버 데이터 전송 trycatch, axios.patch.
        
    }

    return (
        <Wrapper>
            <LeftHalf>
                {/* <ProfileImage src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : profileimg} alt="Profile" />
                */}
                <ProfileImage src={profileimg} />
                <MyProfile>
                    <Nickname> {formData.nickname || '닉네임'} </Nickname>
                    <Email> {formData.email || 'email@email.com'}</Email>
                </MyProfile>
            </LeftHalf>
            <RightHalf>
                <RightWrapper>
                    <Title> 프로필 수정 </Title>
                    <Form onSubmit={onSubmit}>
                        <Name> 이메일 </Name>
                        <Input
                                name="email"
                                value={formData.email}
                                type="email"
                                disabled
                                placeholder="이메일"
                        />
                        <Name> 닉네임 </Name>
                        <Input
                                name="nickname"
                                value={formData.nickname}
                                type="emnicknameail"
                                placeholder="닉네임"
                        />
                        <Name> 비밀번호 </Name>
                        <Input
                            // onChange={onChange}
                            name="password"
                            // value={password}
                            type="password"
                            placeholder="비밀번호 (8~12자리, 영어와 숫자를 포함하세요)"
                        />
                        <Name> 비밀번호 확인 </Name>
                        <Input
                            // onChange={onChange}
                            name="confirmPassword"
                            // value={confirmPassword}
                            type="password"
                            placeholder="비밀번호 확인"
                        />
                        <Name> 거주지 </Name>
                        {/* <Address address={address} setAddress={setAddress}/> */}
                        <Input
                            type="submit"
                        />
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
    );
}