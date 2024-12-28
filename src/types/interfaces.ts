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
    totalSong: number;
    totalFollow: number;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
    popSong: Array<DataSong>
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
    album: Array<DataAlbum>;
    artists: Array<Artist>;
    playCount: string;
}

//user
export interface User {
    id: string;
    username: string;
    image: string | null;
    accountType: string;
    name: string;
}

//comment
export interface Comment {
    id: string;
    commentParentId: string | null;
    userId: string;
    content: string;
    createdAt: string;
    user: User;
    hasChild: number;
    myComment: boolean;
}

//playlist

export interface PlaylistImage {
    image: string;
    size: number;
}

export interface DataPlaylist {
    username: string;
    playlistId: string;
    title: string;
    name: string;
    image: string;
    description: string;
    totalTime: number;
    totalSong: number;
    createdAt: string;
    songsOfPlaylist: DataSong[];
}

// socket
export interface DataCurrentSong {
    song: DataSong,
    isPlaying: boolean,
    currentTime: number,
}

// genre

export interface GenreData {
    genreId: string;
    name: string;
  }




export interface Message {
    user: UserRoom,
    message: string,
    userSend: string
}


// data room
// export interface CurrentSong {

// }


// --------------------------socket--------------------------

export interface UserRoom {
    id: string;
    username: string;
    image: string | null;
    accountType: string;
    name: string;
    host: boolean   
}

export interface DataRoom {
    host: string,
    members: "",
    max: number,
    currentSong: DataSong,
    waitingList: DataSong[],
    proposalList: DataSong[],
    isPlaying: boolean,
    timestamp: number,
    now: number,
}

export interface DataMembersRoom {
    user: UserRoom,
    members: UserRoom[]
}

export interface CurrentSong {
    song: DataSong,
    isPlaying: boolean,
    currentTime: number,
}

export interface Room {
    id: string,
    members: UserRoom[],
    currentSong: CurrentSong,
    waitingList: DataSong[],
    proposalList: DataSong[],
}

export interface DataCurrentRoom {
    roomData: Room,
    isHot: boolean,
}
