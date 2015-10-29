export interface IIssue {
    url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    //user: IUser;
    labels: ILabel[];
    state: string;
    created_at: string;
}

export interface ILabel {
    url: string;
    name: string;
    color: string;
}
