export interface Student {
    name: string;
    socket_id: string;
}

export interface Slide {
    content: string;
}

type Status = 'ok' | 'failed';

export interface Solution {
    code: string;
    result: Status;
}
