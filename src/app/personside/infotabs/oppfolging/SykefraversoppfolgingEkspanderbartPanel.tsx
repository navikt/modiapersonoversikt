import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useState } from 'react';
import { trackAccordionClosed, trackAccordionOpened } from 'src/utils/analytics';
import type { SyfoPunkt } from '../../../../models/oppfolging';
import { datoSynkende, formatterDato } from '../../../../utils/date-utils';
import { StyledTable } from '../../../../utils/table/StyledTable';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';

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
    const [open, setOpen] = useState(false);
    const handleSetOpen = (open: boolean) => {
        setOpen(open);
        return open ? trackAccordionOpened('Sykefraværsoppfølging') : trackAccordionClosed('Sykefraværsoppfølging');
    };

    if (props.syfoPunkter.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ikke informasjon om sykefraværsoppfølging for valgt periode i Arena
            </AlertStripeInfo>
        );
    }

    return (
        <EkspanderbartYtelserPanel open={open} setOpen={handleSetOpen} tittel="Sykefraværsoppfølging">
            <SykefraversoppfolgingTabell syfoPunkter={props.syfoPunkter} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykefraversoppfolgingEkspanderbartPanel;
