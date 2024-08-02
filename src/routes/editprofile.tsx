import { createGlobalStyle, styled } from "styled-components";
import bgimg from "../assets/bgimage_01.png"
import profileimg from "/profileimg.png"
import Address from "../components/address-edit";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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

const ProfileBtn = styled.input`
    margin-top: 10px;

`


interface FormData {
    email: string,
    nickname: string,
    password: string,
    homearea_name: string,
    profile_image: File | null,
}

export default function EditProfile() {
    const navigate = useNavigate();
    // const [image, setImage] = useState<string>(profileimg);
    const [imgFile, setImgFile] = useState<string|ArrayBuffer|null>();
    const [formData, setFormData] = useState<FormData>({
       email: '',
       nickname: '',
       password: '',
       homearea_name: '',
       profile_image: null, // db에 존재하면 해당 이미지, 없으면 기본이미지
    });
    
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    // 데이터 가져오기
    useEffect(() => {
        setImgFile(profileimg); // 근데 이렇게 하면 이미 프사가 있는 사람은 어떻게 나타나는지?
        const fetchData = async() => {
            try {
                const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
                //const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mypage`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });
                setFormData({
                    email: response.data.data.email,
                    nickname: response.data.data.nickname,
                    homearea_name: response.data.data.homearea_name,
                    password: '',
                    profile_image: response.data.profile_image,
                });

                // 프로필 이미지 설정
                if(response.data.data && response.data.data.profile_image) {
                    setImgFile(response.data.data.profile_image);
                } else {
                    setImgFile(profileimg);
                }
            } catch (error) {
                console.error("User 데이터 가져오기 오류 : ", error);
                // alert("사용자 데이터 가져오기 실패");
            }
        };
        fetchData();
    }, [profileimg]);

    // 폼 입력마다 상태 업데이트
    const [changedFields, setChangedFields] = useState([]);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        
        // 이전 상태를 유지하면서 변경된 요소만 업데이트
        setFormData(prev => {
            const updatedData = { ...prev, [name]: value };
    
            setChangedFields(prevFields => ({
                ...prevFields,
                [name]: value,
            }));
            return updatedData;
        });
    };
    
    
    const onChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLSelectElement;
        setFormData(prev => {
            const updatedData = { ...prev, [name]: value };
    
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
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));

            // 미리보기 이미지 설정? 파일 업로드 시 화면에 같이 보이기
            if (imgRef.current && imgRef.current.files && imgRef.current.files.length > 0){
                //const file = imgRef.current.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImgFile(reader.result);
                };
            }

        } else {
            setImgFile(profileimg);
            setFormData(prev => ({
                ...prev,
                [name]: null
            }));
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

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 닉네임 중복 오류 검사
        if (isNameError) {
            alert("이미 사용중인 닉네임입니다.");
            return;
        }

        // 비밀번호 조건 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

        if( formData.password && !passwordRegex.test(formData.password) ) {
            alert("비밀번호는 6~12자 사이이며, 영어와 숫자를 반드시 포함해야 합니다.");
            return;
        }

        // 비밀번호 일치 검사
        if( formData.password !== confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // FormData 생성하고 데이터 객체에 추가
        const formDataSend = new FormData();
        
        // 변경된 필드만 추가
        for (const key in changedFields) {
            if (changedFields[key]) {
                formDataSend.append(key, changedFields[key]);
            }
        }

        // 최종적으로 전송할 formDataSend 로그
        console.log(formDataSend); // JSON 형식으로 출력

        // FormData 내용 로그
        for (const [key, value] of formDataSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        // 서버 데이터 전송 trycatch, axios.patch.
        // 제출 성공하면 mypage로 navigate
        /* */
        try {
            const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
            //const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기
            
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/mypage`, formDataSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
            alert("정보가 성공적으로 수정되었습니다.");
            navigate('/mypage'); // 수정 후 페이지 이동
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

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <LeftHalf>
                {/* <ProfileImage src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : profileimg} alt="Profile" />
                */}
                <ProfileImageContainer onClick={handleImageClick}>
                    {imgFile && typeof imgFile === 'string' && <ProfileImage src={imgFile} />}
                    <Overlay>
                        <CameraIcon src="/camera.svg"/>
                    </Overlay>
                </ProfileImageContainer>
                
                <MyProfile>
                    <Nickname> {formData.nickname || '닉네임'} </Nickname>
                    <Email> {formData.email || 'email@email.com'}</Email>
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
                                value={formData.email}
                                type="email"
                                disabled
                                placeholder="이메일"
                        />
                        <Name> 닉네임 </Name>
                        <Input
                                onChange={onChange}
                                name="nickname"
                                value={formData.nickname}
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
                            onChange={onChange}
                            name="password"
                            value={formData.password}
                            type="password"
                            placeholder="비밀번호 (6~12자리, 영어와 숫자를 포함하세요)"
                        />
                        <Name> 비밀번호 확인 </Name>
                        <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            value={confirmPassword}
                            type="password"
                            placeholder="비밀번호 확인"
                        />
                        <Name> 거주지 </Name>
                        <Address address={formData.homearea_name} onChange={(e) => onChange1(e)}/>
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