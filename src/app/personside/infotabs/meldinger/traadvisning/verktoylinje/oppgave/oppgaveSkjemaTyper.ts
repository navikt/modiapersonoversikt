import { UseFormRegisterReturn } from 'react-hook-form';
import { OppgaveSkjemaDelteFelter } from './oppgaveInterfaces';

/**
 * React Hook Form har ikke bra støtte for Generics og reusable components. Disse typene er laget som en midlertidig workaround inntil
 * v.8 blir sluppet. Mer info:
 * https://github.com/react-hook-form/react-hook-form/discussions/7354
 *
 * Work around inspo:
 * https://stackoverflow.com/questions/72126944/how-to-create-a-reusable-react-hook-form-component-with-typescript-generics
 */

type StringKey<T> = Extract<keyof T, string>;

export type UseOppgaveSkjemaRegister<F extends OppgaveSkjemaDelteFelter = OppgaveSkjemaDelteFelter> = <
    K extends StringKey<F>
>(
    key: K
) => UseFormRegisterReturn<string>;
export type UseOppgaveSkjemaWatch<F extends OppgaveSkjemaDelteFelter = OppgaveSkjemaDelteFelter> = <
    K extends StringKey<F>
>(
    key: K
) => F[K];
