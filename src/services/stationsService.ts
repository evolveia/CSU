import { StationLocation } from '../types';

export interface ProvinceData {
  name: string;
  code: string;
  territories: {
    name: string;
    communes: string[];
  }[];
}

export const DRC_PROVINCES: ProvinceData[] = [
  {
    name: 'Kinshasa',
    code: 'KIN',
    territories: [
      {
        name: 'Kinshasa Urbain',
        communes: [
          'Gombe',
          'Bandalungwa',
          'Barumbu',
          'Bumbu',
          'Kalamu',
          'Kasa-Vubu',
          'Kimbanseke',
          'Kisenso',
          'Kintambo',
          'Lemba',
          'Limete',
          'Lingwala',
          'Makala',
          'Maluku',
          'Masina',
          'Matete',
          'Mont-Ngafula',
          'Ndjili',
          'Ngaba',
          'Ngaliema',
          'Ngiri-Ngiri',
          'Nsele',
          'Selembao',
        ],
      },
    ],
  },
  {
    name: 'Haut-Katanga',
    code: 'HK',
    territories: [
      {
        name: 'Lubumbashi',
        communes: ['Kamalondo', 'Kampemba', 'Katuba', 'Kenya', 'Lubumbashi', 'Ruashi'],
      },
      {
        name: 'Likasi',
        communes: ['Kikula', 'Panda', 'Shituru'],
      },
      {
        name: 'Kasenga',
        communes: ['Kasenga Centre', 'Kashobwe'],
      },
    ],
  },
  {
    name: 'Nord-Kivu',
    code: 'NK',
    territories: [
      {
        name: 'Goma',
        communes: ['Goma', 'Karisimbi'],
      },
      {
        name: 'Beni',
        communes: ['Beni Centre', 'Bungulu', 'Mulekera', 'Ruwenzori'],
      },
      {
        name: 'Butembo',
        communes: ['Bulengera', 'Kimemi', 'Mususa', 'Vulcain'],
      },
    ],
  },
  {
    name: 'Sud-Kivu',
    code: 'SK',
    territories: [
      {
        name: 'Bukavu',
        communes: ['Bagira', 'Ibanda', 'Kadutu'],
      },
      {
        name: 'Uvira',
        communes: ['Kalundu', 'Kavimvira', 'Mulongwe'],
      },
    ],
  },
  {
    name: 'Kongo-Central',
    code: 'KC',
    territories: [
      {
        name: 'Matadi',
        communes: ['Matadi', 'Mvuzi', 'Nzanza'],
      },
      {
        name: 'Boma',
        communes: ['Kabondo', 'Kalamu', 'Nzadi'],
      },
    ],
  },
  {
    name: 'Tshopo',
    code: 'TSH',
    territories: [
      {
        name: 'Kisangani',
        communes: ['Kabondo', 'Kisangani', 'Lubunga', 'Makiso', 'Mangobo', 'Tshopo'],
      },
    ],
  },
  {
    name: 'Lualaba',
    code: 'LUA',
    territories: [
      {
        name: 'Kolwezi',
        communes: ['Dilala', 'Manika'],
      },
    ],
  },
  {
    name: 'Kasai-Central',
    code: 'KAC',
    territories: [
      {
        name: 'Kananga',
        communes: ['Kananga', 'Kansele', 'Katoka', 'Lukonga', 'Nganza'],
      },
    ],
  },
  {
    name: 'Kasai-Oriental',
    code: 'KAO',
    territories: [
      {
        name: 'Mbuji-Mayi',
        communes: ['Bipemba', 'Dibindi', 'Diulu', 'Kanshi', 'Muya'],
      },
    ],
  },
  {
    name: 'Ituri',
    code: 'ITU',
    territories: [
      {
        name: 'Bunia',
        communes: ['Mbunya', 'Nyakasanza', 'Shari'],
      },
    ],
  },
  {
    name: 'Kwilu',
    code: 'KWI',
    territories: [
      {
        name: 'Bandundu',
        communes: ['Basoko', 'Disasi', 'Mayoyo'],
      },
      {
        name: 'Kikwit',
        communes: ['Lukemi', 'Lukolela', 'Nzinda'],
      },
    ],
  },
  {
    name: 'Équateur',
    code: 'EQU',
    territories: [
      {
        name: 'Mbandaka',
        communes: ['Mbandaka', 'Wangata'],
      },
    ],
  },
  {
    name: 'Maniema',
    code: 'MAN',
    territories: [
      {
        name: 'Kindu',
        communes: ['Alunguli', 'Kasuku', 'Mikelenge'],
      },
    ],
  },
  {
    name: 'Tanganyika',
    code: 'TAN',
    territories: [
      {
        name: 'Kalemie',
        communes: ['Kalemie', 'Lac'],
      },
    ],
  },
];

export const MOCK_STATIONS: StationLocation[] = [
  {
    id: 'st-kin-01',
    province: 'Kinshasa',
    territory: 'Kinshasa Urbain',
    commune: 'Gombe',
    name: 'Station Citoyenneté Centrale - Place Royale',
    address: 'Boulevard du 30 Juin, en face du Ministère de l’Intérieur',
    queueStatus: 'fluide',
    waitMinutes: 8,
    openHours: 'Lun–Sam : 07h30 – 17h30',
    isMobileUnit: false,
    coordinates: { lat: -4.3033, lng: 15.3085 },
  },
  {
    id: 'st-kin-02',
    province: 'Kinshasa',
    territory: 'Kinshasa Urbain',
    commune: 'Kalamu',
    name: 'Station Citoyenneté Matonge - Yolo',
    address: 'Rond-point Victoire, Maison Communale de Kalamu',
    queueStatus: 'modere',
    waitMinutes: 22,
    openHours: 'Lun–Sam : 07h30 – 18h00',
    isMobileUnit: false,
    coordinates: { lat: -4.3392, lng: 15.3195 },
  },
  {
    id: 'st-kin-03',
    province: 'Kinshasa',
    territory: 'Kinshasa Urbain',
    commune: 'Limete',
    name: 'Station Citoyenneté Échangeur',
    address: 'Sous l’Échangeur de Limete, 7ème Rue Résidentiel',
    queueStatus: 'fluide',
    waitMinutes: 12,
    openHours: 'Lun–Sam : 08h00 – 17h00',
    isMobileUnit: false,
    coordinates: { lat: -4.3571, lng: 15.3524 },
  },
  {
    id: 'st-kin-04',
    province: 'Kinshasa',
    territory: 'Kinshasa Urbain',
    commune: 'Ndjili',
    name: 'Station Citoyenneté Ndjili Quartier 7',
    address: 'Esplanade du Marché Municipal Sainte-Thérèse',
    queueStatus: 'charge',
    waitMinutes: 42,
    openHours: 'Lun–Sam : 07h00 – 18h00',
    isMobileUnit: false,
    coordinates: { lat: -4.4172, lng: 15.3789 },
  },
  {
    id: 'st-kin-mob',
    province: 'Kinshasa',
    territory: 'Kinshasa Urbain',
    commune: 'Maluku',
    name: 'Unité Mobile N° 04 - Fleuve & Rive Est',
    address: 'Marché aux Poissons de Kinkole (Stationnement Mobile)',
    queueStatus: 'fluide',
    waitMinutes: 5,
    openHours: 'Lun–Dim : 08h00 – 16h30',
    isMobileUnit: true,
    mobileNextStop: 'Demain : Village Menkao (Plateau des Bateke)',
    coordinates: { lat: -4.3211, lng: 15.5244 },
  },
  {
    id: 'st-lshi-01',
    province: 'Haut-Katanga',
    territory: 'Lubumbashi',
    commune: 'Lubumbashi',
    name: 'Station Citoyenneté Grand Karavia',
    address: 'Avenue Kasavubu, Centre Urbain Lubumbashi',
    queueStatus: 'fluide',
    waitMinutes: 10,
    openHours: 'Lun–Sam : 08h00 – 17h00',
    isMobileUnit: false,
    coordinates: { lat: -11.6608, lng: 27.4794 },
  },
  {
    id: 'st-goma-01',
    province: 'Nord-Kivu',
    territory: 'Goma',
    commune: 'Karisimbi',
    name: 'Station Citoyenneté Birere / Majengo',
    address: 'Avenue de la Paix, en face du Complexe Scolaire Mwanga',
    queueStatus: 'modere',
    waitMinutes: 25,
    openHours: 'Lun–Dim : 07h30 – 16h30',
    isMobileUnit: false,
    coordinates: { lat: -1.6741, lng: 29.2285 },
  },
  {
    id: 'st-matadi-01',
    province: 'Kongo-Central',
    territory: 'Matadi',
    commune: 'Matadi',
    name: 'Station Citoyenneté Portuaire de Matadi',
    address: 'Avenue Kinkanda, près du Gouvernorat Provincial',
    queueStatus: 'fluide',
    waitMinutes: 10,
    openHours: 'Lun–Sam : 08h00 – 17h00',
    isMobileUnit: false,
    coordinates: { lat: -5.8197, lng: 13.4566 },
  },
  {
    id: 'st-kis-01',
    province: 'Tshopo',
    territory: 'Kisangani',
    commune: 'Makiso',
    name: 'Station Citoyenneté des Martyrs Kisangani',
    address: 'Place des Martyrs, Avenue du Fleuve',
    queueStatus: 'modere',
    waitMinutes: 18,
    openHours: 'Lun–Sam : 07h30 – 17h00',
    isMobileUnit: false,
    coordinates: { lat: 0.5153, lng: 25.191 },
  },
  {
    id: 'st-mbuji-01',
    province: 'Kasai-Oriental',
    territory: 'Mbuji-Mayi',
    commune: 'Diulu',
    name: 'Station Citoyenneté Centrale Mbuji-Mayi',
    address: 'Avenue Inga, près de la Mairie',
    queueStatus: 'fluide',
    waitMinutes: 12,
    openHours: 'Lun–Sam : 08h00 – 16h30',
    isMobileUnit: false,
    coordinates: { lat: -6.136, lng: 23.5898 },
  },
  {
    id: 'st-kan-01',
    province: 'Kasai-Central',
    territory: 'Kananga',
    commune: 'Kananga',
    name: 'Station Citoyenneté Grand Kasaï Kananga',
    address: 'Boulevard Lumumba, Quartier Administratif',
    queueStatus: 'fluide',
    waitMinutes: 15,
    openHours: 'Lun–Sam : 08h00 – 17h00',
    isMobileUnit: false,
    coordinates: { lat: -5.8962, lng: 22.4166 },
  },
  {
    id: 'st-bukavu-01',
    province: 'Sud-Kivu',
    territory: 'Bukavu',
    commune: 'Ibanda',
    name: 'Station Citoyenneté Rive Lac Kivu',
    address: 'Avenue Patrice Lumumba, Maison Communale d’Ibanda',
    queueStatus: 'modere',
    waitMinutes: 20,
    openHours: 'Lun–Sam : 07h30 – 16h30',
    isMobileUnit: false,
    coordinates: { lat: -2.5085, lng: 28.8608 },
  },
];

export const stationsService = {
  getProvinces(): ProvinceData[] {
    return DRC_PROVINCES;
  },

  async searchStations(province?: string, territory?: string, commune?: string): Promise<StationLocation[]> {
    await new Promise((res) => setTimeout(res, 350));
    let filtered = MOCK_STATIONS;

    if (province && province !== 'all') {
      filtered = filtered.filter((s) => s.province.toLowerCase() === province.toLowerCase());
    }
    if (territory && territory !== 'all') {
      filtered = filtered.filter((s) => s.territory.toLowerCase() === territory.toLowerCase());
    }
    if (commune && commune !== 'all') {
      filtered = filtered.filter((s) => s.commune.toLowerCase() === commune.toLowerCase());
    }

    return filtered;
  },
};
