import Card from 'src/components/Card';
import { PersonlinjeDetails } from 'src/components/PersonLinje/Details';

function OversiktNy() {
    return (
            <Card className="overflow-scroll">
                <PersonlinjeDetails />
            </Card>
    );
}

export default OversiktNy;
