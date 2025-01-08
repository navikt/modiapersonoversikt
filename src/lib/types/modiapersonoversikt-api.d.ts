import type { components } from 'src/generated/modiapersonoversikt-api';
import type { ModiapersonoversiktAPI } from 'src/lib/clients/modiapersonoversikt-api';

export type PersonData =
    ModiapersonoversiktAPI['/rest/v3/person']['post']['responses']['200']['content']['*/*']['person'];
export type PersonsokRequest = components['schemas']['PersonsokRequestV3'];
export type PersonsokResponse = components['schemas']['PersonSokResponsDTO'];
