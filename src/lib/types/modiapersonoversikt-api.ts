import {
    DataFeilendeSystemer,
    type KodeBeskrivelseAdresseBeskyttelse,
    KodeBeskrivelseAdresseBeskyttelseKode,
    KodeBeskrivelseKjonnKode,
    KodeBeskrivelseSivilstandTypeKode,
    MeldingDTOMeldingstype,
    type MeldingDto,
    TraadDTOTraadType,
    type TraadDto,
    type components
} from 'src/generated/modiapersonoversikt-api';
import type { ModiapersonoversiktAPI } from 'src/lib/clients/modiapersonoversikt-api';
export * from 'src/generated/modiapersonoversikt-api';

/*
 * Type aliser for schema typer generert fra OpenAPI. Kun aliaser som refererer til schemaet skal inn
 * her for å enklere referere til typer i koden.
 */

export type PersonData =
    ModiapersonoversiktAPI['/rest/v3/person']['post']['responses']['200']['content']['*/*']['person'];

export type RelasjonPerson =
    | components['schemas']['ForelderBarnRelasjon']
    | components['schemas']['SivilstandRelasjon'];

export type AdresseBeskyttelse = KodeBeskrivelseAdresseBeskyttelse;

export type OmraadeMedHandling = components['schemas']['OmraadeMedHandlingString'];

export type PersonsokRequest = components['schemas']['PersonsokRequestV3'];
export type PersonsokResponse = components['schemas']['PersonSokResponsDTO'];

export type Varsel = components['schemas']['Event'];
export type FeiletVarsling = components['schemas']['FeiletVarsling'];

// Enum aliaser for kortere & mer forståelige navn

export const AdresseBeskyttelseKode = KodeBeskrivelseAdresseBeskyttelseKode;
export type AdresseBeskyttelseKode = KodeBeskrivelseAdresseBeskyttelseKode;

export const SivilstandType = KodeBeskrivelseSivilstandTypeKode;
export type SivilstandType = KodeBeskrivelseSivilstandTypeKode;

export const PersonDataFeilendeSystemer = DataFeilendeSystemer;
export type PersonDataFeilendeSystemer = DataFeilendeSystemer;

export type Traad = TraadDto;
export type Melding = MeldingDto;

export const TraadType = TraadDTOTraadType;
export type TraadType = TraadDTOTraadType;

export const Meldingstype = MeldingDTOMeldingstype;
export type Meldingstype = MeldingDTOMeldingstype;

export const Kjonn = KodeBeskrivelseKjonnKode;
export type Kjonn = KodeBeskrivelseKjonnKode;
