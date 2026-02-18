import { Accordion, Heading, VStack } from '@navikt/ds-react';
import { capitalize } from 'lodash';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import { type ForeldrepengerFpSak, ForeldrepengerFpSakYtelse } from 'src/generated/modiapersonoversikt-api';
import type { ForeldrepengerFpSakPeriode } from 'src/models/ytelse/foreldrepenger-fpsak';
import { datoEllerTomString, formaterDato, prosentEllerNull } from 'src/utils/string-utils';

const getForeldrePengerRettenEntries = (ytelse: ForeldrepengerFpSak) => {
    const perioder = { 'Fra og med': formaterDato(ytelse.fom), 'Til og med': formaterDato(ytelse.tom) };

    return {
        Saksnummer: ytelse.saksnummer,
        Ytelsetype: capitalize(ytelse.ytelse),
        ...(ytelse.ytelse === ForeldrepengerFpSakYtelse.ENGANGSST_NAD ? { Dato: formaterDato(ytelse.fom) } : perioder)
    };
};

const ForeldrepengePerioder = ({ ytelse }: { ytelse: ForeldrepengerFpSak }) => {
    if (ytelse.perioder.length === 0 || ytelse.ytelse === ForeldrepengerFpSakYtelse.ENGANGSST_NAD) return <></>;

    const getEntries = (periode: ForeldrepengerFpSakPeriode) => {
        return {
            'Fra og med': formaterDato(periode.fom),
            'Til og med': formaterDato(periode.tom),
            Grad: prosentEllerNull(periode.grad)
        };
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <Accordion size="small">
                {ytelse.perioder.map((periode, index) => {
                    return (
                        <Accordion.Item key={`${index}-${periode.fom}`}>
                            <Accordion.Header>{`Periode - ${datoEllerTomString(periode.fom)}`}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent entries={getEntries(periode)} columns={{ xs: 2, md: 3 }} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Card>
    );
};

export const ForeldrePengerFpSakDetails = ({ ytelse }: { ytelse: ForeldrepengerFpSak }) => {
    return (
        <VStack gap="1" minHeight="0">
            <Card padding="4">
                <Heading as="h3" size="small">
                    Om {ytelse.ytelse.toLowerCase()}
                </Heading>
                <TitleValuePairsComponent entries={getForeldrePengerRettenEntries(ytelse)} />
            </Card>
            <ForeldrepengePerioder ytelse={ytelse} />
        </VStack>
    );
};
