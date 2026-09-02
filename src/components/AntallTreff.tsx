import { Skeleton, Tag } from '@navikt/ds-react';

interface Props {
    antall: number;
    /** Totalt antall uten filtrering. Utelates når visningen ikke har filter. */
    totalt?: number;
    entall: string;
    flertall: string;
    isLoading?: boolean;
}

export const antallTreffTekst = ({ antall, totalt, entall, flertall }: Omit<Props, 'isLoading'>): string => {
    const substantiv = antall === 1 ? entall : flertall;
    const erFiltrert = totalt !== undefined && totalt !== antall;

    return erFiltrert ? `Viser ${antall} av ${totalt} ${flertall}` : `${antall} ${substantiv}`;
};

export const AntallTreff = ({ antall, totalt, entall, flertall, isLoading = false }: Props) => (
    <span aria-live="polite" aria-atomic="true">
        {isLoading ? (
            <Skeleton variant="rounded" width="8rem" height="1.5rem" />
        ) : (
            <Tag size="small" variant="moderate" data-color="neutral">
                {antallTreffTekst({ antall, totalt, entall, flertall })}
            </Tag>
        )}
    </span>
);
