import { Heading } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import { periodeEllerNull } from 'src/components/ytelser/utils';
import type { PeriodeDagpengerDto } from 'src/generated/modiapersonoversikt-api';

/* ugly hack for lack of a pretty name */
function prettyYtelseType(ytelseType: string) {
    return ytelseType
        .replace(/^DAGPENGER_/, '')
        .replace('ARBEIDSSOKER', 'ARBEIDSSØKER')
        .replace('ORDINAER', 'ORDINÆR')
        .replace('_', ' ')
        .toLowerCase()
        .replace(/\b./, (initial: string) => initial.toUpperCase());
}

export const PeriodeDagpengerDtoDetails = ({ ytelse }: { ytelse: PeriodeDagpengerDto }) => {
    const per = periodeEllerNull({ fra: ytelse.fraOgMedDato, til: ytelse.tilOgMedDato });
    const entries = {
        Periode: per,
        Type: prettyYtelseType(ytelse.ytelseType)
    };
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om dagpenger
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
        </Card>
    );
};
