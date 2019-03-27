import * as React from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../../../models/ytelse/sykepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import DetaljerCollapse from '../../../../../../../components/DetaljerCollapse';
import styled from 'styled-components';
import theme from '../../../../../../../styles/personOversiktTheme';

interface Props {
    arbeidsforhold?: Arbeidsforhold[];
}

const StyledListe = styled.ol`
    li:not(:first-child) {
        border-top: ${theme.border.skilleDashed};
    }
`;

function ArbeidsForholdListe({ arbeidsforhold }: Props) {
    const [open, setOpen] = useState(false);
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Kunne ikke finne noen arbeidsforhold</AlertStripeInfo>;
    }

    if (arbeidsforhold.length === 1) {
        return (
            <ol>
                <ArbeidsForholdListeElement arbeidsforhold={arbeidsforhold[0]} />
            </ol>
        );
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    return (
        <StyledListe>
            <DetaljerCollapse
                alwaysGrayBackground={true}
                open={open}
                toggle={() => setOpen(!open)}
                tittel="alle arbeidsforhold"
                header={<ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />}
            >
                {resten.map(element => (
                    <ArbeidsForholdListeElement arbeidsforhold={element} />
                ))}
            </DetaljerCollapse>
        </StyledListe>
    );
}

export default ArbeidsForholdListe;
