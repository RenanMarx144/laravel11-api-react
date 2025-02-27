import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Use useAuth para acessar register
import { initializeCSRF } from "../../api";
import './styles.css';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth(); // Usando o register do AuthContext

    useEffect(() => {
        const initializeCSRFToken = async () => {
            try {
                await initializeCSRF();
            } catch (err) {
                console.error("Erro ao inicializar CSRF token:", err);
                setError('Falha na conexão com o servidor.');
            }
        };

        initializeCSRFToken();
    }, []);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            setIsLoading(false);
            return;
        }
    
        try {
            // Alterando o campo de confirmação de senha para 'password_confirmation'
            await register({ name, email, password, password_confirmation: confirmPassword });
            navigate('/'); // Redireciona para a página inicial após o registro
        } catch (err: any) {
            console.error("Erro no registro:", err);
    
            if (err.response) {
                const { status } = err.response;
                if (status === 422) setError('Credenciais inválidas.');
                else if (status === 419) setError('Sessão expirada. Atualize a página.');
                else setError('Erro ao registrar. Tente novamente.');
            } else {
                setError('Erro inesperado. Verifique sua conexão.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="container">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form className="form2" onSubmit={handleRegister}>
                    
                    <div>
                        <label className="block text-gray-700 ">Nome</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Insira seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-gray-700 ">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Insira seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-gray-700">Senha</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Insira sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-gray-700">Confirmar Senha</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn mt-2 mb-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando...' : 'Registrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
