import React, { useState, useEffect } from 'react';
import api from '../axios';

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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sugestões de Músicas</h2>
            <div className="grid grid-cols-1 gap-4">
                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="p-4 border rounded-lg shadow-md flex items-center bg-gray-100 justify-between"
                    >
                        <div>
                            <p className="font-bold text-orange-500">{song.name}</p>
                            <p className="text-gray-600">Views: {song.views}</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="text-green-500"
                                onClick={() => handleApproval(song.id, true)}
                            >
                                Aceitar
                            </button>
                            <button
                                className="text-red-500"
                                onClick={() => handleApproval(song.id, false)}
                            >
                                Rejeitar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    onClick={() => fetchSongs(page + 1)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Carregar Mais
                </button>
            )}
        </div>
    );
};

export default Suggestion;
