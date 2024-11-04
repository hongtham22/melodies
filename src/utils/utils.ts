import { Artist, DataAlbum } from '@/types/interfaces';

// Hàm lấy tên nghệ sĩ chính
export const getMainArtistName = (artists: Artist[]): string | undefined => {
    const mainArtist = artists.find(artist => artist?.ArtistSong.main === true);
    return mainArtist?.name;
};

export const getMainArtistId = (artists: Artist[]): string | undefined => {
    const mainArtist = artists.find(artist => artist?.ArtistSong.main === true);
    return mainArtist?.id;
};

// Hàm lấy poster của bài hát
export const getPoster = (album: DataAlbum): string => {
    if (album?.albumImages && album.albumImages.length > 0) {
        const foundImage = album.albumImages.find(img => img.size === 300)?.image;
        return foundImage || album.albumImages[0].image;
    } else {
        return "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da";
    }
};