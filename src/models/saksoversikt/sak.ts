import { Baksystem } from './fellesEnum';
import { OptionalJodaDateTimeType } from '../../utils/localDateTimeUtils';

export interface Sak {
    temakode: string;
    saksId: string;
    fagsaksnummer: string;
    avsluttet: OptionalJodaDateTimeType;
    fagsystem: string;
    baksystem: Baksystem;
}