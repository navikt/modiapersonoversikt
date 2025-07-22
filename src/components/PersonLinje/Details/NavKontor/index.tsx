import { Accordion, Alert, BodyShort, Box, Heading, Link, Skeleton } from '@navikt/ds-react';
import { Fragment } from 'react';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { useBaseUrls, usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer, type Publikumsmottak } from 'src/lib/types/modiapersonoversikt-api';
import NavLogo from 'src/svg/NavLogo';
import { harFeilendeSystemer, mapUgyldigGT } from '../../utils';
import { Adresseinfo, Group, InfoElement } from '../components';

function PublikumsmottakKontaktInfo(props: {
    publikumsmottak: Publikumsmottak;
}) {
    const apningstider = props.publikumsmottak.apningstider.map((apningstid) => {
        return (
            <Fragment key={apningstid.ukedag}>
                <dt className="basis-1/2 flex-1">
                    <BodyShort className="capitalize">{apningstid.ukedag}</BodyShort>
                </dt>
                <dd className="basis-1/2 flex-1">
                    <BodyShort>{apningstid.apningstid}</BodyShort>
                </dd>
            </Fragment>
        );
    });

    return (
        <div>
            <br />
            <BodyShort size="small" textColor="subtle">
                Besøksadresse
            </BodyShort>
            <Adresseinfo adresse={props.publikumsmottak.besoksadresse} />
            <br />
            <BodyShort size="small" textColor="subtle">
                Åpningstider
            </BodyShort>
            <dl className="flex flex-wrap max-w-80">{apningstider}</dl>
            <br />
        </div>
    );
}

function Publikumsmottak(props: { publikumsmottak: Publikumsmottak[] }) {
    const publikumsmottak = props.publikumsmottak;
    const firstPublikumsmottak = publikumsmottak.firstOrNull();
    const otherPublikumsmottak = publikumsmottak.slice(1);
    if (!firstPublikumsmottak) {
        return <BodyShort>ingen publikumsmottak</BodyShort>;
    }
    const flerePublikumsmottak =
        otherPublikumsmottak.length > 0 ? (
            <>
                <Heading spacing size="xsmall" textColor="subtle">
                    Det finnes flere publikumsmottak
                </Heading>
                <Accordion size="small" headingSize="xsmall" className="max-w-96">
                    {otherPublikumsmottak.map((mottak) => (
                        <Accordion.Item key={mottak.besoksadresse.linje1}>
                            <Accordion.Header>{mottak.besoksadresse.linje1}</Accordion.Header>
                            <Accordion.Content>
                                <PublikumsmottakKontaktInfo publikumsmottak={mottak} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        ) : null;

    return (
        <>
            <PublikumsmottakKontaktInfo publikumsmottak={firstPublikumsmottak} />
            {flerePublikumsmottak}
        </>
    );
}

function KontorLenke({ navEnhetId }: { navEnhetId: string }) {
    const { data, isLoading, error } = useBaseUrls();
    const baseUrl = data?.norg2Frontend ?? '';

    return (
        <QueryErrorBoundary loading={isLoading} error={error} loader={<Skeleton variant="text" />}>
            <Link href={`${baseUrl}/#/startsok?enhetNr=${navEnhetId}`} target="_blank" rel="noopener noreferrer">
                Mer informasjon om kontoret
            </Link>
        </QueryErrorBoundary>
    );
}

function NavKontor() {
    const {
        data: { feilendeSystemer, person }
    } = usePersonData();

    const { geografiskTilknytning, navEnhet } = person;

    if (harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.NORG_NAVKONTOR)) {
        return (
            <Group title="NAV-kontor">
                <InfoElement title="Ukjent NAV-kontor" icon={<NavLogo />}>
                    <Alert variant="warning">Feilet ved uthenting av informasjon om NAV-kontor</Alert>
                </InfoElement>
            </Group>
        );
    }

    if (!geografiskTilknytning) {
        return null;
    }

    if (!navEnhet) {
        return (
            <Group title="NAV-kontor">
                <InfoElement
                    title={mapUgyldigGT(geografiskTilknytning)}
                    icon={<NavLogo style={{ width: '2.5rem', marginLeft: '-1rem' }} />}
                >
                    <Alert variant="warning">Fant ikke geografisk tilknyttning for bruker</Alert>
                </InfoElement>
            </Group>
        );
    }

    return (
        <Group title="NAV-kontor">
            <InfoElement
                title={`${navEnhet?.id} ${navEnhet.navn}`}
                icon={<NavLogo style={{ width: '2.5rem', marginLeft: '-1rem' }} />}
            >
                <Publikumsmottak publikumsmottak={navEnhet.publikumsmottak} />
                <Box marginBlock="4">
                    <KontorLenke navEnhetId={navEnhet.id} />
                </Box>
            </InfoElement>
        </Group>
    );
}

export default NavKontor;
