// // src/app/api/get-lyric-song/getLyrics.js
// import { getLyrics } from 'genius-lyrics-api';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }

//     const { artist, title } = req.body;
//     if (!artist || !title) {
//         return res.status(400).json({ error: 'Artist and title are required' });
//     }

//     const options = {
//         apiKey: process.env.GENIUS_API_KEY,
//         artist,
//         title,
//         optimizeQuery: true,
//     };

//     try {
//         const lyrics = await getLyrics(options);
//         if (lyrics) {
//             res.status(200).json({ lyrics });
//         } else {
//             res.status(404).json({ error: 'Lyrics not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching lyrics:', error);
//         res.status(500).json({ error: 'Failed to fetch lyrics' });
//     }
// }