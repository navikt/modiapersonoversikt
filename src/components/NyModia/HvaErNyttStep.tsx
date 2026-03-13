import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import testmodal from './img/testmodal.png';

const options = [
    {
        id: 'generelle-endringer',
        panelId: 'generelle-endringer',
        title: 'Generelle endringer',
        description: (
            <ul className="list-disc ml-6">
                <li>Meny på venstre side</li>
                <li>Du kan bytte til mørk versjon frå menyen</li>
            </ul>
        ),
        image: testmodal
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
        image: ''
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
        image: '<div>hade</div>'
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
        image: '<div>hade</div>'
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
        <HStack wrap={false} gap="2" align="start">
            <Box.New
                ref={listboxRef}
                aria-label="Hva er nytt i Modia Personoversikt?"
                aria-orientation="vertical"
                className="flex flex-col max-w-1/2"
                aria-activedescendant={activeItem.id}
                aria-controls={activeItem.panelId}
                tabIndex={0}
                onKeyDown={onKeyDown}
                role="listbox"
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
                            'aksel-button border-2 border-[var(--ax-border-default)] text-ax-text-accent-subtle mb-6 justify-start',
                            activeIndex === index ? 'bg-[var(--ax-bg-moderate-pressed)]' : ''
                        )}
                    >
                        <VStack>
                            <BodyShort className="font-ax-bold">{item.title}</BodyShort>
                            {item.description}
                        </VStack>
                    </Box.New>
                ))}
            </Box.New>
            {options.map((item, index) => (
                <Box.New key={item.panelId} id={item.panelId} hidden={activeIndex !== index}>
                    <img width="2000" alt="blal" src={item.image} />
                </Box.New>
            ))}
        </HStack>
    );
};
