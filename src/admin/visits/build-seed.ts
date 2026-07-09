import type { ParishVisitRecord } from '../../types'

export function buildParishSecretaryVisitsSeed(): ParishVisitRecord[] {
  return [
    {
      id: 'secretariat-weekdays',
      name: 'Secrétariat paroissial',
      day: 'Lundi – Vendredi',
      timeRange: '8h00 – 17h00',
      location: 'Salle paroissiale — Quartier Salongo-Sud',
      phone: '081 664 4420',
      order: 10,
    },
    {
      id: 'secretariat-saturday',
      name: 'Secrétariat paroissial',
      day: 'Samedi',
      timeRange: '8h00 – 12h00',
      location: 'Salle paroissiale — Quartier Salongo-Sud',
      phone: '081 664 4420',
      order: 20,
    },
  ]
}

export function buildParishCurateVisitsSeed(): ParishVisitRecord[] {
  return [
    {
      id: 'curate-tuesday',
      name: 'Père Curé',
      day: 'Mardi',
      timeRange: '15h00 – 17h00',
      location: 'Presbytère — Paroisse de la Résurrection',
      phone: '081 664 4420',
      order: 10,
    },
    {
      id: 'curate-thursday',
      name: 'Père Curé',
      day: 'Jeudi',
      timeRange: '15h00 – 17h00',
      location: 'Presbytère — Paroisse de la Résurrection',
      phone: '081 664 4420',
      order: 20,
    },
  ]
}
