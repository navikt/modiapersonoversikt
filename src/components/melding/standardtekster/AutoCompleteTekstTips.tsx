import { SparklesIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { useRef } from 'react';

function AutoCompleteTekstTips() {
    const modalRef = useRef<HTMLDialogElement>(null);
    return (
        <div>
            <Button
                variant="tertiary"
                size="small"
                icon={<SparklesIcon title="Hurtigtast-tips" />}
                onClick={(e) => {
                    e.preventDefault();
                    modalRef?.current?.showModal();
                }}
            />
            <Modal ref={modalRef} aria-labelledby="autocomplete-tips" header={{ heading: 'Autofullfør-tips' }}>
                <Modal.Body>
                    <ul>
                        <li>foet + mellomrom: Brukers fulle navn</li>
                        <li>mvh + mellomrom: Signatur</li>
                        <li>hei + mellomrom: Hei bruker</li>
                        <li>AAP + mellomrom: arbeidsavklaringspenger</li>
                        <li>sbt + mellomrom: saksbehandlingstid</li>
                        <li>nay + mellomrom: Nav Arbeid og ytelser</li>
                        <li>nfp + mellomrom: Nav Familie- og pensjonsytelser</li>
                        <li>hi, + mellomrom: Hi, bruker (engelsk)</li>
                        <li>mvh/aap + nn eller en + mellomrom: autofullfør på nynorsk eller engelsk</li>
                        <li>fp + mellomrom: foreldrepenger</li>
                        <li>bm + mellomrom: bidragsmottaker</li>
                        <li>bp + mellomrom: bidragspliktig</li>
                        <li>ag + mellomrom: arbeidsgiver</li>
                        <li>ub + mellomrom: utbetaling</li>
                        <li>dp + mellomrom: dagpenger</li>
                        <li>dpv + mellomrom: dagpengevedtak</li>
                        <li>sp + mellomrom: sykepenger</li>
                        <li>sosp + mellomrom: søknad om sykepenger</li>
                        <li>info + mellomrom: informasjon</li>
                        <li>baut + mellomrom: utvidet barnetrygd</li>
                        <li>baor + mellomrom: ordinær barnetrygd</li>
                        <li>aareg + mellomrom: arbeidsgiver- og arbeidstakerregisteret</li>
                        <li>aev + mellomrom: arbeidsevnevurdering</li>
                        <li>uft + mellomrom: uføretrygd</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AutoCompleteTekstTips;
