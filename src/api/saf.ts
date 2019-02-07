import { SafRequest } from "../redux/restReducers/saf/safRequest";
import { post } from './api';

export function postSaf(request: SafRequest): Promise<{}> {
    const uri = "https://saf-q1.nais.preprod.local/graphql";
    return post(uri, request);
}
