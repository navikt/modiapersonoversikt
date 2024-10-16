interface OkStatus<T> {
    status: number;
    data: T;
}
interface ErrorStatus {
    status: number;
    message: string;
}
export type FetchResponse<T> = OkStatus<T> | ErrorStatus;
export function hasData<T>(data: FetchResponse<T>): data is OkStatus<T> {
    return [200, 201, 202, 203].includes(data.status);
}

export function hasError<T>(data: FetchResponse<T>): data is ErrorStatus {
    return !hasData(data);
}

async function getErrorMessage(response: Response): Promise<string> {
    try {
        const content = (await response.json()) as { message?: string };
        if (content.message && typeof content.message === 'string' && content.message.length > 0) {
            return content.message;
        }
        return response.statusText;
    } catch {
        return response.statusText;
    }
}

export async function fetchToJson<T>(input: RequestInfo, request?: RequestInit): Promise<FetchResponse<T>> {
    try {
        const response = await fetch(input, request);
        if (!response.ok) {
            const errorMessage = await getErrorMessage(response);
            return { status: response.status, message: errorMessage };
        }
        if (response.redirected) {
            return { status: 302, message: 'Redirect detected' };
        }
        const json = (await response.json()) as T;
        return { status: response.status, data: json };
    } catch (e: unknown) {
        return { status: 500, message: e instanceof Error ? e.toString() : 'Unknown error' };
    }
}
