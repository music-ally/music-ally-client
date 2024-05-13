import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./routes/home";
import MyProfile from "./routes/myprofile";
import styled from "styled-components";
import Login from "./routes/login";
import SignUp from "./routes/sign-up";
import { createGlobalStyle } from "styled-components";

const router = createBrowserRouter([
  {
    path: "/",
    element : <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
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

]);

const GlobalStyles = createGlobalStyle`
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
      {/* <GlobalStyles /> */}
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App
