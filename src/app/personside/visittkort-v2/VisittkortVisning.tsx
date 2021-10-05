import * as React from 'react';
import { Data as Persondata } from './PersondataDomain';
import AriaNotification from '../../../components/AriaNotification';
import { UnmountClosed } from 'react-collapse';
import useToggle from '../../../utils/hooks/use-toggle';
import VisittkortBody from './body/VisittkortBody';
import VisittkortHeader from './header/VisittkortHeader';

interface Props {
    persondata: Persondata;
}
function VisittkortHurtigtaster() {
    // Bli inspirert av HandleVisittkortHotkeys.tsx
    // Mulig useHotkey() kan brukes?
    return null;
}

function VisittkortVisning(props: Props) {
    const [erApen, toggleApen] = useToggle(false);

    return (
        <>
            <AriaNotification
                beskjed={`Visittkortet ble ${erApen ? 'åpnet' : 'lukket'}`}
                dontShowOnFirstRender={true}
            />
            <VisittkortHurtigtaster />
            {/*eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
            <article role="region" aria-label="Visittkort" aria-expanded={erApen}>
                <VisittkortHeader persondata={props.persondata} erApen={erApen} toggleApen={toggleApen} />
                <UnmountClosed isOpened={erApen}>
                    <VisittkortBody person={props.persondata.person} />
                </UnmountClosed>
            </article>
        </>
    );
}

export default VisittkortVisning;
