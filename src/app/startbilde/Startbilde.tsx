import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';
import PersonSokInput from './PersonSokInput';
import StartBildeLayout from './StartBildeLayout';

function Startbilde() {
    return (
        <StartBildeLayout>
            <PersonSokInput />
            <StartbildeInnstillinger />
        </StartBildeLayout>
    );
}

export default Startbilde;
