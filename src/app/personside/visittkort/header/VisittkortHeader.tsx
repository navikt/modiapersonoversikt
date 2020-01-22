import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components/macro';
import { Undertittel } from 'nav-frontend-typografi';
import NavKontorContainer from './navkontor/NavKontorContainer';
import { erDød, erMann, Person } from '../../../../models/person/person';
import PersonStatus from './status/PersonStatus';
import EtiketterContainer from './Etiketter/EtiketterContainer';
import Mann from '../../../../svg/Mann.js';
import Kvinne from '../../../../svg/Kvinne.js';
import VisMerChevron from '../../../../components/VisMerChevron';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { hentNavn } from '../utils';
import { useOnMount } from '../../../../utils/customHooks';
import { useJobberMedSTO } from '../../../../utils/hooks/useJobberMedSTO';

interface Props {
    visittkortApent: boolean;
    person: Person;
    toggleVisittkort: (erApen?: boolean) => void;
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
    display: flex;
    flex-flow: row wrap;
    > * {
        flex: 1 1;
        min-width: 15rem;
    }
`;

const VenstreFelt = styled.section`
    display: flex;
`;

const HøyreFelt = styled.div`
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

function VisittkortHeader(props: Props) {
    const navneLinjeRef = useRef<HTMLSpanElement>(null);
    const jobberMedSTO = useJobberMedSTO();

    useOnMount(() => {
        if (props.person.sikkerhetstiltak) {
            return;
        }
        if (jobberMedSTO) {
            // Fokus skal havne i meldingsliste
            return;
        }
        navneLinjeRef.current?.focus();
    });

    const toggleVisittkort = () => {
        props.toggleVisittkort(!props.visittkortApent);
    };

    const ikon = {
        ikon: erMann(props.person) ? <Mann /> : <Kvinne />
    };

    const alder = erDød(props.person.personstatus) ? 'Død' : props.person.alder;
    const kjønn = props.person.kjønn === 'M' ? 'Mann' : 'Kvinne';
    return (
        <VisittkortHeaderDiv role="region" aria-label="Visittkort-hode" onClick={toggleVisittkort}>
            <StyledContent>
                <VenstreFelt>
                    <IkonDiv>{ikon.ikon}</IkonDiv>
                    <GrunninfoDiv>
                        <Undertittel tag="h1">
                            <span ref={navneLinjeRef} tabIndex={-1} /* for at focus skal funke*/>
                                {hentNavn(props.person.navn)} ({alder})
                            </span>
                        </Undertittel>
                        <span className="visually-hidden">{kjønn}</span>
                        <PersonStatus person={props.person} />
                    </GrunninfoDiv>
                </VenstreFelt>

                <HøyreFelt>
                    <EtiketterContainer />
                    <NavKontorContainer />
                </HøyreFelt>
            </StyledContent>

            <ChevronStyling>
                <VisMerChevron
                    onClick={toggleVisittkort}
                    open={props.visittkortApent}
                    title={(props.visittkortApent ? 'Lukk' : 'Åpne') + ' visittkort (Alt + N)'}
                    focusOnRelativeParent={true}
                >
                    <span className="visually-hidden">
                        {props.visittkortApent ? 'Lukk visittkort' : 'Ekspander visittkort'}
                    </span>
                </VisMerChevron>
            </ChevronStyling>
        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
