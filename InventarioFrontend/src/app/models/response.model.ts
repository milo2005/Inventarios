export class SimpleResponse {
    success: boolean;
}

export class PostResponse extends SimpleResponse {
    id: number;
}
