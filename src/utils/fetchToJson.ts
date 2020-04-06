export interface OkStatus<T> {
    data: T;
}
export interface ErrorStatus {
    status: number;
    message: string;
}
export type FetchResponse<T> = OkStatus<T> | ErrorStatus;

export function fetchToJson<T>(input: RequestInfo, request?: RequestInit): Promise<FetchResponse<T>> {
    return fetch(input, request)
        .then(response => {
            if (!response.ok) {
                return { status: response.status, message: response.statusText };
            }
            if (response.redirected) {
                return { status: 302, message: 'Redirect detected' };
            }
            return response.json();
        })
        .then(json => ({ data: json }))
        .catch(error => ({ status: 500, message: error }));
}
