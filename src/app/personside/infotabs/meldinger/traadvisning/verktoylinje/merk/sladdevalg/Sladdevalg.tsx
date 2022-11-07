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
import { useForm, FieldError } from 'react-hook-form';
import { buildFieldError } from '../../../../../../../../components/form/formUtils';
import { UseFormReturn } from 'react-hook-form/dist/types';

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
    const errors: { [Property in keyof Partial<SladdeForm>]: FieldError } = {};

    if (!values.arsak || values.arsak === '') {
        errors.arsak = buildFieldError('Du må velge årsak');
    }

    if (props.velgMeldinger && !values.meldingIder.length) {
        errors.meldingIder = buildFieldError('Du må velge minst en melding');
    }

    return { values, errors };
};

export interface SladdeComponentProps {
    form: UseFormReturn<SladdeForm>;
    arsaker: string[];
    traad: Traad;
}

interface Config {
    header: string;
    label: string;
    wrapperCSS: string;
    component: React.ComponentType<SladdeComponentProps>;
}
const sladdTradConfig: Config = {
    header: 'Velg årsak til sladding',
    label: 'Velg årsak til sladding',
    wrapperCSS: css.contentMini,
    component: SladdTradMedArsak
};
const sladdMeldingConfig: Config = {
    header: 'Velg meldinger og årsak til sladding',
    label: 'Velg meldinger og årsak til sladding',
    wrapperCSS: css.content,
    component: SladdMeldingerMedArsak
};

function Sladdevalg(props: PopupComponentProps<SladdeObjekt | null, Props>) {
    const close = props.close;
    const traad = props.traad;
    const kanSladdeFlere = useFeatureToggle(FeatureToggles.SladdeEnkeltMelding)?.isOn ?? false;
    const abort = useCallback(() => close(null), [close]);

    const config = kanSladdeFlere ? sladdMeldingConfig : sladdTradConfig;

    const form = useForm<SladdeForm>({
        resolver: (values) => resolver(values, { velgMeldinger: kanSladdeFlere }),
        mode: 'onChange'
    });

    const content = useSladdeArsak(props.traad.traadId, (arsaker: string[]) => {
        return React.createElement(config.component, {
            form,
            arsaker,
            traad
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={css.layout}>
                <Systemtittel tag="h1" className={css.header}>
                    {config.header}
                </Systemtittel>
                <div className={config.wrapperCSS}>{content}</div>
            </form>
        </Modal>
    );
}
