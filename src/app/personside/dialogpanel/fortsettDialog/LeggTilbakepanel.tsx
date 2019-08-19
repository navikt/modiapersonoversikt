import * as React from 'react';
import { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { Radio, Textarea } from 'nav-frontend-skjema';
import { Kodeverk } from '../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import Temavelger from '../component/Temavelger';

interface Props {}

enum LeggTilbakeÅrsak {
    Innhabil = 'Innhabil',
    FeilTemagruppe = 'Feil temagruppe',
    AnnenÅrsak = 'Annen årsak'
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__hode {
        padding: 0.6rem;
    }
`;

const StyledFieldset = styled.fieldset`
    > *:not(:first-child) {
        margin-top: 0.3rem;
    }
`;

const Style = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin-top: 0.5rem;
    }
`;

function LeggTilbakepanel(props: Props) {
    const [årsak, setÅrsak] = useState<LeggTilbakeÅrsak | undefined>();
    const [tema, setTema] = useState<Kodeverk | undefined>();
    const [tekst, setTekst] = useState('');

    function ÅrsakRadio(props: { årsak: LeggTilbakeÅrsak }) {
        return (
            <Radio
                label={props.årsak}
                checked={props.årsak === årsak}
                onChange={() => setÅrsak(props.årsak)}
                name="årsak"
            />
        );
    }

    return (
        <StyledEkspanderbartpanel tittel="Legg tilbake" border={true} tittelProps="normaltekst">
            <Style>
                <StyledFieldset>
                    <legend className="sr-only">Velg årsak</legend>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.Innhabil} />
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.FeilTemagruppe} />
                    <UnmountClosed isOpened={årsak === LeggTilbakeÅrsak.FeilTemagruppe}>
                        <Temavelger setTema={t => setTema(t)} tema={tema} />
                    </UnmountClosed>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.AnnenÅrsak} />
                    <UnmountClosed isOpened={årsak === LeggTilbakeÅrsak.AnnenÅrsak}>
                        <Textarea
                            label="Årsak"
                            value={tekst}
                            onChange={e =>
                                setTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)
                            }
                        />
                    </UnmountClosed>
                </StyledFieldset>
                <Hovedknapp>Legg tilbake</Hovedknapp>
            </Style>
        </StyledEkspanderbartpanel>
    );
}

export default LeggTilbakepanel;
