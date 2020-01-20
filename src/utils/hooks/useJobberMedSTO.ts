import { usePostResource } from '../../rest/consumer/usePostResource';
import { isNotStartedPosting } from '../../rest/utils/postResource';

export function useJobberMedSTO() {
    const plukkNyeOppgaver = usePostResource(resources => resources.plukkNyeOppgaver);
    return !isNotStartedPosting(plukkNyeOppgaver);
}
