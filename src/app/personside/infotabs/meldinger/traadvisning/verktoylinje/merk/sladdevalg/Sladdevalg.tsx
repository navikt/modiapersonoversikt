import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Traad } from '../../../../../../../../models/meldinger/meldinger';
import { PopupComponentProps, renderPopup } from '../../../../../../../../components/popup-boxes/popup-boxes';
import { useCallback } from 'react';
import useFeatureToggle from '../../../../../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../../../../../components/featureToggle/toggleIDs';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import formstateFactory, { Formstate } from '@nutgaard/use-formstate';
import SladdTradMedArsak from './SladdTradMedArsak';
import SladdMeldingerMedArsak from './SladdMeldingerMedArsak';
import css from './Sladdvalg.module.css';
import { useSladdeArsak } from './use-sladde-arsak';
import { QueryClient } from '@tanstack/react-query';

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
    meldingIder: string;
};
type FormProps = { velgMeldinger: boolean };
const useFormstate = formstateFactory<SladdeForm, FormProps>({
    arsak(value: string) {
        if (value === '') {
            return 'Du må velge årsak';
        }
        return undefined;
    },
    meldingIder(value: string, values: any, props: FormProps) {
        if (props.velgMeldinger) {
            const meldingIder = value.split('||').filter((it) => it !== '');
            if (meldingIder.length === 0) {
                return 'Du må velge minst en melding';
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
});

export interface SladdeComponentProps {
    formstate: Formstate<SladdeForm>;
    arsaker: string[];
    traad: Traad;
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
    const formstate = useFormstate({ arsak: '', meldingIder: '' }, { velgMeldinger: kanSladdeFlere });
    const config = kanSladdeFlere ? sladdMeldingConfig : sladdTradConfig;
    const content = useSladdeArsak(props.traad.traadId, (arsaker: string[]) =>
        React.createElement(config.component, { formstate, arsaker, traad })
    );

    const onSubmit = useCallback(
        (values: SladdeForm) => {
            const arsak = values.arsak;
            const meldingId = values.meldingIder.split('||').filter((it) => it !== '');
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
            <form onSubmit={formstate.onSubmit(onSubmit)} className={css.layout}>
                <Systemtittel tag="h1" className={css.header}>
                    {config.header}
                </Systemtittel>
                <div className={kanSladdeFlere ? css.content : css.contentMini}>{content}</div>
            </form>
        </Modal>
    );
}
