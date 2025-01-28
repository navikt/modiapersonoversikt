import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import styled from 'styled-components';
import NavLogo from '../../svg/NavLogo';
import { datoVerbose } from '../date-utils';

const Wrapper = styled.div`
    @page {
        size: auto;
    }
    @media print {
        margin: 5mm;
        display: block;
    }
    .visually-hidden {
        display: none;
    }
`;
const Header = styled.div`
    > * {
        margin-bottom: 1rem;
    }
    display: none;
    @media print {
        display: flex;
    }
    flex-direction: column;
    align-items: center;
    padding: 0 2rem 3rem;
`;

interface Props {
    children: ReactNode;
}

export function PrinterMedHeader(props: Props) {
    const fnr = usePersonAtomValue();
    return (
        <Wrapper className="ikke-skjul-ved-print-i-gamlemodia">
            <Header>
                <NavLogo />
                <Normaltekst>Utskriftsdato : {datoVerbose().sammensattMedKlokke}</Normaltekst>
                <Normaltekst>Fødselsnummer: {fnr}</Normaltekst>
            </Header>
            {props.children}
        </Wrapper>
    );
}
