import * as React from 'react';
import { SladdeComponentProps } from './Sladdevalg';
import css from './SladdMeldingerMedArsak.module.css';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox, Select, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Innholdstittel, Element, Normaltekst } from 'nav-frontend-typografi';
import { getFormattertMeldingsDato, meldingstittel } from '../../../../utils/meldingerUtils';
import styled from 'styled-components/macro';
import { useCallback, useEffect, useRef } from 'react';
import useList from '../../../../../../../../utils/hooks/use-list';
import { Traad } from '../../../../../../../../models/meldinger/meldinger';
import { datoSynkende } from '../../../../../../../../utils/date-utils';
import EnkeltMelding from '../../../Enkeltmelding';
import { feilmeldingReactHookForm } from '../../oppgave/validering';
import { guid } from 'nav-frontend-js-utils';
import MeldIPortenAdvarsel from './MeldIPortenAdvarsel';

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
    } else {
        const meldingskomponenter = props.traad.meldinger
            .filter((melding) => props.valgte.includes(melding.meldingsId))
            .sort(datoSynkende((melding) => melding.opprettetDato))
            .map((melding, index) => {
                const meldingnummer = props.traad.meldinger.length - index;
                return (
                    <EnkeltMelding
                        sokeord=""
                        melding={melding}
                        key={melding.meldingsId}
                        meldingsNummer={meldingnummer}
                    />
                );
            });

        return <ol aria-label="Dialog">{meldingskomponenter}</ol>;
    }
}

function SladdMeldingerMedArsak({
    arsaker,
    getNativeProps,
    formState,
    traad,
    updateValueManually
}: SladdeComponentProps) {
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
        updateValueManually('meldingIder', checked.values);
    }, [checked, updateValueManually]);

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

    const valgtMeldingFeilmelding = feilmeldingReactHookForm('meldingIder', formState);

    const { ref, ...other } = getNativeProps('arsak');

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
                <Select
                    aria-label="Årsak"
                    selectRef={ref as any}
                    {...other}
                    feil={feilmeldingReactHookForm('arsak', formState)}
                >
                    <option value="" disabled selected>
                        Velg årsak
                    </option>
                    {arsaker.map((it) => (
                        <option value={it} key={it}>
                            {it}
                        </option>
                    ))}
                </Select>
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
