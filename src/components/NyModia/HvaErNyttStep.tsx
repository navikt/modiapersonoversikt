import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Dokumenter from './img/dokumenter-ekspandert.png';
import Kommunikasjon from './img/meldinger-oversikt.png';
import Oversikt from './img/oversikt.png';
import GenerelleEndringer from './img/oversikt-uten-dekorator.png';

const options = [
    {
        id: 'generelle-endringer',
        panelId: 'generelle-endringer',
        title: 'Generelle endringer',
        description: (
            <ul className="list-disc ml-6">
                <li>Meny på venstre side</li>
                <li>Du kan bytte til mørk versjon fra menyen</li>
            </ul>
        ),
        image: GenerelleEndringer,
        alt: 'Skjermbilde av menyen'
    },
    {
        id: 'dokumenter',
        panelId: 'dokumenter',
        title: 'Dokumenter',
        description: (
            <ul className="list-disc ml-6">
                <li>Her finner du alle dokumenter, og du har enkel tilgang til filtre på toppen</li>
                <li>Dokumentene åpnes i denne visningen, eller du kan velge å åpne de i ny fane</li>
            </ul>
        ),
        image: Dokumenter,
        alt: 'Skjermbilde av dokumentersiden'
    },
    {
        id: 'kommunikasjon',
        panelId: 'kommunikasjon',
        title: 'Kommunikasjon',
        description: (
            <ul className="list-disc ml-6">
                <li>Nyeste melding er nederst i en dialog</li>
                <li>Utvidet filter</li>
                <li>Nye meldinger og oppgaver markeres med rød prikk i sidemenyen, og blå prikk ved selv meldingen</li>
            </ul>
        ),
        image: Kommunikasjon,
        alt: 'Skjermbilde av meldingsfanen'
    },
    {
        id: 'oversikt',
        panelId: 'oversikt',
        title: 'Oversikt',
        description: (
            <ul className="list-disc ml-6">
                <li>Her finner du nå all personinformasjon om brukeren</li>
                <li>Nøkkelinfo finner du i personlinjen på toppen av siden</li>
            </ul>
        ),
        image: Oversikt,
        alt: 'Skjermbilde av oversiktssiden'
    }
];

export const HvaErNyttStep = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const listboxRef = useRef<HTMLDivElement>(null);
    const activeItem = options[activeIndex];

    const onKeyDown = (event: React.KeyboardEvent) => {
        let next: number | null = null;
        if (event.key === 'ArrowDown') next = (activeIndex + 1) % options.length;
        else if (event.key === 'ArrowUp') next = (activeIndex - 1 + options.length) % options.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = options.length - 1;

        if (next !== null) {
            event.preventDefault();
            setActiveIndex(next);
        }
    };

    return (
        <HStack wrap={false} gap="space-24" align="start">
            <VStack
                ref={listboxRef}
                aria-label="Hva er nytt i Modia Personoversikt?"
                aria-orientation="vertical"
                className="flex flex-col min-w-1/3"
                aria-activedescendant={activeItem.id}
                aria-controls={activeItem.panelId}
                tabIndex={0}
                onKeyDown={onKeyDown}
                role="listbox"
                gap="space-16"
            >
                {options.map((item, index) => (
                    <Box.New
                        key={item.id}
                        id={item.id}
                        role="option"
                        tabIndex={0}
                        aria-selected={activeIndex === index}
                        onClick={() => setActiveIndex(index)}
                        onKeyDown={(event) => {
                            if (event.key === ' ' || event.key === 'Enter') {
                                setActiveIndex(index);
                            }
                        }}
                        className={twMerge(
                            'aksel-button border-2 border-[var(--ax-border-default)] text-ax-text-accent-subtle justify-start text-sm',
                            activeIndex === index ? 'bg-[var(--ax-bg-moderate-pressed)]' : ''
                        )}
                    >
                        <VStack>
                            <BodyShort weight="semibold" size="small">
                                {item.title}
                            </BodyShort>
                            {activeIndex === index ? item.description : ''}
                        </VStack>
                    </Box.New>
                ))}
            </VStack>
            {options.map((item, index) => (
                <Box.New
                    key={item.panelId}
                    id={item.panelId}
                    hidden={activeIndex !== index}
                    borderColor="neutral-subtle"
                    borderWidth="2"
                    minWidth="550px"
                    borderRadius="8"
                >
                    <img alt={item.alt} src={item.image} />
                </Box.New>
            ))}
        </HStack>
    );
};
