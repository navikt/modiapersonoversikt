import * as React from 'react';
import { Data as Persondata, InformasjonElement } from './PersondataDomain';
import AriaNotification from '../../../components/AriaNotification';
import { UnmountClosed } from 'react-collapse';
import useToggle from '../../../utils/hooks/use-toggle';
import VisittkortBody from './body/VisittkortBody';
import VisittkortHeader from './header/VisittkortHeader';
import useHotkey from '../../../utils/hooks/use-hotkey';
import useUrlNyPersonforvalter from '../../brukerprofil/useUrlNyPersonforvalter';
import SikkerhetstiltakModal from './header/SikkerhetstiltakModal';
import EgenAnsattFeilendeSystemModal from './header/EgenAnsattFeilendeSystemModal';

interface Props {
    persondata: Persondata;
}

function VisittkortVisning(props: Props) {
    const [erApen, toggleApen] = useToggle(false);
    const lenkeNyBrukerprofil = useUrlNyPersonforvalter();

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
            {/*eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
            <article role="region" aria-label="Visittkort" aria-expanded={erApen}>
                <VisittkortHeader persondata={props.persondata} erApen={erApen} toggleApen={toggleApen} />
                <SikkerhetstiltakModal sikkerhetstiltak={props.persondata.person.sikkerhetstiltak} />
                <EgenAnsattFeilendeSystemModal
                    egenAnsattFeiler={props.persondata.feilendeSystemer
                        .map((system) => system === InformasjonElement.EGEN_ANSATT)
                        .includes(true)}
                />
                <UnmountClosed isOpened={erApen}>
                    <VisittkortBody persondata={props.persondata} />
                </UnmountClosed>
            </article>
        </>
    );
}

export default VisittkortVisning;
