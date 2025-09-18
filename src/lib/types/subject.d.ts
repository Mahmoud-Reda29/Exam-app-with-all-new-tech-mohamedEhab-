export type Subject = {
    _id: string;
    name: string;
    icon: string;
};

export interface SubjectsResponse {
    message: string;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    subjects: Subject[];
}