import styled from "styled-components"
import bgimg from "../assets/bgimage_00.png"

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

const LeftHalf = styled.div`
    flex: 1; /* 왼쪽 절반 */
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100vh;
`;

const RightHalf = styled.div`
    flex: 1; /* 오른쪽 절반 */
    background-color: black;
    color: white;
    display: flex;
    // justify-content: center; /* 수평가운데 */
    // align-items: center; /* 수직가운데 */
`;

export default function Login() {
    return (
        <Wrapper>
            <LeftHalf />
            <RightHalf>
                <h1>Login</h1>
            </RightHalf>
        </Wrapper>
    )
}