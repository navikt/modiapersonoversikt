import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import styled from 'styled-components';
import VisMerChevron from '../../../../components/VisMerChevron';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import { Kjonn, type KodeBeskrivelse, type Data as Persondata } from '../PersondataDomain';
import { hentAlderEllerDod, hentNavn } from '../visittkort-utils';
import Etiketter from './etiketter/Etiketter';
import KjonnIkon from './KjonnIkon';
import NavKontorContainer from './navkontor/NavKontorContainer';
import PersonStatus from './status/PersonStatus';

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
    min-width: 35%;
`;

const HoyreFelt = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    text-align: right;
    box-sizing: border-box;
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

const ukjentKjonn: KodeBeskrivelse<Kjonn> = {
    kode: Kjonn.U,
    beskrivelse: 'Ukjent kjønn'
};

function VisittkortHeader(props: Props) {
    const navneLinjeRef = useRef<HTMLSpanElement>(null);
    const person = props.persondata.person;

    useOnMount(() => {
        if (!person.sikkerhetstiltak.isEmpty()) {
            return;
        }
        navneLinjeRef.current?.focus();
    });

    const kjonn = person.kjonn.firstOrNull() ?? ukjentKjonn;
    const navn = person.navn.firstOrNull();

    return (
        //biome-ignore lint/a11y/useSemanticElements: biome migration
        <VisittkortHeaderDiv role="region" aria-label="Visittkort-hode" onClick={props.toggleApen}>
            <StyledContent>
                <VenstreFelt>
                    <KjonnIkon kjonn={kjonn.kode} />
                    <GrunninfoDiv>
                        <Undertittel tag="h1">
                            <span
                                data-testId="visittkort:person"
                                ref={navneLinjeRef}
                                tabIndex={-1} /* for at focus skal funke */
                            >
                                {hentNavn(navn)} ({hentAlderEllerDod(person)})
                            </span>
                        </Undertittel>
                        <span className="visually-hidden">{kjonn.beskrivelse}</span>
                        <PersonStatus person={person} />
                    </GrunninfoDiv>
                </VenstreFelt>
                <HoyreFelt>
                    <Etiketter person={person} />
                    <NavKontorContainer person={person} />
                </HoyreFelt>
            </StyledContent>
            <ChevronStyling>
                <VisMerChevron
                    onClick={(e) => {
                        e.stopPropagation();
                        props.toggleApen();
                    }}
                    open={props.erApen}
                    title={`${props.erApen ? 'Lukk' : 'Åpne'} visittkort (Alt + N)`}
                    focusOnRelativeParent={true}
                >
                    <span className="visually-hidden">{props.erApen ? 'Lukk visittkort' : 'Ekspander visittkort'}</span>
                </VisMerChevron>
            </ChevronStyling>
        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
