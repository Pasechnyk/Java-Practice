export interface IProductCreate {
    name: string;
    image: File|undefined;
}

export interface IUploadedFile {
    originFileObj: File
}