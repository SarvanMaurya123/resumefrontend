import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../ContaxtApi/useAuth';

const Header = () => {
    const { isLoggedIn, logout, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsProfileMenuOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <header className="header">
            <nav className="navbar">

                <div
                    className="menu-icon"
                    onClick={toggleMenu}
                    role="button"
                    aria-label="Toggle menu"
                    tabIndex={0}
                    onKeyPress={toggleMenu}
                >
                    <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
                    <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
                    <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
                </div>
                {!isLoggedIn && (
                    <h3 className='absolute top-5 md:left-10  right-10 md:block font-bold text-2xl'>Resume</h3>
                )}
                {isLoggedIn && (
                    <h3 className='absolute top-3 md:left-10 hidden right-10 md:block font-bold 
                text-2xl'>Resume</h3>
                )}
                <ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>

                    {isLoggedIn && (
                        <>
                            <div className='allres'>
                                <li className='border-none'>
                                    <NavLink to="/" onClick={() => setIsMenuOpen(false)} className='border-none' style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'white',
                                        textDecoration: 'none'
                                    })}>Home</NavLink>
                                </li>
                            </div>
                        </>
                    )}

                    {isLoggedIn ? (
                        <>

                            <li>
                                <NavLink to="/DashbordAdmin" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'white',
                                    textDecoration: 'none'
                                })}>DashboardAdmin</NavLink>
                            </li>


                            <li>
                                <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'white',
                                    textDecoration: 'none'
                                })}>Gallery</NavLink>
                            </li>
                            <li>
                                <NavLink to="/About" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'white',
                                    textDecoration: 'none'
                                })}>About</NavLink>
                            </li>
                            <div className=''>
                                <li className='border-0'>
                                    <NavLink to="/resume_data1" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'white',
                                        textDecoration: 'none'
                                    })}>Build Resume</NavLink>
                                </li>
                            </div>

                            <li className='border-0'>
                                <NavLink to="/getresume1" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'white',
                                    textDecoration: 'none'
                                })}>See Resume</NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <div className='md:flex md:justify-end gap-6 md:w-full pointer-events-auto items-center'>
                                <li className='block border-2 md:border-0 px-10 py-2 mx-3 mb-2 text-center  md:px-0 md:mx-0 md:mb-0'>
                                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="login"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'blue' : 'black',
                                            textDecoration: 'none'
                                        })}>Login</NavLink>
                                </li>
                                <li className='block sm:border-2  md:border-0 px-10 py-2 mx-3 mb-2 text-center md:px-0 md:mx-0 md:mb-0'>
                                    <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="register" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black',
                                        textDecoration: 'none'
                                    })}>Register</NavLink>
                                </li>
                            </div>
                        </>
                    )}
                </ul>
                {isLoggedIn && (
                    <div className="profile-icon" onClick={toggleProfileMenu}>
                        <div className='usernamechar'>
                            {/* <p >{user.email}</p> */}
                            <h2>{user.name.charAt(0)}</h2>
                        </div>
                        {isProfileMenuOpen && (
                            <div className="profile-menu">
                                <NavLink to="/History" className='border-2 min-w-9 mb-1 pb-3 pt-3 text-center text-white bg-slate-500 rounded-lg'>Your History</NavLink>
                                <button className='border-2 pl-10 pr-10 min-w-9 mb-1 text-white pb-3 pt-3 bg-slate-500 rounded-lg uppercase' onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
            <div>


                <NavLink to="/reset-password/reset/set" className="hidden"></NavLink>
            </div>
        </header>
    );
};

export default Header;
