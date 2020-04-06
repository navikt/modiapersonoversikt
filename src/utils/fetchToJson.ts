export function fetchToJson<T>(input: RequestInfo, request?: RequestInit): Promise<T> {
    return fetch(input, request).then(response => {
        if (!response.ok) {
            throw new Error('Not ok');
        }
        if (response.redirected) {
            throw new Error('Redirected');
        }
        return response.json();
    });
}
