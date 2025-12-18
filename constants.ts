
import { RotationType, MaritimeRank, JobVacancy } from './types';

export const VESSEL_TYPES = [
  'Oil Tanker',
  'LNG Carrier',
  'Bulk Carrier',
  'Container Ship',
  'Cruise Ship',
  'Superyacht',
  'Offshore Supply',
  'Tug Boat'
];

export const COMMON_CERTIFICATIONS = [
  'STCW Basic Safety Training',
  'GMDSS Radio Operator',
  'Medical First Aid',
  'Advanced Fire Fighting',
  'Fast Rescue Boat',
  'Security Awareness'
];

export const MOCK_JOBS: JobVacancy[] = [
  {
    id: '1',
    companyName: 'Oceanic Logistics Co.',
    title: 'Chief Engineer',
    vesselType: 'Container Ship',
    rotation: RotationType.TWENTY_EIGHT_TWENTY_EIGHT,
    location: 'Global Routes',
    salary: '$12,000 - $15,000 / month',
    description: 'Seeking an experienced Chief Engineer for our new fleet of ultra-large container vessels.',
    requirements: ['III/2 COC', 'Advanced Tanker Training', '10+ years experience'],
    postedDate: '2023-10-25'
  },
  {
    id: '2',
    companyName: 'Azure Yachts',
    title: 'Chief Officer',
    vesselType: 'Superyacht',
    rotation: RotationType.FOURTEEN_FOURTEEN,
    location: 'Mediterranean',
    salary: '€8,000 / month',
    description: 'Prestigious 80m Superyacht looking for a detail-oriented Chief Officer for the upcoming season.',
    requirements: ['OOW 3000 GT', 'PWC Instructor', 'Excellent guest service skills'],
    postedDate: '2023-10-27'
  },
  {
    id: '3',
    companyName: 'Horizon Energy',
    title: 'Second Officer',
    vesselType: 'LNG Carrier',
    rotation: RotationType.SEVEN_SEVEN,
    location: 'North Sea',
    salary: '£6,500 / month',
    description: 'Dynamic role in offshore energy sector with competitive benefits and stable rotation.',
    requirements: ['II/1 COC', 'DP Induction', 'GMDSS General Certificate'],
    postedDate: '2023-10-28'
  }
];
