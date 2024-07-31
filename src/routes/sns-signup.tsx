import { styled } from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import { LeftHalf, Name, RightHalf, RightWrapper, Title, Wrapper } from "../components/auth-components";
import { useState } from "react";
import axios from "axios";
import Birthday from "../components/birth-select";
import GenderSelect from "../components/gender-select";
import Address from "../components/address-select";
import { useLocation, useNavigate } from "react-router-dom";


interface TextProps {
    isError ?: boolean
    isNameError ?: boolean
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #BFBFBF;
    margin: 15px 0px;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

const Input = styled.input`
    padding: 15px;
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
        background-color: white;
        color: #222222;
        font-weight: bold;
        width: 100%;
        margin-top: 10px;
    }
`

const AlertText = styled.span.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isNameError',
})<TextProps>`
    font-size: 10px;
    color: ${({ isNameError }) => (isNameError) ? '#FF6666' : '#CBCBCB'};
    margin-bottom: 5px;
`

export default function SnsSignup(){
    const navigate = useNavigate();
    
    const location = useLocation();
    const email = location.state?.email || ''; // 이메일 정보 있으면 이메일, 없으면 공백
    // 위 같은 이메일 값 구글, 카카오에서 모두 불러오기
    const social_id = location.state?.sub ;

    const [nickname, setNickname] = useState("");
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [isNameError, setIsNameError] = useState(false);

    const [gender, setGender] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    const [address, setAddress] = useState("");

    
    const handleBlur = async (e : React.ChangeEvent<HTMLInputElement>) => {
        try{
            // 입력 값 추출
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/nickname`, {
                nickname: nickname,
            });
                        
            if(response.data){
                setNicknameMsg("이미 존재하는 닉네임입니다. ");
                setIsNameError(true);
            } else{
                setNicknameMsg("사용 가능한 닉네임입니다.")
                setIsNameError(false);
            }
            setNicknameMsg("이미 존재하는 닉네임입니다. ");
            setIsNameError(true);
            
            
        } catch(error) {
            console.error("닉네임 중복 확인 오류: ", error);
        }
    };

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value}} = e;
        
        if(name === "nickname"){
            setNickname(value);
        }
    };

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 닉네임 중복 오류 검사
        if (isNameError) {
            alert("이미 사용중인 닉네임입니다.");
            return;
        }


        try{
            // 회원가입 정보 백엔드 전달
            // 비밀번호 확인, required 필수는 프론트에서 처리
            // 백에서는 email과 nickname이 unique한지 확인
            /* 
            console.log({
                email,
                nickname,
                sex: gender,
                birthday: `${year}-${month}-${day}`, // 생년월일을 하나의 문자열로 조합
                home_area: address,
            });
            */

            navigate("/login");

            // 회원가입 정보 백엔드로 전달
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/join`, {
                email,
                nickname,
                sex: gender,
                birthday: `${year}-${month}-${day}`, // 생년월일을 하나의 문자열로 조합
                home_area: address,
                social_id,
                signup_method: '구글',
            });

            // 성공 알람 문구
            alert(`${nickname}님 회원가입이 완료되었습니다!!`)
            navigate("/login");

            // 백엔드에서 반환된 데이터를 콘솔에 출력 (개발 목적)
            console.log(response.data);

            } catch (error) {
                // 오류 발생 시 처리 로직
                console.error("회원가입 오류 : ", error);
            }
    };


    return(
        <Wrapper>
            <LeftHalf />
            <RightHalf>
                <RightWrapper>
                    <Title>SNS 회원정보입력</Title>
                    <Form onSubmit={onSubmit}>
                        <Input
                            name="email"
                            value={email}
                            type="email"
                            disabled
                            placeholder="이메일"
                            required
                        />
                        <Input
                            onChange={onChange}
                            name="nickname"
                            value={nickname}
                            type="name"
                            onBlur={handleBlur}
                            placeholder="닉네임 (최대 20자)"
                            maxLength={20}
                            required
                        />
                        <AlertText isError = {isNameError}>
                            {nicknameMsg}
                            {/* 다른 곳 클릭하면 중복 메시지 발생
                            */}
                        </AlertText>
                        <Divider/>
                        {/* 생년월일 입력 */}
                        <Name> 생년월일 </Name>
                        <Birthday year={year} month={month} day={day} setYear={setYear} setMonth={setMonth} setDay={setDay} />
                        {/* 성별 입력 */}
                        <Name> 성별 </Name>
                        <GenderSelect gender={gender} setGender={setGender} />
                        {/* 거주지 ( 시/ 도 ) */}
                        <Name> 거주지 </Name>
                        <Address address={address} setAddress={setAddress}/>
                        <Input 
                            type="submit"
                            value = "가입하기"
                        />
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
    )
}