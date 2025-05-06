import { BodyShort } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import NavLogo from 'src/svg/navLogoNy.svg';
import { datoVerbose } from 'src/utils/date-utils';
import styles from './printContainer.module.css';

type Props = {
    children: ReactNode;
};

export function PrintContainer(props: Props) {
    const fnr = usePersonAtomValue();
    return (
        <div className={styles.printContainer}>
            <div className={styles.printHeader}>
                <NavLogo />
                <BodyShort>Utskriftsdato : {datoVerbose().sammensattMedKlokke}</BodyShort>
                <BodyShort>Fødselsnummer: {fnr}</BodyShort>
            </div>
            {props.children}
        </div>
    );
}
