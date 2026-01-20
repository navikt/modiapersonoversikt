import { guid } from 'nav-frontend-js-utils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import type * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FormSelect from '../../../../../../../../components/form/FormSelect';
import type { Traad } from '../../../../../../../../models/meldinger/meldinger';
import { datoSynkende } from '../../../../../../../../utils/date-utils';
import useList from '../../../../../../../../utils/hooks/use-list';
import { getFormattertMeldingsDato, meldingstittel } from '../../../../utils/meldingerUtils';
import EnkeltMelding from '../../../Enkeltmelding';
import { feilmeldingReactHookForm } from '../../oppgave/feilmeldingReactHookForm';
import MeldIPortenAdvarsel from './MeldIPortenAdvarsel';
import type { SladdeComponentProps } from './Sladdevalg';
import css from './SladdMeldingerMedArsak.module.css';

const PreviewStyle = styled(Normaltekst)`
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

function ValgteMeldingerPreview(props: { traad: Traad; valgte: string[] }) {
    if (props.valgte.length === 0) {
        return (
            <Innholdstittel tag="p" className={css.ingenvalgte}>
                Du må velge minst en melding for sending til sladding
            </Innholdstittel>
        );
    }
    const meldingskomponenter = props.traad.meldinger
        .filter((melding) => props.valgte.includes(melding.meldingsId))
        .sort(datoSynkende((melding) => melding.opprettetDato))
        .map((melding, index) => {
            const meldingnummer = props.traad.meldinger.length - index;
            return (
                <EnkeltMelding sokeord="" melding={melding} key={melding.meldingsId} meldingsNummer={meldingnummer} />
            );
        });

    return <ol aria-label="Dialog">{meldingskomponenter}</ol>;
}

function SladdMeldingerMedArsak({ arsaker, traad, form }: SladdeComponentProps) {
    const checked = useList<string>([]);
    const addChecked = checked.add;
    const removeChecked = checked.remove;
    const feilmeldingId = useRef(guid());

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                addChecked(e.target.value);
            } else {
                removeChecked(e.target.value);
            }
        },
        [addChecked, removeChecked]
    );

    useEffect(() => {
        form.setValue('meldingIder', checked.values, { shouldValidate: true, shouldDirty: true });
    }, [checked.values, form]);

    const meldingPreviewListe = traad.meldinger.map((melding) => (
        <li className={css.melding} key={melding.meldingsId}>
            <Checkbox
                value={melding.meldingsId}
                onChange={onChange}
                checked={checked.values.includes(melding.meldingsId)}
                label={
                    <>
                        <Element>{meldingstittel(melding)}</Element>
                        <Normaltekst>{getFormattertMeldingsDato(melding)}</Normaltekst>
                        <PreviewStyle>{melding.fritekst}</PreviewStyle>
                    </>
                }
            />
        </li>
    ));

    const valgtMeldingFeilmelding = feilmeldingReactHookForm(form, 'meldingIder');

    return (
        <div className={css.layout}>
            <div className={css.list}>
                <ol>{meldingPreviewListe}</ol>
            </div>
            <div className={css.view}>
                <ValgteMeldingerPreview traad={traad} valgte={checked.values} />
            </div>
            <MeldIPortenAdvarsel className={css.alert} />
            <div className={css.action}>
                <FormSelect aria-label="Årsak" name={'arsak'} form={form} defaultValue="">
                    <>
                        <option value="" disabled>
                            Velg årsak
                        </option>
                        {arsaker.map((it) => (
                            <option value={it} key={it}>
                                {it}
                            </option>
                        ))}
                    </>
                </FormSelect>
                <div>
                    <Hovedknapp
                        aria-invalid={!!valgtMeldingFeilmelding}
                        aria-errormessage={valgtMeldingFeilmelding ? feilmeldingId.current : undefined}
                    >
                        Send til sladding
                    </Hovedknapp>
                    {valgtMeldingFeilmelding && (
                        <SkjemaelementFeilmelding id={feilmeldingId.current}>
                            {valgtMeldingFeilmelding}
                        </SkjemaelementFeilmelding>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SladdMeldingerMedArsak;
