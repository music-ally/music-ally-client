import { styled } from "styled-components";
// import { Wrapper } from "../components/auth-components";
import Banner from "../components/banner";

const Parent = styled.div`
    height: 100vh;  // 부모 요소가 화면 전체 높이를 차지하도록 설정
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 1280px;
    min-width: 1280px;
`

export default function Home() {
    return (
        <Parent>
            <Wrapper>
                <Banner />
            </Wrapper>
        </Parent>
    );
}