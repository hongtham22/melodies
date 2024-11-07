// src/app/api/getLyrics/route.js
import { NextResponse } from 'next/server';
import { getLyrics } from 'genius-lyrics-api';

export async function POST(request) {
    const { artist, title } = await request.json();

    if (!artist || !title) {
        return NextResponse.json({ error: 'Artist and title are required' }, { status: 400 });
    }

    const options = {
        apiKey: process.env.GENIUS_API_KEY,
        artist,
        title,
        optimizeQuery: true,
    };

    try {
        const lyrics = await getLyrics(options);
        if (lyrics) {
            return NextResponse.json({ lyrics }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Lyrics not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        return NextResponse.json({ error: 'Failed to fetch lyrics' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
