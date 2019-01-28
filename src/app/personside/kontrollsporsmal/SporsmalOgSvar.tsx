import styled from 'styled-components';
import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Bold } from '../../../components/common-styled-components';
import { Spørsmål } from '../../../redux/restReducers/kontrollSporsmal/types';
import theme from '../../../styles/personOversiktTheme';
import UtropstegnPlain from '../../../svg/UtropstegnPlain';

interface Props {
    spørsmål: Spørsmål;
}

const SporsmalOgSvarStyling = styled.div`
  display: flex;
  margin: ${theme.margin.px10};
  flex-flow: row wrap;
`;

const SpørsmålTekst = styled.div`
  text-align: left;
  flex-flow: row;
  padding-left: ${theme.margin.px20};
  flex: 1.5;
`;

const OpplysningTekstStyling = styled.div`
  text-align: left;
  display: flex;
  flex-flow: row;
  flex: 1 1;
  padding-right: ${theme.margin.px20};
  border-right: dashed 0.0625rem #b7b1a9;

`;

const SvarKolonneStyling = styled.div`
  display: flex;
 > * {
    margin-right: ${theme.margin.px50};
    white-space: pre;
  }
`;

const Luft = styled.div`
  margin-bottom: 1rem;
`;

const Feilmelding = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: row;
  svg {
    height: ${theme.margin.px30};
    width: auto;
    margin-right: ${theme.margin.px10}
  }
`;

class SpørsmålOgSvar extends React.PureComponent<Props> {

    render() {
        let svar;
        if (this.props.spørsmål.svar instanceof Array) {
            svar = this.props.spørsmål.svar.map(enkeltSvar => {
                return (
                    <Normaltekst key={enkeltSvar}>
                        {enkeltSvar}
                    </Normaltekst>
                );
            });
        } else {
            svar = <Normaltekst>{this.props.spørsmål.svar}</Normaltekst>;
        }

        return (
            <SporsmalOgSvarStyling>
                <OpplysningsTekst/>
                <SpørsmålTekst>
                    <Normaltekst>
                        <Bold>
                            {this.props.spørsmål.spørsmål}
                        </Bold>
                    </Normaltekst>
                    <Luft/>
                    <SvarKolonneStyling>
                        {svar}
                    </SvarKolonneStyling>
                </SpørsmålTekst>
            </SporsmalOgSvarStyling>
        );
    }
}

export function getFeilTekst() {
    return (
        <Feilmelding>
            <UtropstegnPlain/>
            <Normaltekst>
                Det finnes ingen opplysninger som kan brukes til å stille kontrollspørsmål
            </Normaltekst>
        </Feilmelding>
    );
}

function OpplysningsTekst() {
    const tekst = (
        <>
            For din egen sikkerhet må jeg stille deg noen spørsmål slik
            at jeg er sikker på at jeg snakker med riktig person.
        </>
    );
    return (
        <OpplysningTekstStyling>
            <Normaltekst>
                {tekst}
            </Normaltekst>
        </OpplysningTekstStyling>
    );
}

export default SpørsmålOgSvar;