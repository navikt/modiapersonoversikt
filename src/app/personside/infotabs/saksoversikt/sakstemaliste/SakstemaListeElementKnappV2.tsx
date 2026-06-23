import { Element } from 'nav-frontend-typografi';
import { memo } from 'react';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import type { UmamiEvent } from 'src/router';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import { useInfotabsDyplenker } from '../../dyplenker';
import { sakerTest } from '../../dyplenkeTest/utils-dyplenker-test';

interface Props {
    sakstema: Sakstema;
    erValgt: boolean;
    umamiEvent?: UmamiEvent;
}

function SakstemaListeElementKnapp(props: Props) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <li className={sakerTest.sakstema}>
            <VisMerKnapp
                valgt={props.erValgt}
                linkTo={dyplenker.saker.link(props.sakstema)}
                ariaDescription={`Vis ${props.sakstema.temanavn}`}
                umamiEvent={props.umamiEvent}
            >
                <Element className={sakerTest.oversikt}>{props.sakstema.temanavn}</Element>
            </VisMerKnapp>
        </li>
    );
}

export default memo(SakstemaListeElementKnapp);
