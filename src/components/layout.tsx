import React from "react";
import { Link } from 'react-router-dom';
import { FiSearch, FiBell } from 'react-icons/fi';
import styled from 'styled-components';
import NaverMap from "../api/naver-map";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url('/header-background.png'); // 배경 이미지 경로
    background-size: cover;
    background-position: center;
    padding: 10px 20px;

`;

const Logo = styled.img`
    width: 164px;
    height: 63px;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 329px;
    height: 32.779px;
    padding: 6.617px 13.235px 6.617px 9.926px;
    align-items: center;
    gap: 9.926px;
    flex-shrink: 0;
    border-radius: 6.617px;
    border: 0.827px solid #E0E0E0;
    background: rgba(255, 255, 255, 0.90);
`;

const SearchInput = styled.input`
    overflow: hidden;
    color: #828282;
    text-overflow: ellipsis;
    font-family: Inter;
    font-size: 14.568px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.852px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    border-radius: 6.617px;
    border : none;
    flex: 1 0 0;
    background-color: transparent;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
    color: #EED18F;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.40);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 134.698%; /* 26.94px */
    letter-spacing: 0.6px;
`;

const NavLink = styled(Link)`
  font-size: 18px;
  color: #d4af37;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
    return (
      <HeaderContainer>
        <Logo src="/header-Logo.png" alt="Logo" />
        <SearchContainer>
          <FiSearch size={20} color="#251611"/>
          <SearchInput type="text" placeholder="<뮤지컬>이 궁금해!" />
        </SearchContainer>
        <Nav>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/review">Review</NavLink>
          <NavLink to="/actor">Actor</NavLink>
          <NavLink to="/mypage">My page</NavLink>
          <FiBell size={24} color="#EED18F" />
        </Nav>
      </HeaderContainer>
    );
  };
  
  export default Header;