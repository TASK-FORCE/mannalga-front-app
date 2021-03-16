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
    location: string,
    color?: string,
    time?: number,
    open: boolean,
}

export const SNACKBAR_LOCATION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};
