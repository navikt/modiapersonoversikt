import * as React from 'react';
import { Sykepenger, SykepengerResponse } from '../../../../models/ytelse/sykepenger';
import { Pleiepengerettighet, PleiepengerResponse } from '../../../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet, ForeldrepengerResponse } from '../../../../models/ytelse/foreldrepenger';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Bold } from '../../../../components/common-styled-components';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { paths } from '../../../routes/routing';
import { useFødselsnummer } from '../../../../utils/customHooks';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

interface SykepengerProps {
    sykepenger: Sykepenger[];
}

interface PleiepengerProps {
    pleiepenger: Pleiepengerettighet[];
}

interface ForeldrepengerProps {
    foreldrepenger: Foreldrepengerettighet[];
}

const YtelserStyle = styled.div`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelserOversikt() {
    const valgtBrukersFnr = useFødselsnummer();

    return (
        <YtelserStyle>
            <RestResourceConsumer<PleiepengerResponse>
                getResource={restResource => restResource.pleiepenger}
                returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
            >
                {data => {
                    if (!data.pleiepenger) {
                        return null;
                    }
                    return (
                        <VisMerKnapp
                            linkTo={`${paths.personUri}/${valgtBrukersFnr}/ytelser`}
                            valgt={false}
                            ariaDescription="Vis pleiepenger"
                        >
                            <PleiepengerKomponent pleiepenger={data.pleiepenger} />
                        </VisMerKnapp>
                    );
                }}
            </RestResourceConsumer>
            <RestResourceConsumer<SykepengerResponse>
                getResource={restResource => restResource.sykepenger}
                returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
            >
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    return (
                        <VisMerKnapp
                            linkTo={`${paths.personUri}/${valgtBrukersFnr}/ytelser`}
                            valgt={false}
                            ariaDescription="Vis sykepenger"
                        >
                            <SykepengerKomponent sykepenger={data.sykepenger} />
                        </VisMerKnapp>
                    );
                }}
            </RestResourceConsumer>
            <RestResourceConsumer<ForeldrepengerResponse>
                getResource={restResource => restResource.foreldrepenger}
                returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
            >
                {data => {
                    if (!data.foreldrepenger) {
                        return null;
                    }
                    return (
                        <VisMerKnapp
                            linkTo={`${paths.personUri}/${valgtBrukersFnr}/ytelser`}
                            valgt={false}
                            ariaDescription="Vis foreldrepenger"
                        >
                            <ForeldrepengerKomponent foreldrepenger={data.foreldrepenger} />
                        </VisMerKnapp>
                    );
                }}
            </RestResourceConsumer>
        </YtelserStyle>
    );
}

function PleiepengerKomponent(props: PleiepengerProps) {
    const pleiepengeRettighet = props.pleiepenger[0];

    return (
        <div>
            <Normaltekst>
                <Bold>Pleiepenger sykt barn</Bold>
            </Normaltekst>
            <Normaltekst>Barnets f.nr: {pleiepengeRettighet.barnet}</Normaltekst>
        </div>
    );
}

function SykepengerKomponent(props: SykepengerProps) {
    const sykepenger = props.sykepenger[0];

    return (
        <div>
            <Normaltekst>ID dato: {sykepenger.sykmeldtFom}</Normaltekst>
            <Normaltekst>
                <Bold>Sykepenger</Bold>
            </Normaltekst>
            <Normaltekst>100% sykemeldt - Maksdato {sykepenger.slutt}</Normaltekst>
        </div>
    );
}

function ForeldrepengerKomponent(props: ForeldrepengerProps) {
    const foreldrepenger = props.foreldrepenger[0];

    return (
        <div>
            <Normaltekst>ID dato: {foreldrepenger.rettighetFom}</Normaltekst>
            <Normaltekst>
                <Bold>Foreldrepenger</Bold>
            </Normaltekst>
            <Normaltekst>
                {foreldrepenger.dekningsgrad}% dekningsgrad - Maksdato {foreldrepenger.slutt}
            </Normaltekst>
        </div>
    );
}

export default YtelserOversikt;
