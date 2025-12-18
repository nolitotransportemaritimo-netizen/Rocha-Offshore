
export enum RotationType {
  SEVEN_SEVEN = '7/7',
  FOURTEEN_FOURTEEN = '14/14',
  TWENTY_EIGHT_TWENTY_EIGHT = '28/28'
}

export enum MaritimeRank {
  CAPTAIN = 'Captain',
  CHIEF_OFFICER = 'Chief Officer',
  SECOND_OFFICER = 'Second Officer',
  CHIEF_ENGINEER = 'Chief Engineer',
  SECOND_ENGINEER = 'Second Engineer',
  DECKHAND = 'Deckhand',
  STEWARDESS = 'Stewardess',
  BOSUN = 'Bosun'
}

export interface UserProfile {
  name: string;
  email: string;
  rank: MaritimeRank;
  certifications: string[];
  totalSeaTimeMonths: number;
  vesselTypes: string[];
  bio: string;
  availabilityDate: string;
}

export interface JobVacancy {
  id: string;
  companyName: string;
  title: string;
  vesselType: string;
  rotation: RotationType;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface ScheduleEvent {
  id: string;
  date: string;
  type: 'ON' | 'OFF';
}
