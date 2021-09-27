import * as React from 'react';
import { Data as Persondata, Kjonn } from '../PersondataDomain';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import Kvinne from '../../../../svg/Kvinne';
import Mann from '../../../../svg/Mann';
import { hentNavn } from '../utils-visittkort';
import { useRef } from 'react';

interface Props {
    persondata: Persondata;
    erApen: boolean;
    toggleApen: () => void;
}

const VisittkortHeaderDiv = styled.section`
    background-color: white;
    padding: ${theme.margin.layout};
    padding-right: 0;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    cursor: pointer;
`;

const StyledContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: row wrap;
    > * {
        flex: 1 1 15rem;
    }
`;

const VenstreFelt = styled.section`
    display: flex;
`;

const HoyreFelt = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    text-align: right;
    box-sizing: border-box;
`;

const IkonDiv = styled.div`
    flex: 0 0 ${theme.margin.px50};
    text-align: left;
    svg {
        height: ${theme.margin.px40};
        width: auto;
    }
`;

const GrunninfoDiv = styled.section`
    flex: 1 1;
    text-align: left;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    word-break: break-word;
    *:focus {
        ${theme.focus}
    }
    > *:first-child {
        margin-bottom: 0.2em !important;
    }
`;

const ChevronStyling = styled.div`
    padding: ${pxToRem(10)};
    display: flex;
    align-items: center;
    justify-content: center;
`;

function erMann(props: Props) {
    const kjonn = props.persondata.person.kjonn[0];
    if (!kjonn) {
        return;
    }
    return kjonn.kode === Kjonn.M;
}

function getAlder(props: Props): string | undefined {
    const fodselsdato = props.persondata.person.fodselsdato[0];
    if (!fodselsdato) {
        return;
    }
    return (new Date().getDate() - new Date(fodselsdato).getDate()).toString();
}

function VisittkortHeader(props: Props) {
    const navneLinjeRef = useRef<HTMLSpanElement>(null);

    const ikon = {
        ikon: erMann(props) ? <Mann /> : <Kvinne />
    };

    const toggleApen = () => {
        props.toggleApen();
    };

    const alder = getAlder(props);

    return (
        <VisittkortHeaderDiv role="region" aria-label="Visittkort-hode" onClick={toggleApen}>
            <StyledContent>
                <VenstreFelt>
                    <IkonDiv>{ikon.ikon}</IkonDiv>
                    <GrunninfoDiv>
                        <Undertittel tag="h1">
                            <span ref={navneLinjeRef} tabIndex={-1} /* for at focus skal funke */>
                                {hentNavn(props.persondata.person.navn[0])} ({alder})
                            </span>
                        </Undertittel>
                    </GrunninfoDiv>
                </VenstreFelt>
                <HoyreFelt>
                    <Normaltekst>Her kommer navkontor osv</Normaltekst>
                </HoyreFelt>
                <ChevronStyling>
                    <Normaltekst>Her er det noe</Normaltekst>
                </ChevronStyling>
            </StyledContent>
        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
