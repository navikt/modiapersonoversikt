import { RestResource } from './restResource';
import { STATUS } from './utils';

export const mockRestResourceState: RestResource<any> = {
    status: STATUS.NOT_STARTED,
    actions: {
        fetch: jest.fn(),
        reload: jest.fn(),
        fetchWithCustomUriCreator: jest.fn(),
        reloadWithCustomUriCreator: jest.fn(),
        setData: jest.fn(),
        reset: jest.fn()
    }
};
