import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Layout2 from './components/layout2';
import Home from './routes/home';
import MyPage from './routes/myprofile';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './routes/login';
import SignUp from './routes/sign-up';
import SnsSignup from './routes/sns-signup';
import EditProfile from './routes/editprofile';
import UserProfile from './routes/userprofile';
import ActorPage from './components/actor';
import Review from './routes/musicalreview';
import WriteReview from './routes/writereview';
import Search from './routes/searchpage';
import DetailSearchAct from './routes/detailsearch-actor';
import DetailSearchMus from './routes/detailsearch-musical';
import SeeReview from './routes/seereview';
import { AuthProvider } from './components/AuthContext'; 
import ProtectedRoute from './ProtectedRoute';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color: white;
  }
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'home', element: <Home /> },
      { path: 'actor/musical', element: <ActorPage /> },
      { path: 'review', element: <Review /> },
      { path: 'write-review', element: <WriteReview /> },
      { path: 'search', element: <Search /> },
      { path: 'search/musical', element: <DetailSearchMus /> },
      { path: 'search/actor', element: <DetailSearchAct /> },
      { path: 'see-review/:reviewId', element: <SeeReview /> }
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout2 />
      </ProtectedRoute>
    ),
    children: [
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/edit', element: <EditProfile /> },
      { path: 'profile/:userId', element: <UserProfile /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/sns-signup', element: <SnsSignup /> }
]);

const Wrapper = styled.div``;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <AuthProvider> 
        <RouterProvider router={router} />
      </AuthProvider>
    </Wrapper>
  );
}

export default App;
