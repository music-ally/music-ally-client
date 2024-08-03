import { createGlobalStyle, styled } from "styled-components";
import bgimg from "../assets/bgimage_01.png"
import profileimg from "/profileimg.png"
import Address from "../components/address-edit";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import isPropValid from '@emotion/is-prop-valid';

const GlobalStyle = createGlobalStyle`
  font-family: 'Inter';
`;

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
    //height: 100vh;
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

const ProfileImageContainer = styled.div`
    position: relative;
    width: 185px;
    height: 185px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); // 검정색 배경, 투명도 25%
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CameraIcon = styled.img`
    color: white; // 아이콘 색상
    width: 32px;
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

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-self: self-end;
    gap: 15px;
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
        width: 100px;
    }

    &[type = "button"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        };
        background-color: #222222;
        color: #ffffff;
        border-radius: 30px;
        font-weight: bold;
        width: 25%;
        margin-top: 10px;
        width: 100px;
    }
`

interface TextProps {
    isNameError ?: boolean
}

const AlertText = styled.span.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && !['isNameError'].includes(prop)
})<TextProps>`
    font-size: 10px;
    color: ${({ isNameError }) => ( isNameError)  ? '#FF6666' : '#CBCBCB'};
    margin-bottom: 5px;
`

const ProfileBtn = styled.input``


const LoadingContainer = styled.div`
    /* 로딩 메시지 스타일 추가 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
`;


export default function EditProfile() {
    const navigate = useNavigate();
    //const [nickname, setNickname] = useState("");
    //const [password, setPassword] = useState("");
    //const [address, setAddress] = useState(""); // homearea_name


    // const [image, setImage] = useState<string>(profileimg);
    const [imgFile, setImgFile] = useState<string|ArrayBuffer|null>();    
    
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [method, setMethod] = useState(false);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        nickname: '',
        homearea_name: '',
        password: '',
    });

    const [loading, setLoading] = useState(true);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async() => {
            try {
                //const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
                const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mypage`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });
                const { nickname, signup_method, email, homearea_name} = response.data.data; // 데이터 구조에 맞게 수정
                setUserData({ email, nickname, homearea_name, password: '' }); // 초기화
                setMethod(signup_method);
                // console.log(email, nickname, method);                

                // 프로필 이미지 설정
                if(response.data.data.profile_image) {
                    setImgFile(response.data.data.profile_image);
                } else {
                    setImgFile(profileimg);
                }

                // 이메일 설정
                setEmail(email);

                // 로그인 경로 뮤지컬리일 때만 비번 입력 가능
                if(signup_method === "뮤지컬리"){
                    setMethod(false);
                } else {
                    setMethod(true);
                }
            } catch (error) {
                console.error("User 데이터 가져오기 오류 : ", error);
                // alert("사용자 데이터 가져오기 실패");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [profileimg]);

    // 폼 입력마다 상태 업데이트
    const [changedFields, setChangedFields] = useState<{ [key: string]: any }>({});
    // 변경된 필드 상태 업데이트
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // 이전 상태를 기반으로 업데이트
        setUserData(prev => {
            const updatedData = { ...prev, [name]: value };

            // 변경된 필드 추적
            setChangedFields(prevFields => ({
                ...prevFields,
                [name]: value,
            }));

            return updatedData;
        });
    };

    
    const imgRef = useRef<HTMLInputElement | null>(null);
    // 프로필 사진 업로드 버튼
    // 업로드 후 바로 미리보기. formdata 저장
    const onFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name } = e.target as HTMLInputElement;

        if(e.target.files && e.target.files[0]) {
            const file: File = e.target.files[0];
            // setFormData(prev => ({
            //     ...prev,
            //     [name]: file
            // }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
            reader.readAsDataURL(file);

        } else {
            setImgFile(profileimg);
            // setFormData(prev => ({
            //     ...prev,
            //     [name]: null
            // }));
        }

        setChangedFields(prevFields => ({
            ...prevFields,
            [name]: e.target.files ? e.target.files[0] : null,
        }));
    };

    const handleNicknameBlur = async (e : React.ChangeEvent<HTMLInputElement>) => {
        // 입력 값 추출
        const nickname = e.target.value;
        try{
            // 입력 값 추출
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/nickname`, {
                nickname: nickname,
            });
            const { success, message, data } = response.data;

            if(success) {
                if(data){
                    setNicknameMsg("이미 존재하는 닉네임입니다. ");
                    setIsNameError(true);
                } else{
                    setNicknameMsg("사용 가능한 닉네임입니다.")
                    setIsNameError(false);
                }
                
            } else {
                setNicknameMsg(message);
                setIsNameError(true);
            }
            
            
        } catch(error) {
            console.error("닉네임 중복 확인 오류: ", error);
        }
    };
    
    const handleCancel = () => {
        const confirmLeave = window.confirm("내 정보 수정 페이지를 나가시겠습니까?");
        if (confirmLeave) {
            navigate('/mypage'); // 예를 선택하면 마이페이지로 이동
        }
    };

    interface ChangedFields {
        [key: string]: string | undefined; // 각 필드는 string 또는 undefined일 수 있음
    }

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 닉네임 중복 오류 검사
        if (isNameError) {
            alert("이미 사용중인 닉네임입니다.");
            return;
        }

        // 비밀번호 조건 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

        if( userData.password && !passwordRegex.test(userData.password) ) {
            alert("비밀번호는 6~12자 사이이며, 영어와 숫자를 반드시 포함해야 합니다.");
            return;
        }

        // 비밀번호 일치 검사
        if( userData.password !== confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        const updateData: ChangedFields = {}; // 변경된 필드만 포함할 객체

        // 변경된 필드 추가
        for (const key in changedFields) {
            if (changedFields[key]) {
                updateData[key] = changedFields[key]; // 동적으로 추가
            }
        }

        console.log(updateData);
/* */
        try {
            const accessToken = localStorage.getItem("access_token");
            if (Object.keys(updateData).length > 0) {
                await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/myPage/profile/text`, updateData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("정보가 성공적으로 수정되었습니다.");
                navigate('/mypage');
            } else {
                alert("변경된 정보가 없습니다.");
            }
        } catch (error) {
            console.error("정보 수정 오류: ", error);
            alert("정보 수정에 실패했습니다.");
        }
    };

    const handleImageClick = () => {
        if (imgRef.current) {
          imgRef.current.click(); // 파일 입력 요소 클릭
        }
    };

    if (loading) {
        return (
            <LoadingContainer>
                Loading...
            </LoadingContainer>
        );
    }
    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <LeftHalf>
                <ProfileImageContainer onClick={handleImageClick}>
                    {imgFile && typeof imgFile === 'string' && <ProfileImage src={imgFile} />}
                    <Overlay>
                        <CameraIcon src="/camera.svg"/>
                    </Overlay>
                </ProfileImageContainer>
                
                <MyProfile>
                    <Nickname> {userData.nickname || '닉네임'} </Nickname>
                    <Email> {email || 'email@email.com'}</Email>
                    <ProfileBtn 
                        type="file"
                        id="profile"
                        onChange={onFileChange}
                        ref={imgRef}
                        accept="image/*"
                        name="profile_image"
                        style={{ display : "none" }}
                    />
                </MyProfile>
            </LeftHalf>
            <RightHalf>
                <RightWrapper>
                    <Title> 프로필 수정 </Title>
                    <Form onSubmit={onSubmit}>
                        <Name> 이메일 </Name>
                        <Input
                                name="email"
                                value={userData.email}
                                type="email"
                                disabled
                                placeholder="이메일"
                        />
                        <Name> 닉네임 </Name>
                        <Input
                                onChange={handleChange}
                                name="nickname"
                                value={userData.nickname}
                                type="text"
                                placeholder="닉네임"
                                onBlur={handleNicknameBlur}
                        />
                        <AlertText isNameError = {isNameError}>
                            {nicknameMsg}
                            {/* 다른 곳 클릭하면 중복 메시지 발생
                            */}
                        </AlertText>
                        <Name> 비밀번호 </Name>
                        <Input
                            onChange={handleChange}
                            name="password"
                            value={userData.password}
                            type="password"
                            placeholder="비밀번호 (6~12자리, 영어와 숫자를 포함하세요)"
                            disabled={method ? true : false}
                        />
                        <Name> 비밀번호 확인 </Name>
                        <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            value={confirmPassword}
                            type="password"
                            placeholder="비밀번호 확인"
                            disabled={method ? true : false}
                        />
                        <Name> 거주지 </Name>
                        <Address address={userData.homearea_name} onChange={(e) => handleChange(e)}/>
                        <Row>
                            <Input
                                type="button"
                                value="취소"
                                onClick={handleCancel}
                            />
                            <Input
                                type="submit"
                                value="저장"
                            />
                        </Row>
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
        </>
    );
}