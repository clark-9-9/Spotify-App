export interface RootArtists {
    artists: Artists;
}

export interface Artists {
    items: Item[];
    next: string;
    total: number;
    cursors: Cursors;
    limit: number;
    href: string;
}

export interface Item {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
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

export interface Cursors {
    after: string;
}
