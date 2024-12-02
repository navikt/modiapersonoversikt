import { useRef, useEffect } from 'react';
import { Data as Persondata, InformasjonElement } from './PersondataDomain';
import AriaNotification from '../../../components/AriaNotification';
import { UnmountClosed } from 'react-collapse';
import VisittkortBody from './body/VisittkortBody';
import VisittkortHeader from './header/VisittkortHeader';
import useHotkey from '../../../utils/hooks/use-hotkey';
import useUrlNyPersonforvalter from '../../brukerprofil/useUrlNyPersonforvalter';
import SikkerhetstiltakModal from './header/SikkerhetstiltakModal';
import EgenAnsattFeilendeSystemModal from './header/EgenAnsattFeilendeSystemModal';
import { harFeilendeSystemer } from './harFeilendeSystemer';
import { useVisittkortState } from '../../../context/visittkort-state';
import { trackAccordionClosed, trackAccordionOpened } from '../../../utils/amplitude';

interface Props {
    persondata: Persondata;
}

function VisittkortVisning(props: Props) {
    const visittkortState = useVisittkortState();
    const erApen = visittkortState.apent;
    const toggleApen = visittkortState.toggle;
    const lenkeNyBrukerprofil = useUrlNyPersonforvalter();

    const isMount = useRef(true);

    useEffect(() => {
        if (isMount.current) {
            isMount.current = false;
            return;
        }
        return erApen ? trackAccordionOpened('Visittkort') : trackAccordionClosed('Visittkort');
    }, [erApen, isMount]);

    useHotkey({ char: 'n', altKey: true }, () => toggleApen(), [toggleApen], 'Visittkort');
    useHotkey(
        { char: 'b', altKey: true },
        () => window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer'),
        [lenkeNyBrukerprofil],
        'Visittkort'
    );

    return (
        <>
            <AriaNotification
                beskjed={`Visittkortet ble ${erApen ? 'åpnet' : 'lukket'}`}
                dontShowOnFirstRender={true}
            />
            <article role="region" aria-label="Visittkort" aria-expanded={erApen}>
                <VisittkortHeader persondata={props.persondata} erApen={erApen} toggleApen={toggleApen} />
                <SikkerhetstiltakModal sikkerhetstiltak={props.persondata.person.sikkerhetstiltak} />
                <EgenAnsattFeilendeSystemModal
                    egenAnsattFeiler={harFeilendeSystemer(
                        props.persondata.feilendeSystemer,
                        InformasjonElement.EGEN_ANSATT
                    )}
                />
                <UnmountClosed isOpened={erApen}>
                    <VisittkortBody persondata={props.persondata} />
                </UnmountClosed>
            </article>
        </>
    );
}

export default VisittkortVisning;
