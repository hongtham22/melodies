//album
export interface AlbumImage {
    image: string;
    size: number;
}

export interface DataAlbum {
    albumId: string;
    title: string;
    albumImages: Array<AlbumImage>;
    releaseDate: string;
    totalDuration: number;
    songNumber: number;
    albumType: string;
    songs: Array<DataSong>
    artistMain: Artist;
    albumAnother: Array<DataAlbum>
}

//artist
export interface ArtistSong {
    main: boolean;
}

export interface Artist {
    id: string;
    name: string;
    ArtistSong: ArtistSong;
    avatar: string;
    followersCount: number;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
}

//song
export interface DataSong {
    id: string;
    title: string;
    duration: number;
    lyric: string;
    filePathAudio: string;
    privacy: boolean;
    uploadUserId: string | null;
    releaseDate: string;
    viewCount: number | null;
    createdAt: string;
    album: DataAlbum;
    artists: Array<Artist>;
    playCount: string;
}