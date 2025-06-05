import { InformationIcon } from '@navikt/aksel-icons';
import { Alert, Button, HStack, Modal, Textarea, VStack } from '@navikt/ds-react';
import {
    type ChangeEvent,
    type ComponentProps,
    type KeyboardEvent,
    type RefObject,
    useCallback,
    useRef,
    useState
} from 'react';
import { rapporterBruk } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import StandardTekstModal from 'src/components/melding/standardtekster/StandardTeksterModal';
import { useStandardTekster } from 'src/lib/clients/skrivestotte';
import { Locale, type Tekst } from 'src/lib/types/skrivestotte';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { rules } from './autocompleteRules';
import { type AutofullforData, autofullfor, byggAutofullforMap, useAutoFullforData } from './autocompleteUtils';

function AutoTekstTips({ toggleModal, open }: { toggleModal: (open: boolean) => void; open: boolean }) {
    return (
        <div>
            <Button
                variant="secondary"
                size="small"
                icon={<InformationIcon title="Åpne modal med autofullfør tips" />}
                onClick={() => toggleModal(true)}
            />
            <Modal
                open={open}
                onClose={() => toggleModal(false)}
                aria-labelledby="autocomplete-tips"
                header={{ heading: 'Autofullfør-tips' }}
            >
                <Modal.Body>
                    <ul>
                        <li>foet + mellomrom: Brukers fulle navn</li>
                        <li>mvh + mellomrom: Signatur</li>
                        <li>hei + mellomrom: Hei bruker</li>
                        <li>AAP + mellomrom: arbeidsavklaringspenger</li>
                        <li>sbt + mellomrom: saksbehandlingstid</li>
                        <li>nay + mellomrom: Nav Arbeid og ytelser</li>
                        <li>nfp + mellomrom: Nav Familie- og pensjonsytelser</li>
                        <li>hi, + mellomrom: Hi, bruker (engelsk)</li>
                        <li>mvh/aap + nn eller en + mellomrom: autofullfør på nynorsk eller engelsk</li>
                        <li>fp + mellomrom: foreldrepenger</li>
                        <li>bm + mellomrom: bidragsmottaker</li>
                        <li>bp + mellomrom: bidragspliktig</li>
                        <li>ag + mellomrom: arbeidsgiver</li>
                        <li>ub + mellomrom: utbetaling</li>
                        <li>dp + mellomrom: dagpenger</li>
                        <li>dpv + mellomrom: dagpengevedtak</li>
                        <li>sp + mellomrom: sykepenger</li>
                        <li>sosp + mellomrom: søknad om sykepenger</li>
                        <li>info + mellomrom: informasjon</li>
                        <li>baut + mellomrom: utvidet barnetrygd</li>
                        <li>baor + mellomrom: ordinær barnetrygd</li>
                        <li>aareg + mellomrom: arbeidsgiver- og arbeidstakerregisteret</li>
                        <li>aev + mellomrom: arbeidsevnevurdering</li>
                        <li>uft + mellomrom: uføretrygd</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

const SPACE = ' ';
const ENTER = 'Enter';

function findWordBoundary(text: string, initialPosition: number): [number, number] {
    const words = text.split(/\s/);
    const indices: [number, number][] = new Array(words.length);
    for (let i = 0; i < words.length; i++) {
        const start = i === 0 ? 0 : indices[i - 1][1] + 1;
        const end = start + words[i].length;
        indices[i] = [start, end];

        if (start <= initialPosition && end >= initialPosition) {
            return [start, end];
        }
    }

    return [0, 0];
}

function autoFullfor(autofullforData: AutofullforData, parsedText: string) {
    const autofullforMap = byggAutofullforMap(
        Locale.nb_NO,
        autofullforData.enhet,
        autofullforData.person,
        autofullforData.saksbehandler
    );

    return autofullfor(parsedText, autofullforMap);
}

const settInnStandardTekst = (standardTekst: string, textAreaRef: RefObject<HTMLTextAreaElement | null>) => {
    if (!textAreaRef.current) return;
    textAreaRef.current.value =
        !textAreaRef.current.value || textAreaRef.current.value === ''
            ? standardTekst
            : `${textAreaRef.current.value}\n${standardTekst}`;
};

function asChangeEvent<T>(event: KeyboardEvent<T>): ChangeEvent<T> {
    if (event.target && event.target === event.currentTarget) {
        return event as unknown as ChangeEvent<T>;
    }
    throw new Error('Not equals at all');
}

type Props = ComponentProps<typeof Textarea>;

function AutocompleteTextarea({ onChange, description, ...rest }: Props) {
    const autofullforData = useAutoFullforData();
    const [feilmelding, settFeilmelding] = useState<string>();
    const standardtekster = useStandardTekster();
    const [openAutoFullforModal, setOpenAutoFullforModal] = useState(false);

    const onKeyDown: React.KeyboardEventHandler = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if ([SPACE, ENTER].includes(event.key)) {
                const cursorPosition =
                    event.currentTarget.selectionStart === event.currentTarget.selectionEnd
                        ? event.currentTarget.selectionStart
                        : -1;
                if (cursorPosition >= 0) {
                    const value = event.currentTarget.value;
                    const [start, end] = findWordBoundary(value, cursorPosition);

                    const word = value.substring(start, end).trim();
                    const replacement = rules.reduce((acc: string, rule) => {
                        if (acc.match(rule.regex)) {
                            event.preventDefault();
                            event.stopPropagation();
                            loggEvent('Autocomplete', 'Textarea', {
                                type: acc.toLowerCase()
                            });
                            if (rule.type === 'internal') {
                                settFeilmelding(undefined);
                                return rule.replacement();
                            }
                            if (standardtekster.data) {
                                const tekst: Tekst = standardtekster.data[rule.externalId];
                                if (tekst === undefined) {
                                    settFeilmelding(`Ukjent tekst. Kontakt IT: ${rule.externalId}`);
                                    return `${acc} `;
                                }
                                const locale = rule.locale || Locale.nb_NO;
                                const innhold = tekst.innhold[locale];
                                if (innhold === undefined) {
                                    settFeilmelding(`Fant ikke tekst. Kontakt IT: ${rule.externalId}@${rule.locale}`);
                                    return `${acc} `;
                                }

                                rapporterBruk(tekst);
                                return innhold;
                            }
                            settFeilmelding('Tekster ikke lastet enda. Kontakt IT om problemet vedvarer. ');
                            return `${acc} `;
                        }
                        return acc;
                    }, word);

                    const fullfortTekst = autofullforData ? autoFullfor(autofullforData, replacement) : replacement;

                    event.currentTarget.value = [value.substring(0, start), fullfortTekst, value.substring(end)].join(
                        ''
                    );

                    event.currentTarget.selectionEnd = cursorPosition + (fullfortTekst.length - word.length);

                    onChange?.(asChangeEvent(event));
                }
            }
        },
        [autofullforData, onChange, standardtekster]
    );

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    return (
        <>
            <Textarea
                ref={textAreaRef}
                onKeyDown={onKeyDown}
                description={
                    <VStack gap="2">
                        {description}
                        <HStack gap="1">
                            <AutoTekstTips toggleModal={setOpenAutoFullforModal} open={openAutoFullforModal} />
                            <StandardTekstModal
                                submitTekst={(standardTekst) => settInnStandardTekst(standardTekst, textAreaRef)}
                            />
                        </HStack>
                    </VStack>
                }
                onChange={onChange}
                {...rest}
            />
            {feilmelding && (
                <Alert variant="error" inline size="small">
                    {feilmelding}
                </Alert>
            )}
        </>
    );
}

export default AutocompleteTextarea;
