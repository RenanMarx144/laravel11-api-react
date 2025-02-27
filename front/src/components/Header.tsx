import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import LogoutButton from './LogoutButton';
import { useAuth } from '../contexts/AuthContext';
import tiaoCarreiroImg from '../assets/images/tiao-carreiro-pardinho.png';


const Header: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <header>
            <div className='gb-mask'>
                <div className='navLink'>
                    <div className='nuew'>
                        <Link to="/">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                Home
                            </button>
                        </Link>


                        {isAuthenticated ? (
                            <>
                                {user?.role === "admin" && (
                                    <Link to="/suggestions">
                                        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
                                            Sugestões
                                        </button>
                                    </Link>
                                )}
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                        Entrar
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                                        Registrar
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className='head'>
                <img src={tiaoCarreiroImg} alt="Tião Carreiro & Pardinho" />

                    <h2>
                        Top 5 Músicas Mais Tocadas
                    </h2>
                    <p>Tião Carreiro & Pardinho</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
