import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../axios';
import './styles.css';

interface Song {
    id: number;
    name: string;
    views: number;
    link: string;
}

const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro
    const [songs, setSongs] = useState<Song[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchSongs(1, true);
    }, []);

    const fetchSongs = async (pageNumber: number, reset: boolean = false) => {
        try {
            const response = await axios.get(`http://localhost/songs?page=${pageNumber}`);

            if (response.data.data.length === 0) {
                setHasMore(false);
                return;
            }

            setSongs(prevSongs => reset ? response.data.data : [...prevSongs, ...response.data.data]);
            setPage(pageNumber);
        } catch (error) {
            console.error("Erro ao buscar músicas", error);
        }
    };

    const handleSubmit = async () => {
        setErrorMessage(''); // Limpa a mensagem de erro ao iniciar

        if (!isValidYouTubeUrl(url)) {
            setErrorMessage('URL inválida! Insira um link válido do YouTube.');
            return;
        }

        setLoading(true);

        try {
            const videoId = extractYouTubeVideoId(url);
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics`
            );

            if (response.data.items.length === 0) {
                setErrorMessage('Vídeo não encontrado!');
                return;
            }

            const video = response.data.items[0];
            const name = video.snippet.title;
            const views = parseInt(video.statistics.viewCount);

            await api.post('http://localhost/songs', {
                name,
                views,
                link: url,
            });

            setUrl('');
            setErrorMessage('Sugestão enviada com sucesso!');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'Erro ao verificar o vídeo.');
            } else {
                console.error('Erro ao buscar vídeo:', error);
                setErrorMessage('Erro ao verificar o vídeo.');
            }
        } finally {
            setLoading(false);
        }
    };

    const isValidYouTubeUrl = (url: string) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return regex.test(url);
    };

    const extractYouTubeVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className='container'>

            {isAuthenticated && (
                <div className='form'>
                    <label htmlFor="songInput">Sugira uma nova música:</label>
                    <div className='sept'>
                        <input
                            id="songInput"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Cole o link do YouTube aqui..."
                        />
                        <button onClick={handleSubmit} disabled={loading} className='btn'>
                            {loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>

                    {/* Exibe mensagem de erro/sucesso abaixo do input */}
                    {errorMessage && (
                        <span style={{ color: errorMessage.includes('sucesso') ? 'green' : 'red', display: 'block', marginTop: '5px' }}>
                            {errorMessage}
                        </span>
                    )}
                </div>
            )}

            <div className="bloco">
                <legend className="text-2xl font-bold mb-4">Ranking Atual</legend>
                <div className="grid">
                    {songs.map((song, index) => (
                        <b  onClick={() => window.open(song.link, "_blank")} 
                            key={song.id}
                            className={`card ${index < 5 ? 'highlight' : 'no-highlight'}`}
                        >
                            <span className={`text-xl font-bold ${index < 5 ? 'text-orange-500 fz-32' : 'fz-16'}`}>{index + 1}</span>
                            <div className="ml-4">
                                <p className="font-bold">{song.name}</p>
                                <p className={` text-gray-600  ${index < 5 ? `fz-14` : `fz-11`}`}>Views: {song.views}</p>
                            </div>
                        </b>
                    ))}
                </div>
                <div className='more'>
                {hasMore && (
                    <button
                        onClick={() => fetchSongs(page + 1)}
                        className="btn">
                        Carregar Mais
                    </button>
                )}
                </div>
            </div>
        </div>
    );
};

export default Home;
