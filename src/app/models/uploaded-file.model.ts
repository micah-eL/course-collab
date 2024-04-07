export interface UploadedFile {
    id: string;
    fileName: string;
    courseId: string;
    uploadedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}