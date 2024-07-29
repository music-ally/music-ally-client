import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import bgimg from "../assets/bgimage_01.png";
import SearchContainer from './searchcontainer.tsx';
import Notifi from "./notifiaction.tsx";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-size: cover;
    background-position: center;
    padding: 10px 20px;
`;

const Logo = styled.img`
    width: 164px;
    height: 63px;
`;

const Search = styled.div`
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

const NotificationContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const Modal = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <HeaderContainer>
                <Logo src="/header-Logo.png" alt="Logo" />
                <Search>
                    <SearchContainer/>
                </Search>
                <Nav>
                    <NavLink to="/">Main</NavLink>
                    <NavLink to="/review">Review</NavLink>
                    <NavLink to="/actor">Actor</NavLink>
                    <NavLink to="/mypage">My page</NavLink>
                    <NotificationContainer>
                        <FiBell size={24} color="#EED18F" onClick={toggleModal} />
                        {isModalOpen && (
                            <>
                                <Overlay onClick={toggleModal} />
                                <Modal>
                                    <Notifi />
                                </Modal>
                            </>
                        )}
                    </NotificationContainer>
                </Nav>
            </HeaderContainer>
        </>
    );
};

const FixedWidthWrapper = styled.div`
    max-width: 1280px;
    min-width: 1280px;
    margin: 0 auto;
    padding: 0;
    background-image: url(${bgimg});
`;

const Layout: React.FC = () => {
    return (
        <FixedWidthWrapper>
            <Header />
            <Outlet />
        </FixedWidthWrapper>
    );
};

export default Layout;
