import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { useAppState } from '../../utils/customHooks';
import { PostResource } from '../utils/postResource';

export function usePostResource<Request, Response>(
    selector: (resources: RestEndepunkter) => PostResource<Request, Response>
): PostResource<Request, Response> {
    const resource = useAppState(state => selector(state.restResources));
    return resource;
}
