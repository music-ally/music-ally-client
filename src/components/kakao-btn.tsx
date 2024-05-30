import styled from "styled-components";
const Button = styled.span`
    margin-top: 20px;
    background-color: #FDE600;
    color: black;
    font-weight: 600;
    font-size: 16px;
    padding: 15px 0px;
    border-radius: 20px;
    border: 0;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`

const Logo = styled.img`
    height: 25px;
`
interface KakaoButtonProps{
    onClick:() => void;
}
const KakaoButton: React.FC<KakaoButtonProps>=({onClick})=>{
    return(
        <Button onClick={onClick}>
            <Logo src="/kakao-logo.svg" />
            카카오톡으로 계속하기
        </Button>
    )

}

export default KakaoButton;