import React, { useState } from 'react';
import AvsluttGosysOppgaveSkjema from './AvsluttGosysOppgaveSkjema';
import { Element } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import styled from 'styled-components';
import { OppgaveSkjemaElementerSkjermetPerson } from './OppgaveSkjemaElementerSkjermetPerson';
import { OppgaveProps, OppgaveSkjemaForm, SkjermetPersonOppgaveSkjemaProps } from './oppgaveInterfaces';
import { GsakTema, GsakTemaOppgavetype, GsakTemaUnderkategori } from '../../../../../../../models/meldinger/oppgave';
import { ValideringsResultat } from '../../../../../../../utils/forms/FormValidator';
import { getValidOppgaveSkjemaState } from './oppgaveSkjemaValidator';

const SkjemaStyle = styled.div`
    padding-top: 1rem;
    .inputPanelGruppe__inner {
        display: flex;
        > * {
            flex-grow: 1;
        }
    }
    label {
        font-weight: 600;
        margin-bottom: 0.1rem;
    }
    .skjemaelement {
        margin-bottom: 0.7rem;
    }
`;

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        margin: 0;
    }
`;

function OppgaveSkjemaSkjermetPerson(props: OppgaveProps) {
    const [submitting, setSubmitting] = useState(false);
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState<string | undefined>(undefined);
    const [beskrivelse, settBeskrivelse] = useState('');
    const [valideringsResultat, settValideringsresultat] = useState<ValideringsResultat<OppgaveSkjemaForm>>(
        getValidOppgaveSkjemaState()
    );
    function oppdaterStateVedValgtTema(tema: GsakTema | undefined) {
        settValgtTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }

        const normalOppgaveprioritet = tema?.prioriteter.find(prioritet => prioritet.kode.includes('NORM'));
        settValgtPrioritet(normalOppgaveprioritet?.kode);
    }
    const submitHandler = () => {
        setSubmitting(true);
        settValideringsresultat(valideringsResultat);
    };
    const formState: OppgaveSkjemaForm = {
        valgtTema,
        valgtUnderkategori,
        valgtOppgavetype,
        valgtPrioritet,
        beskrivelse
    };
    const formProps: SkjermetPersonOppgaveSkjemaProps = {
        state: formState,
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtPrioritet,
            settBeskrivelse
        },
        valideringsResultat: valideringsResultat
    };

    return (
        <SkjemaStyle>
            <AvsluttGosysOppgaveSkjema />
            <form onSubmit={submitHandler}>
                <Element>Opprett oppgave</Element>
                <OppgaveSkjemaElementerSkjermetPerson {...props} form={formProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={submitting}>
                        Lag Oppgave
                    </Hovedknapp>
                    <LenkeKnapp type="button">Avbryt</LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaSkjermetPerson;
