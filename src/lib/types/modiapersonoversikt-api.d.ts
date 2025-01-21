import type { components } from 'src/generated/modiapersonoversikt-api';
import type { ModiapersonoversiktAPI } from 'src/lib/clients/modiapersonoversikt-api';

/*
 * Type aliser for schema typer generert fra OpenAPI. Kun aliaser som refererer til schemaet skal inn
 * her for å enklere referere til typer i koden.
 */

export type PersonData =
    ModiapersonoversiktAPI['/rest/v3/person']['post']['responses']['200']['content']['*/*']['person'];
export type PersonDataFeilendeSystemer =
    ModiapersonoversiktAPI['/rest/v3/person']['post']['responses']['200']['content']['*/*']['feilendeSystemer'];

export type Adresse = components['schemas']['Adresse'];
export type SistEndret = components['schemas']['SistEndret'];
export type Navn = components['schemas']['Navn'];

export type OmraadeMedHandling = components['schemas']['OmraadeMedHandlingString'];

export type PersonsokRequest = components['schemas']['PersonsokRequestV3'];
export type PersonsokResponse = components['schemas']['PersonSokResponsDTO'];

export type Varsel = components['schemas']['Event'];
export type FeiletVarsling = components['schemas']['FeiletVarsling'];
