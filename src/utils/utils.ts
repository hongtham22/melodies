import { Artist, DataAlbum } from '@/types/interfaces';
import ImageSong from '@/assets/img/placeholderSong.jpg'
import ImagePlaylist from '@/assets/img/placeholderPlaylist.png'
import { StaticImageData } from 'next/image';

// Hàm lấy nghệ sĩ chính
export const getMainArtistInfo = (artists: Artist[]): { name?: string; id?: string } | undefined => {
    const mainArtist = artists.find(artist => artist?.ArtistSong.main === true);
    if (!mainArtist) return undefined;
    return {
        name: mainArtist.name,
        id: mainArtist.id,
    };
};

export const getSubArtistsInfo = (artists: Artist[]): { name?: string; id?: string }[] => {
    return artists
        .filter(artist => artist?.ArtistSong.main !== true)
        .map(artist => ({ name: artist.name, id: artist.id }))
        .filter(subArtist => subArtist.name && subArtist.id);
};

export const getAllArtistsInfo = (artists: Artist[]): { name?: string; id?: string }[] => {
    const mainArtist = getMainArtistInfo(artists);
    const subArtists = getSubArtistsInfo(artists);

    return mainArtist ? [mainArtist, ...subArtists] : subArtists;
};

export const getPosterSong = (albums: Array<DataAlbum>, albumType?: string) => {
    if (albums?.length) {
        const filteredAlbums = albumType
            ? albums.filter(album => album.albumType === albumType)
            : albums;

        for (const album of filteredAlbums) {
            const foundImage = album.albumImages.find(img => img.size === 300)?.image;
            if (foundImage) {
                return { title: album.title, image: foundImage };
            }
        }
        const fallbackAlbum = filteredAlbums[0];
        return {
            title: fallbackAlbum?.title || "Unknown Title",
            image: fallbackAlbum?.albumImages[0]?.image || ImageSong,
        };
    }
    return { title: "Unknown Title", image: ImageSong };
};



// Hàm lấy poster của album
export const getPoster = (album: DataAlbum): string | StaticImageData => {
    if (album?.albumImages && album.albumImages.length > 0) {
        const foundImage = album.albumImages.find(img => img.size === 300)?.image;
        return foundImage || album.albumImages[0].image;
    } else {
        return ImagePlaylist;
    }
};

//Format time
export const formatTime = (duration: number) => {
    const min = Math.floor(duration / 1000 / 60);
    const sec = Math.floor((duration / 1000) % 60);

    const formattedSec = sec < 10 ? "0" + sec : sec;

    return min + ":" + formattedSec;
};