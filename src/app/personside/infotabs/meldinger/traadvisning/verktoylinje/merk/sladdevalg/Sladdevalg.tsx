import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Traad } from '../../../../../../../../models/meldinger/meldinger';
import { PopupComponentProps, renderPopup } from '../../../../../../../../components/popup-boxes/popup-boxes';
import { useCallback } from 'react';
import useFeatureToggle from '../../../../../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../../../../../components/featureToggle/toggleIDs';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import SladdTradMedArsak from './SladdTradMedArsak';
import SladdMeldingerMedArsak from './SladdMeldingerMedArsak';
import css from './Sladdvalg.module.css';
import { useSladdeArsak } from './use-sladde-arsak';
import { QueryClient } from '@tanstack/react-query';
import { useForm, FormState, UseFormRegisterReturn } from 'react-hook-form';

interface Props {
    traad: Traad;
}

export type SladdeObjekt = ({ traadId: string } | { meldingId: Array<string> }) & { arsak?: string };

export function velgMeldingerTilSladding(traad: Traad, queryClient: QueryClient) {
    return renderPopup(queryClient, Sladdevalg, { traad });
}
const ModalBase = styled(NavFrontendModal)`
    &.modal {
        width: 100%;
        max-width: 57rem;
        min-height: 10rem;
        height: 100%;
        padding: 0;
        overflow: hidden;

        > section {
            height: 100%;
        }
    }
`;
const ModalMini = styled(ModalBase)`
    &.modal {
        max-height: 18rem;
    }
`;
const ModalStor = styled(ModalBase)`
    &.modal {
        max-height: 40rem;
    }
`;

export type SladdeForm = {
    arsak: string;
    meldingIder: string[];
};
type FormProps = { velgMeldinger: boolean };

const resolver = (values: SladdeForm, props: FormProps) => {
    const errors: { [Property in keyof Partial<SladdeForm>]: string } = {};

    if (!values.arsak || values.arsak === '') {
        errors.arsak = 'Du må velge årsak';
    }
    if (props.velgMeldinger && !values.meldingIder.length) {
        errors.meldingIder = 'Du må velge minst en melding';
    }

    return { values, errors };
};

type TManualUpdate = <K extends keyof SladdeForm>(key: K, value: SladdeForm[K]) => void;

export interface SladdeComponentProps {
    formState: FormState<SladdeForm>;
    arsaker: string[];
    traad: Traad;
    getNativeProps: (key: keyof SladdeForm) => UseFormRegisterReturn<typeof key>;
    updateValueManually: TManualUpdate;
}

interface Config {
    header: string;
    label: string;
    component: React.ComponentType<SladdeComponentProps>;
}
const sladdTradConfig: Config = {
    header: 'Velg årsak til sladding',
    label: 'Velg årsak til sladding',
    component: SladdTradMedArsak
};
const sladdMeldingConfig: Config = {
    header: 'Velg meldinger og årsak til sladding',
    label: 'Velg meldinger og årsak til sladding',
    component: SladdMeldingerMedArsak
};

function Sladdevalg(props: PopupComponentProps<SladdeObjekt | null, Props>) {
    const close = props.close;
    const traad = props.traad;
    const kanSladdeFlere = useFeatureToggle(FeatureToggles.SladdeEnkeltMelding)?.isOn ?? false;
    const abort = useCallback(() => close(null), [close]);

    const { register, handleSubmit, formState, setValue } = useForm<SladdeForm>({
        resolver: (values) => resolver(values, { velgMeldinger: kanSladdeFlere })
    });

    const updateValueManually = useCallback<TManualUpdate>(
        (key, value) => {
            setValue(key, value as any, { shouldValidate: true });
        },
        [setValue]
    );

    const config = kanSladdeFlere ? sladdMeldingConfig : sladdTradConfig;

    const content = useSladdeArsak(props.traad.traadId, (arsaker: string[]) => {
        return React.createElement(config.component, {
            formState,
            arsaker,
            traad,
            getNativeProps: (key: keyof SladdeForm) => register(key),
            updateValueManually
        });
    });

    const onSubmit = useCallback(
        (values: SladdeForm) => {
            const arsak = values.arsak;
            const meldingId = values.meldingIder;
            const sladdeObject = kanSladdeFlere
                ? { traadId: traad.traadId, meldingId, arsak }
                : { traadId: traad.traadId, arsak };
            close(sladdeObject);
            return Promise.resolve();
        },
        [kanSladdeFlere, close, traad]
    );

    const Modal = kanSladdeFlere ? ModalStor : ModalMini;
    return (
        <Modal isOpen={true} onRequestClose={abort} contentLabel={config.label}>
            <form onSubmit={handleSubmit(onSubmit)} className={css.layout}>
                <Systemtittel tag="h1" className={css.header}>
                    {config.header}
                </Systemtittel>
                <div className={kanSladdeFlere ? css.content : css.contentMini}>{content}</div>
            </form>
        </Modal>
    );
}
