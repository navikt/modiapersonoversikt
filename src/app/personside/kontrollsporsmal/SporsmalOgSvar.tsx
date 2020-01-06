import styled from 'styled-components/macro';
import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Bold } from '../../../components/common-styled-components';
import { Spørsmål } from '../../../redux/kontrollSporsmal/types';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    spørsmål: Spørsmål;
}

const SporsmalOgSvarStyling = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SpørsmålTekstStyle = styled.div`
    flex-flow: row;
    flex-grow: 1.5;
`;

const OpplysningTekstStyling = styled.div`
    display: flex;
    flex: 0 1 ${pxToRem(350)};
    padding-right: ${theme.margin.px20};
    margin-right: ${theme.margin.px20};
    border-right: dashed 0.0625rem #b7b1a9;
`;

const SvarKolonneStyling = styled.div`
    display: flex;
`;

const KolonneStyling = styled.div`
    margin-right: ${theme.margin.px50};
    white-space: pre;
`;

const Luft = styled.div`
    margin-bottom: 1rem;
`;

const IngenKontrollspørsmålStyling = styled(AlertStripeAdvarsel)`
    margin-right: 1rem;
`;

class SpørsmålOgSvar extends React.PureComponent<Props> {
    render() {
        const svar = lagSvar(this.props.spørsmål);

        return (
            <SporsmalOgSvarStyling>
                <OpplysningsTekst />
                <SpørsmålTekstStyle>
                    <Undertittel aria-live="polite" tag="h3">
                        {this.props.spørsmål.spørsmål}
                    </Undertittel>
                    <Luft />
                    <SvarKolonneStyling>{svar}</SvarKolonneStyling>
                </SpørsmålTekstStyle>
            </SporsmalOgSvarStyling>
        );
    }
}

function lagSvar(spørsmål: Spørsmål) {
    return spørsmål.svar.map(enkeltSvar => (
        <KolonneStyling key={enkeltSvar.tekst}>
            <Normaltekst>
                <Bold>{enkeltSvar.beskrivelse}</Bold>
            </Normaltekst>
            <Normaltekst>{enkeltSvar.tekst}</Normaltekst>
        </KolonneStyling>
    ));
}

export function FeilTekst() {
    return (
        <IngenKontrollspørsmålStyling>
            Vi fant ingen opplysninger som kan brukes til å stille kontrollspørsmål
        </IngenKontrollspørsmålStyling>
    );
}

function OpplysningsTekst() {
    const tekst =
        'For din egen sikkerhet må jeg stille deg noen spørsmål, slik at jeg er sikker på at jeg snakker ' +
        'med riktig person.';
    return (
        <OpplysningTekstStyling>
            <Normaltekst>{tekst}</Normaltekst>
        </OpplysningTekstStyling>
    );
}

export default SpørsmålOgSvar;
