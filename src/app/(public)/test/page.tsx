// src/app/test/page.jsx
'use client'
import React, { useState } from 'react';

export default function LyricsSearchPage() {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        setLyrics('');

        if (!artist || !title) {
            setError('Please provide both artist and song name.');
            return;
        }

        try {
            const response = await fetch('/api/getLyrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ artist, title }),
            });            
            const data = await response.json();
            if (response.ok) {
                setLyrics(data.lyrics);
            } else {
                setError(data.error || 'An error occurred.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch lyrics.');
        }
    };

    return (
        <div style={{ paddingTop: '200px',padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Lyrics Search</h1>
            <div>
                <label>
                    Artist:
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Enter artist name"
                        style={{ display: 'block', width: '100%', marginBottom: '10px',color: '#003366' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Song Name:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter song name"
                        style={{ display: 'block', width: '100%', marginBottom: '10px',color: '#003366' }}
                    />
                </label>
            </div>
            <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
                Search
            </button>
            <div style={{ marginTop: '20px' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {lyrics && (
                    <div>
                        <h2>Lyrics:</h2>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
