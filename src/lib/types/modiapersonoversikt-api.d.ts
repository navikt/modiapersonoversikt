import type { ModiapersonoversiktAPI } from 'src/lib/clients/modiapersonoversikt-api';

export type PersonData =
    ModiapersonoversiktAPI['/rest/v3/person']['post']['responses']['200']['content']['*/*']['person'];
