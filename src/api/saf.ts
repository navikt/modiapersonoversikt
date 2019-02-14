import { SafRequest } from '../redux/restReducers/saf/safRequest';
import { postWithXsrfConfig } from './api';

export function postSaf(request: SafRequest): Promise<{}> {
    const uri = 'https://app-q6.adeo.no/saf/graphql';
    return postWithXsrfConfig(uri, request);
}
