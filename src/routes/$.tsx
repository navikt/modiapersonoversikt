import { createFileRoute } from '@tanstack/react-router';
import LegacyAppContainer from 'src/app/LegacyAppContainer';
import Routing from 'src/app/Routing';

function Splat() {
    return (
        <LegacyAppContainer>
            {
                //<Routing />
            }
        </LegacyAppContainer>
    );
}

export const Route = createFileRoute('/$')({
    component: Splat
});
