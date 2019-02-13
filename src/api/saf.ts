import { SafRequest } from '../redux/restReducers/saf/safRequest';
import { post } from './api';

export function postSaf(request: SafRequest): Promise<{}> {
    const uri = 'https://app-q6.adeo.no/saf/graphql';
    return post(uri, request);
}
