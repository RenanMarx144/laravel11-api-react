import React, { useState, useEffect } from 'react';
import api from '../../axios';
import './suggestion.css';

interface Song {
    id: number;
    name: string;
    views: number;
}

const Suggestion: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchSongs = async (pageNumber: number, reset = false) => {
        try {
            const response = await api.get(`http://localhost/songs/pending?page=${pageNumber}`);

            if (response.data.data.length === 0) {
                setHasMore(false);
                return;
            }

            setSongs(prevSongs => reset ? response.data.data : [...prevSongs, ...response.data.data]);
            setPage(pageNumber);
        } catch (error) {
            console.error("Erro ao buscar sugestões de músicas", error);
        }
    };

    const handleApproval = async (id: number, approved: boolean) => {
        try {
            await api.post(`http://localhost/songs/approve`, { id, approved });
            setSongs(prevSongs => prevSongs.filter(song => song.id !== id));
        } catch (error) {
            console.error("Erro ao atualizar status da música", error);
        }
    };

    useEffect(() => {
        fetchSongs(1, true);
    }, []);
    return (
        <div className="container">
            <legend className="text-2xl font-bold mb-4">Sugestões de Músicas</legend>
            <div className='bloco'>
                <div className="grid grid-cols-1 gap-4">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="card"
                        >
                            <div className='grap-1'>
                                <p className="font-bold text-orange-500">{song.name}</p>
                                <p className="text-gray-600">Views: {song.views}</p>
                            </div>
                            <div className="grap-2">
                                <button
                                    className="text-acept-500 btns"
                                    onClick={() => handleApproval(song.id, true)}
                                >
                                    Aceitar
                                </button>
                                <button
                                    className="text-red-500 btns"
                                    onClick={() => handleApproval(song.id, false)}
                                >
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='more'>
            {hasMore && (
                <button
                    onClick={() => fetchSongs(page + 1)}
                    className="btn"
                >
                    Carregar Mais
                </button>
            )}
            </div>
           
        </div>
    );
};

export default Suggestion;
