export type Role = 'admin' | 'student';

export interface Student {
    name: string;
    socket_id: string;
}

export interface Lesson {
    title: string;
    slides: Slide[];
}

export interface Slide {
    content: string;
}

type Status = 'ok' | 'failed';

export interface Solution {
    code: string;
    result: Status;
}
