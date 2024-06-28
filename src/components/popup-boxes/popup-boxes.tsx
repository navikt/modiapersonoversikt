import React, { createElement, FormEvent, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import RawModal from 'nav-frontend-modal';
import KnappBase from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import OkIkon from 'nav-frontend-ikoner-assets/assets/ok-sirkel-fyll.svg';
import AdvarselIkon from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import ErrorIkon from 'nav-frontend-ikoner-assets/assets/feil-sirkel-fyll.svg';
import HelpIkon from 'nav-frontend-ikoner-assets/assets/help-circle_hover.svg';
import InfoIkon from 'nav-frontend-ikoner-assets/assets/info-sirkel-fyll.svg';
import styled from 'styled-components/macro';
import { focusOnFirstFocusable } from '../../utils/hooks/use-focus-on-first-focusable';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type IconChoice = 'none' | 'ok' | 'warning' | 'error' | 'help' | 'info';
type CommonPopupComponentProps = {
    icon: IconChoice;
    header: string;
    message: string;
};
export type PopupComponentProps<RESULT, PROPS> = { close(result: RESULT): void } & PROPS;
type PopupComponent<RESULT, PROPS> = React.ComponentType<PopupComponentProps<RESULT, PROPS>>;

const Modal = styled(RawModal)`
    text-align: center;
    max-width: 30rem;
    width: 100%;
`;
const Knapp = styled(KnappBase)`
    display: block;
    width: 100%;
`;

function getIcon(choice: IconChoice): React.ReactNode {
    switch (choice) {
        case 'ok':
            return <OkIkon width="2rem" className="blokk-xs" />;
        case 'warning':
            return <AdvarselIkon width="2rem" className="blokk-xs" />;
        case 'error':
            return <ErrorIkon width="2rem" className="blokk-xs" />;
        case 'help':
            return <HelpIkon width="2rem" className="blokk-xs" />;
        case 'info':
            return <InfoIkon width="2rem" className="blokk-xs" />;
        default:
            return null;
    }
}

export function renderPopup<RESULT, PROPS>(
    queryClient: QueryClient | null,
    componentType: PopupComponent<RESULT, PROPS>,
    props: PROPS
): Promise<RESULT> {
    return new Promise((resolve) => {
        const tmp = document.createElement('div');
        document.body.appendChild(tmp);

        const close: (result: RESULT) => void = (result: RESULT) => {
            unmountComponentAtNode(tmp);
            document.body.removeChild(tmp);
            resolve(result);
        };
        const component = createElement(componentType, { ...props, close });
        if (queryClient) {
            render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>, tmp);
        } else {
            render(component, tmp);
        }
    });
}

type AlertProps = CommonPopupComponentProps;

function Alert(props: PopupComponentProps<void, AlertProps>) {
    return (
        <Modal
            contentLabel="Alert popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={(el) => focusOnFirstFocusable(el)}
        >
            {getIcon(props.icon)}
            <Systemtittel tag="h1" className="blokk-xxxs">
                {props.header}
            </Systemtittel>
            <Normaltekst className="blokk-m">{props.message}</Normaltekst>
            <Knapp type="hoved" onClick={() => props.close()}>
                OK
            </Knapp>
        </Modal>
    );
}

type ConfirmProps = CommonPopupComponentProps;

function Confirm(props: PopupComponentProps<boolean, ConfirmProps>) {
    return (
        <Modal
            contentLabel="Bekreft popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={(el) => focusOnFirstFocusable(el)}
        >
            {getIcon(props.icon)}
            <Systemtittel tag="h1" className="blokk-xxxs">
                {props.header}
            </Systemtittel>
            <Normaltekst className="blokk-m">{props.message}</Normaltekst>
            <Knapp type="hoved" className="blokk-xxxs" onClick={() => props.close(true)}>
                OK
            </Knapp>
            <Knapp type="flat" onClick={() => props.close(false)}>
                Avbryt
            </Knapp>
        </Modal>
    );
}

type PromptProps = CommonPopupComponentProps & { secret: boolean };

function Prompt(props: PopupComponentProps<string | null, PromptProps>) {
    const [value, setValue] = useState('');
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.close(value);
    };

    return (
        <Modal
            contentLabel="Input popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={(el) => focusOnFirstFocusable(el)}
        >
            <form onSubmit={submitHandler}>
                {getIcon(props.icon)}
                <Systemtittel tag="h1" className="blokk-xxxs">
                    {props.header}
                </Systemtittel>
                <Normaltekst className="blokk-m">{props.message}</Normaltekst>
                <Input
                    type={props.secret ? 'password' : 'text'}
                    className="blokk-s"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <Knapp type="hoved">OK</Knapp>
                <Knapp type="flat" htmlType="button" onClick={() => props.close(null)}>
                    Avbryt
                </Knapp>
            </form>
        </Modal>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function alert(props: CommonPopupComponentProps): Promise<void> {
    return renderPopup(null, Alert, props);
}

export function confirm(props: CommonPopupComponentProps): Promise<boolean> {
    return renderPopup(null, Confirm, props);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prompt(props: CommonPopupComponentProps): Promise<string | null> {
    return renderPopup(null, Prompt, { ...props, secret: false });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function promptSecret(props: CommonPopupComponentProps): Promise<string | null> {
    return renderPopup(null, Prompt, { ...props, secret: true });
}
