import { DEFAULT_SURVEY_RATING, LumiSurveyDock, type LumiSurveyTransport } from '@navikt/lumi-survey';
import { apiBaseUri, postConfig } from 'src/api/config';

const transport: LumiSurveyTransport = {
    async submit(submission) {
        await fetch(`${apiBaseUri}/lumi/feedback`, postConfig(submission.transportPayload));
    }
};

export const LumiFeedback = () => (
    <LumiSurveyDock
        surveyId="modiapersonoversikt-tilbakemelding"
        survey={DEFAULT_SURVEY_RATING}
        transport={transport}
        behavior={{ storageStrategy: 'localStorage' }}
    />
);
