import { StatusAbbreviations } from '../../src/api/statuses/enums/status-abbreviations.enum';
import { StatusNames } from '../../src/api/statuses/enums/status-names.enum';
import { StatusTypes } from '../../src/api/statuses/enums/status-types.enum';

export const mockStatuses = [
  {
    id: 1,
    name: StatusNames.GEN_ACTIVE_STATUS,
    abbreviation: StatusAbbreviations.GEN_ACTIVE_STATUS,
    type: StatusTypes.GENERAL_STATUSES,
  },
  {
    id: 2,
    name: StatusNames.GEN_INACTIVE_STATUS,
    abbreviation: StatusAbbreviations.GEN_INACTIVE_STATUS,
    type: StatusTypes.GENERAL_STATUSES,
  },
];
