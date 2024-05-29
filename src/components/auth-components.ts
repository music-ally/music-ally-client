import { styled } from "styled-components";
import bgimg from "../assets/bgimage_00.png"

export const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

export const LeftHalf = styled.div`
    flex: 1; /* 왼쪽 절반 */
    width: 50%;
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100vh;

    @media (max-width: 1200px) {
        flex: 0 0 600px; /* 최소 너비 600px */
    }
`;

export const RightHalf = styled.div`
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

export const RightWrapper = styled.div`
    width: 500px;
`

export const Switcher = styled.span`
    margin-top: 40px;
    margin-right: 40px;
    a {
        color: #BFBFBF
    };
    // 오른쪽 끝에 위치
    align-self: self-end;
`
export const Title = styled.h1`
    color: #BFBFBF;
    font-weight: 400;
    margin-top: 50px;
    margin-bottom: 40px;
`

export const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #BFBFBF;
    margin: 45px 0px;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

export const DividerText = styled.span`
    display: inline-block; /* 블록 요소로 설정하여 가로 크기를 설정할 수 있게 함 */
    margin: 35px 10px; /* 좌우 마진 추가 */
    color: #BFBFBF;
`

export const Row = styled.div`
    display: flex;
    margin: 10px 0;
`

export const Row1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

export const Name = styled.span`
    color: #BFBFBF;
    font-size: 15px;
`

export const ShowPwButton = styled.button`
  background-color: transparent;
  border: none;
  color: #BFBFBF;
  cursor: pointer;
`;

export const Input = styled.input`
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
        background-color: #222222;
        color: #BFBFBF;
        border-radius: 20px;
        width: 50%;
        align-self: self-end;
        padding:15px 0px;
    }
`