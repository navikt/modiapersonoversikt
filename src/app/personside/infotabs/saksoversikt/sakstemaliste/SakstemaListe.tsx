import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaListeElement from './SakstemaListeElement';
import { Undertittel } from 'nav-frontend-typografi';
import {
    aggregertSakstema,
    hentDatoForSisteHendelse,
    hentFormattertDatoForSisteHendelse
} from '../utils/saksoversiktUtils';

interface Props {
    sakstema: Sakstema[];
    oppdaterSakstema: (sakstema: Sakstema) => void;
    valgtSakstema?: Sakstema;
}

interface State {
    aggregertSakstema: Sakstema;
}

export const sakstemakodeAlle = 'ALLE';

const SakstemaListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const Wrapper = styled.div`
    ${theme.hvittPanel}
    min-width: 24rem;
    flex-basis: 24rem;
    ol {
        list-style: none;
    }
`;

const TittelWrapper = styled.div`
    padding: ${theme.margin.px20};
`;

type GrupperteTemaProps = Props;

function GrupperteTema(props: GrupperteTemaProps) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .map(sakstema => (
            <SakstemaListeElement
                erValgtSakstema={props.valgtSakstema === sakstema}
                sakstema={sakstema}
                oppdaterSakstema={props.oppdaterSakstema}
                key={sakstema.temakode + hentFormattertDatoForSisteHendelse(sakstema)}
            />
        ));
    return <SakstemaListeStyle>{sakstemakomponenter}</SakstemaListeStyle>;
}

class SakstemaListe extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const aggregert = aggregertSakstema(props.sakstema);
        this.state = {
            aggregertSakstema: aggregert
        };
        if (!this.props.valgtSakstema) {
            this.props.oppdaterSakstema(aggregert);
        }
    }

    render() {
        if (this.props.sakstema.length === 0) {
            return <AlertStripeInfo>Det finnes ingen saker for bruker.</AlertStripeInfo>;
        }

        const sorterPåHendelse = (a: Sakstema, b: Sakstema) =>
            hentDatoForSisteHendelse(b).getTime() - hentDatoForSisteHendelse(a).getTime();
        const sortertSakstema = this.props.sakstema.sort(sorterPåHendelse);

        const komplettListe = [this.state.aggregertSakstema, ...sortertSakstema];

        return (
            <Wrapper>
                <TittelWrapper>
                    <Undertittel>Tema</Undertittel>
                </TittelWrapper>
                <nav aria-label="Velg sakstema">
                    <GrupperteTema
                        valgtSakstema={this.props.valgtSakstema}
                        sakstema={komplettListe}
                        oppdaterSakstema={this.props.oppdaterSakstema}
                    />
                </nav>
            </Wrapper>
        );
    }
}

export default SakstemaListe;
