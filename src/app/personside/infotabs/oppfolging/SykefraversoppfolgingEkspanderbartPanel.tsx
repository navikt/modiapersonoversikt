import * as React from 'react';
import { SyfoPunkt } from '../../../../models/oppfolging';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende, formatterDato } from '../../../../utils/date-utils';
import { StyledTable } from '../../../../utils/table/StyledTable';
import { useAppState } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { setSykefraverEkspandert } from '../../../../redux/oppfolging/actions';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { trackAccordionClosed, trackAccordionOpened } from '../../../../utils/amplitude';

interface Props {
    syfoPunkter: SyfoPunkt[];
}

function SykefraversoppfolgingTabell(props: { syfoPunkter: SyfoPunkt[] }) {
    const sortertPaDato = props.syfoPunkter.sort(datoSynkende((syfoPunkt) => syfoPunkt.dato));

    const tableHeaders = ['Innen', 'Hendelse', 'Status'];

    const tableRows = sortertPaDato.map((syfopunkt) => [
        formatterDato(syfopunkt.dato),
        syfopunkt.syfoHendelse,
        syfopunkt.status
    ]);

    return <StyledTable tittelRekke={tableHeaders} rows={tableRows} />;
}

function SykefraversoppfolgingEkspanderbartPanel(props: Props) {
    const open = useAppState((state) => state.oppfolging.sykefraverEkspandert);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => {
        dispatch(setSykefraverEkspandert(open));
        !open && loggEvent('VisSykefraværsPanel', 'Oppfølging');
        open ? trackAccordionOpened('Sykefraværsoppfølging') : trackAccordionClosed('Sykefraværsoppfølging');
    };

    if (props.syfoPunkter.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ikke informasjon om sykefraværsoppfølging for valgt periode i Arena
            </AlertStripeInfo>
        );
    }

    return (
        <EkspanderbartYtelserPanel open={open} setOpen={setOpen} tittel="Sykefraværsoppfølging">
            <SykefraversoppfolgingTabell syfoPunkter={props.syfoPunkter} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykefraversoppfolgingEkspanderbartPanel;
