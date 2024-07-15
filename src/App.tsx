import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout";
import Layout2 from "./components/layout2";
import Home from "./routes/home";
import MyPage from "./routes/myprofile";
import styled from "styled-components";
import Login from "./routes/login";
import SignUp from "./routes/sign-up";
import { createGlobalStyle } from "styled-components";
import SnsSignup from "./routes/sns-signup";
import EditProfile from "./routes/editprofile";

const router = createBrowserRouter([
  {
    path: "/",
    element : <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "mypage/edit",
        element: <EditProfile />,
      },
    ]
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/sns-signup",
    element: <SnsSignup />
  }

]);

const GlobalStyles = createGlobalStyle`
  * {
    margin-top: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: black;
    color: white;
  }
`;

const Wrapper = styled.div`
  
`

function App() {

  return (
    <Wrapper>
      {<GlobalStyles /> }
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App
