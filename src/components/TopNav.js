import styled from 'styled-components';
import ProfileDropdown from './ProfileDropdown';
import { useUser } from '../context/UserContext';

const TopNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 280px; // sidebar width
  background: linear-gradient(180deg, #1a1a2e 0%, #2a2a3c 100%);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(138, 77, 255, 0.1);
  z-index: 50;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    left: 0;
  }
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b3b3b3;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #8a4dff;
  }
`;

const Navigation = () => {
  const { user } = useUser();

  return (
    <TopNav>
      <div></div>
      <NavControls>
        <ProfileDropdown />
      </NavControls>
    </TopNav>
  );
};

export default Navigation;