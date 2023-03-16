export interface Moment {

    id?: number
    title: string;
    description: string;
    image: File;
    created_at?: string
    uptaded_at?: string
    comments?: [{ username: string, text: string }]


}