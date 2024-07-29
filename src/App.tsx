import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import UserProfile from "./routes/userprofile";
import ActorPage from "./components/actor";
import Review from "./routes/musicalreview";
import WriteReview from "./routes/writereview"; 
import Search from "./routes/searchpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "actor",
        element: <ActorPage />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "write-review",
        element: <WriteReview />
      },
      {
        path: "search",
        element: <Search />
      }
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
      {
        path: "mypage/edit",
        element: <EditProfile />,
      },
      {
        path: "profile/:userId",
        element: <UserProfile />
      }
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

  body {
    background-color: black;
    color: white;
  }
`;

const Wrapper = styled.div``;

function App() {
  return (
    <Wrapper>
      {<GlobalStyles />}
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
