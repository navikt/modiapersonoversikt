import { BodyShort } from '@navikt/ds-react';

interface Props {
    erReservert?: boolean | null;
    reservasjonOppdatert?: string | null;
    kontaktinformasjonVerdi: string | null;
    sistOppdatert: string | null;
    visVedReservasjon?: boolean;
}

function KRRInfo({
    erReservert,
    reservasjonOppdatert,
    kontaktinformasjonVerdi,
    sistOppdatert,
    visVedReservasjon = false
}: Props) {
    if (erReservert) {
        return (
            <>
                <BodyShort size="small">
                    {visVedReservasjon && kontaktinformasjonVerdi
                        ? `${kontaktinformasjonVerdi} (Reservert)`
                        : 'Reservert'}
                </BodyShort>
                <BodyShort size="small" className="text-sm" textColor="subtle">
                    I Kontakt- og reservasjonsregisteret
                </BodyShort>
                {reservasjonOppdatert && (
                    <BodyShort size="small" textColor="subtle" className="text-sm">
                        Endret {reservasjonOppdatert} i Kontakt- og reservasjonsregisteret
                    </BodyShort>
                )}
            </>
        );
    }
    if (!kontaktinformasjonVerdi) {
        return <BodyShort size="small">Ikke registrert</BodyShort>;
    }
    return (
        <>
            <BodyShort size="small">{kontaktinformasjonVerdi}</BodyShort>
            {sistOppdatert && (
                <BodyShort size="small" textColor="subtle" className="text-sm">
                    Endret {sistOppdatert} i Kontakt- og reservasjonsregisteret
                </BodyShort>
            )}
        </>
    );
}

export default KRRInfo;
