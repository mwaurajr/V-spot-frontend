import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropdown';
import './Navigation.css';
import { useEffect } from 'react';

function Navigation({showLoginModal,setShowLoginModal}) {
  const sessionUser = useSelector(state => state.session.user);
  const { listingId } = useParams();
  const [loginMessage, setLoginMessage] = useState(false);
  let messageTimeout;

  useEffect(() => {
    if(loginMessage) {
      messageTimeout = setTimeout(() => {
        setLoginMessage(false);
        clearTimeout(messageTimeout);
      }, 3000)
    }
  },[loginMessage])

  // useEffect(() => {
  //   if(sessionUser) {
  //     setLoginMessage(true);
  //   }
  // },[sessionUser])

  let regex = /\/listings\/[0-9]+/i;
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
        <LoginDropDown setShowLoginModal={setShowLoginModal}
        showLoginModal={showLoginModal}
        setLoginMessage={setLoginMessage}
        />
    );
  }

  return (
    <div className='nav-bar-wrapper'>
      <div className='nav-bar' style={regex.test(window.location.pathname) ? {width:'87vw', maxWidth:'1120px'} : {} }>
        <NavLink exact to="/">
          <div className='home-box'>
            <div className='logo-text'>VENUSPOT</div> 
          </div>
        </NavLink>
        {sessionLinks}
      </div>
      {(loginMessage && sessionUser) && (
        <div className='alert-login'>
          <span>Welcome back {`${sessionUser.firstName}`}!</span> 
        </div>
      )}
    </div>
  );
}

export default Navigation;
