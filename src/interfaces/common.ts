export interface SuperInventionResponse {
    data: any,
    message: string,
}

export interface UploadImageResponse {
    absolutePath: string,
    fileName: string,
    filePath: string,
}

export interface SnackBarOption {
    message: string,
    location: SnackBarLocation,
    color?: string,
    time?: number,
    open: boolean,
}

export interface ServerPageResponse<T> {
    content: T;
    last: boolean;
    pageable: ServerPageable;
    size: number;
    totalPages: number;
}

export interface ServerPageable {
    pageNumber: number;
}

export interface Page {
    currentPage: number;
    nextPage: number;
    size: number;
    isLastPage: boolean;
}

export enum SnackBarLocation {
    TOP = 'top',
    BOTTOM = 'bottom',
}

export interface Region {
    seq: number;
    level: number;
    name: string
    superRegionRoot: string;
}

export interface RegionWithPriority {
    priority: number;
    region: Region;
}

export interface InterestGroup {
    seq: number;
    name: string;
}

export interface Interest {
    seq: number;
    name: string;
    interestGroup: InterestGroup;
}

export interface InterestWithPriority {
    priority: number;
    interest: Interest;
}

export interface RegionWriteRequest {
    seq: number;
    priority: number;
}

export interface InterestWriteRequest {
    seq: number;
    priority: number;
}


export interface Writer {
    writerUserSeq: number;
    writerClubUserSeq: number;
    name: string;
    imgUrl: string;
    role: string[];
}

export interface PageRequest {
    size: number;
    page: number;
}

export interface Comment {
    childCommentCnt: number;
    commentSeq: number;
    content: string;
    depth: number;
    imgUrl: string;
    isWrittenByMe: boolean;
    onlyDirectChildCnt: boolean;
    registerTime: string;
    writeClubUserSeq: number;
    writerSeq: number;
    writer: string;
}