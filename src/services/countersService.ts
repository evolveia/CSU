export interface CounterMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
}

export const countersService = {
  getCounters(): CounterMetric[] {
    return [
      {
        id: 'citizens',
        label: 'Citoyens recensés & certifiés',
        value: 14842910,
        suffix: '+',
        subtext: 'Bénéficiaires actifs dans le Registre National',
      },
      {
        id: 'provinces',
        label: 'Provinces couvertes',
        value: 26,
        suffix: ' / 26',
        subtext: 'Présence intégrale sur tout le territoire national',
      },
      {
        id: 'stations',
        label: 'Stations Citoyenneté actives',
        value: 842,
        suffix: ' centres',
        subtext: 'Guichets fixes communaux et unités mobiles solaires',
      },
      {
        id: 'payments',
        label: 'Paiements directs décaissés',
        value: 3219450,
        suffix: '+',
        subtext: 'Allocations versées sans intermédiaires via Mobile Money',
      },
    ];
  },
};
