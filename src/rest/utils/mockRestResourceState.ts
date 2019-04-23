import { RestResource } from './restResource';
import { STATUS } from './utils';

// tslint:disable-next-line
export const mockRestResourceState: RestResource<any> = {
    status: STATUS.NOT_STARTED,
    actions: {
        fetch: jest.fn(),
        reload: jest.fn(),
        fetchWithCustomUriGenerator: jest.fn(),
        reloadWithCustomUriGenerator: jest.fn(),
        setData: jest.fn(),
        reset: jest.fn()
    }
};
