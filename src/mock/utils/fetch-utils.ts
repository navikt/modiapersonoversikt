import {
    type DefaultBodyType,
    delay,
    HttpResponse,
    type HttpResponseResolver,
    type PathParams,
    type StrictRequest
} from 'msw';

export function withDelayedResponse<R extends DefaultBodyType, T extends DefaultBodyType = { fnr: string }>(
    delayTime: number,
    statusCode: (request: StrictRequest<T>, parsedBody?: T) => Promise<number>,
    genererMockData:
        | ((request: StrictRequest<T>, params: PathParams, parsedBody?: T) => R)
        | ((request: StrictRequest<T>, params: PathParams, parsedBody?: T) => Promise<R>)
): HttpResponseResolver<PathParams, T> {
    return async ({ request, params }) => {
        const parsedBody = request.method === 'POST' ? await request.clone().json() : undefined;
        const status = await statusCode(request, parsedBody);

        // Don't delay in test
        if (import.meta.env.MODE !== 'test' && !import.meta.env.VITE_E2E) await delay(delayTime);

        const data = await Promise.resolve(genererMockData(request, params, parsedBody));
        return HttpResponse.json(data, { status });
    };
}

export function verify<T extends DefaultBodyType = { fnr: string }>(
    isInvalid: (req: StrictRequest<T>, params: PathParams) => string | undefined,
    handler: HttpResponseResolver<PathParams, T>
): HttpResponseResolver<PathParams, T> {
    return ({ request, params, ...args }) => {
        const invalid = isInvalid(request, params);
        if (invalid) {
            return HttpResponse.text(invalid, { status: 400 });
        }
        return handler({ request, params, ...args });
    };
}

export function mockGeneratorMedFodselsnummer(
    fn: (fodselsnummer: string) => object | object[] | undefined | string | null
) {
    return (_request: StrictRequest<DefaultBodyType>, pathParams: PathParams<'fodselsnummer'>) =>
        fn(pathParams.fodselsnummer as string);
}

export function mockGeneratorMedFodselsnummerV2(
    fn: (fodselsnummer: string) => object | object[] | undefined | string | null
) {
    return async (req: StrictRequest<{ fnr: string }>, _pathParams: PathParams, parsedBody?: { fnr: string }) => {
        const body = parsedBody ?? (await req.json());

        return fn(body.fnr);
    };
}

export function mockGeneratorMedEnhetId(fn: (enhetId: string) => object | object[] | undefined) {
    return (_req: StrictRequest<DefaultBodyType>, pathParams: PathParams<'enhetId'>) =>
        fn(pathParams.enhetId as string);
}
