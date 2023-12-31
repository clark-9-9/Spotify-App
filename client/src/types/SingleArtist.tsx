export interface RootSingleArtist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: any;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}
