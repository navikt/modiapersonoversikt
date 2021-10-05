import * as React from 'react';
import { Data as Persondata, Kjonn } from '../PersondataDomain';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import Kvinne from '../../../../svg/Kvinne';
import Mann from '../../../../svg/Mann';
import { hentNavn } from '../utils-visittkort';
import { useRef } from 'react';
import PersonStatus from './status/PersonStatus';
import { erDod } from '../person-utils';
import Etiketter from './etiketter/Etiketter';
import VisMerChevron from '../../../../components/VisMerChevron';
import NavKontorContainer from './navkontor/NavKontorContainer';
import { useAppState, useOnMount } from '../../../../utils/customHooks';

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
    display: flex;
    justify-content: center;
    align-items: start;
    margin-right: 0.5rem;
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

function hentAlder(props: Props): string | undefined {
    if (erDod(props.persondata.person)) {
        return 'Død';
    }
    return props.persondata.person.alder?.toString();
}

function VisittkortHeader(props: Props) {
    const navneLinjeRef = useRef<HTMLSpanElement>(null);
    const jobberMedSTO = useAppState(state => state.session.jobberMedSTO);

    useOnMount(() => {
        if (props.persondata.person.sikkerhetstiltak.length > 0) {
            return;
        }
        if (jobberMedSTO) {
            // Fokus skal havne i meldingsliste
            return;
        }
        navneLinjeRef.current?.focus();
    });

    const ikon = {
        ikon: erMann(props) ? <Mann /> : <Kvinne />
    };

    const toggleApen = () => {
        props.toggleApen();
    };

    const alder = hentAlder(props);
    const kjonn = props.persondata.person.kjonn[0].kode === 'M' ? 'Mann' : 'Kvinne';

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
                        <span className="visually-hidden">{kjonn}</span>
                        <PersonStatus person={props.persondata.person} />
                    </GrunninfoDiv>
                </VenstreFelt>
                <HoyreFelt>
                    <Etiketter person={props.persondata.person} />
                    <NavKontorContainer person={props.persondata.person} />
                </HoyreFelt>
            </StyledContent>
            <ChevronStyling>
                <VisMerChevron
                    onClick={e => {
                        e.stopPropagation();
                        toggleApen();
                    }}
                    open={props.erApen}
                    title={(props.erApen ? 'Lukk' : 'Åpne') + ' visittkort (Alt + N)'}
                    focusOnRelativeParent={true}
                >
                    <span className="visually-hidden">{props.erApen ? 'Lukk visittkort' : 'Ekspander visittkort'}</span>
                </VisMerChevron>
            </ChevronStyling>
        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
