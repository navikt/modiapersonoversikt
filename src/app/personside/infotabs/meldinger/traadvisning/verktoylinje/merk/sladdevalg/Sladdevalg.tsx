import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Traad } from '../../../../../../../../models/meldinger/meldinger';
import { PopupComponentProps, renderPopup } from '../../../../../../../../components/popup-boxes/popup-boxes';
import { useCallback } from 'react';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
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
const Modal = styled(NavFrontendModal)`
    &.modal {
        width: 100%;
        max-width: 57rem;
        min-height: 10rem;
        max-height: 40rem;
        height: 100%;
        padding: 0;
        overflow: hidden;

        > section {
            height: 100%;
        }
    }
`;

type SladdeForm = {
    arsak: string;
    meldingIder: string[];
};

const resolver = (values: SladdeForm) => {
    const errors: { [Property in keyof Partial<SladdeForm>]: FieldError } = {};

    if (!values.arsak || values.arsak === '') {
        errors.arsak = buildFieldError('Du må velge årsak');
    }

    if (!values.meldingIder.length) {
        errors.meldingIder = buildFieldError('Du må velge minst en melding');
    }

    return { values, errors };
};

export interface SladdeComponentProps {
    form: UseFormReturn<SladdeForm>;
    arsaker: string[];
    traad: Traad;
}

function Sladdevalg(props: PopupComponentProps<SladdeObjekt | null, Props>) {
    const close = props.close;
    const traad = props.traad;
    const abort = useCallback(() => close(null), [close]);

    const form = useForm<SladdeForm>({
        resolver,
        mode: 'onChange'
    });
    const content = useSladdeArsak(props.traad.traadId, (arsaker: string[]) => (
        <SladdMeldingerMedArsak form={form} arsaker={arsaker} traad={traad} />
    ));

    const onSubmit = useCallback(
        (values: SladdeForm) => {
            const arsak = values.arsak;
            const meldingId = values.meldingIder;
            close({ traadId: traad.traadId, meldingId, arsak });
            return Promise.resolve();
        },
        [close, traad]
    );

    return (
        <Modal isOpen={true} onRequestClose={abort} contentLabel="Velg meldinger og årsak til sladding">
            <form onSubmit={form.handleSubmit(onSubmit)} className={css.layout}>
                <Systemtittel tag="h1" className={css.header}>
                    Velg meldinger og årsak til sladding
                </Systemtittel>
                <div className={css.content}>{content}</div>
            </form>
        </Modal>
    );
}
