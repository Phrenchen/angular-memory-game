import { CardSelectedEvent } from 'src/app/model/CardSelectedEvent';

/**
 * static service class.
 * - sorts 
 *  - CardSelectedEvents
 */
export class SortHelper {
    public static sortChoices(choices: CardSelectedEvent[]): CardSelectedEvent[] {
        return choices.sort((a, b) => {
            if(a.occuredAt > b.occuredAt) {
                return 1;
            }
            if(a.occuredAt < b.occuredAt) {
                return -1;
            }
            return 0;
        });
    }
}
