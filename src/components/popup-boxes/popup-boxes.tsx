import React, { createElement, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import NavFrontendModal from 'nav-frontend-modal';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { focusOnFirstFocusable } from '../../utils/hooks/use-focus-on-first-focusable';
import { Input } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';

type PopupComponentProps<RESULT, PROPS> = { close(result: RESULT): void } & PROPS;
type PopupComponent<RESULT, PROPS> = React.ComponentType<PopupComponentProps<RESULT, PROPS>>;

const Modal = styled(NavFrontendModal)`
    text-align: right;
    width: 30rem;

    button {
        width: 4.5rem;
    }
    button + button {
        margin-left: 0.5rem;
    }
    p {
        margin-top: 0;
        text-align: left;
    }
`;

function renderPopup<RESULT, PROPS>(componentType: PopupComponent<RESULT, PROPS>, props: PROPS): Promise<RESULT> {
    return new Promise(resolve => {
        const tmp = document.createElement('div');
        document.body.appendChild(tmp);

        const close: (result: RESULT) => void = (result: RESULT) => {
            unmountComponentAtNode(tmp);
            document.body.removeChild(tmp);
            resolve(result);
        };
        const component = createElement(componentType, { ...props, close });

        render(component, tmp);
    });
}

type AlertProps = { message: string };

function Alert(props: PopupComponentProps<void, AlertProps>) {
    return (
        <Modal
            contentLabel="Alert popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={el => focusOnFirstFocusable(el)}
        >
            <p className="blokk-s">{props.message}</p>
            <Hovedknapp onClick={() => props.close()}>OK</Hovedknapp>
        </Modal>
    );
}

type ConfirmProps = { message: string };

function Confirm(props: PopupComponentProps<boolean, ConfirmProps>) {
    return (
        <Modal
            contentLabel="Bekreft popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={el => focusOnFirstFocusable(el)}
        >
            <p className="blokk-s">{props.message}</p>
            <Hovedknapp onClick={() => props.close(true)}>OK</Hovedknapp>
            <Flatknapp onClick={() => props.close(false)}>Cancel</Flatknapp>
        </Modal>
    );
}

type PromptProps = { message: string; secret: boolean };

function Prompt(props: PopupComponentProps<string | null, PromptProps>) {
    const [value, setValue] = useState('');
    return (
        <Modal
            contentLabel="Input popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={el => focusOnFirstFocusable(el)}
        >
            <form>
                <p className="blokk-xxs">{props.message}</p>
                <Input
                    type={props.secret ? 'password' : 'text'}
                    className="blokk-s"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                <Hovedknapp onClick={() => props.close(value)}>OK</Hovedknapp>
                <Flatknapp htmlType="button" onClick={() => props.close(null)}>
                    Cancel
                </Flatknapp>
            </form>
        </Modal>
    );
}

export function alert(message: string): Promise<void> {
    return renderPopup(Alert, { message });
}

export function confirm(message: string): Promise<boolean> {
    return renderPopup(Confirm, { message });
}

export function prompt(message: string): Promise<string | null> {
    return renderPopup(Prompt, { message, secret: false });
}

export function promptSecret(message: string): Promise<string | null> {
    return renderPopup(Prompt, { message, secret: true });
}
