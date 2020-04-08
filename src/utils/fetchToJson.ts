export interface OkStatus<T> {
    status: number;
    data: T;
}
export interface ErrorStatus {
    status: number;
    message: string;
}
export type FetchResponse<T> = OkStatus<T> | ErrorStatus;
export function hasData<T>(data: FetchResponse<T>): data is OkStatus<T> {
    return data.status >= 200 && data.status < 300;
}

export function hasError<T>(data: FetchResponse<T>): data is ErrorStatus {
    return !hasData(data);
}

export async function fetchToJson<T>(input: RequestInfo, request?: RequestInit): Promise<FetchResponse<T>> {
    try {
        const response = await fetch(input, request);
        if (!response.ok) {
            return { status: response.status, message: response.statusText };
        }
        if (response.redirected) {
            return { status: 302, message: 'Redirect detected' };
        }
        const json = await response.json();
        return { status: response.status, data: json };
    } catch (e) {
        return { status: 500, message: e };
    }
}
