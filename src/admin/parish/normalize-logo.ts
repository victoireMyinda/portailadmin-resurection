/** Valeurs par défaut — identité en-tête (à côté du logo). */
export const PARISH_LOGO_HEADER_DEFAULTS = {
  headerArchdiocese: 'Archidiocèse de Kinshasa',
  headerDeanery: 'Doyenné Elimo Santu',
  headerParish: 'PAROISSE DE LA RESURRECTION',
  headerLocation: 'Lemba/Salongo',
  archdioceseBannerTitle: 'Archidiocèse de Kinshasa',
} as const

export function normalizeParishLogoRecord(data: Record<string, unknown>): Record<string, unknown> {
  const str = (key: keyof typeof PARISH_LOGO_HEADER_DEFAULTS) => {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    return PARISH_LOGO_HEADER_DEFAULTS[key]
  }

  return {
    ...data,
    headerArchdiocese: str('headerArchdiocese'),
    headerDeanery: str('headerDeanery'),
    headerParish: str('headerParish'),
    headerLocation: str('headerLocation'),
    archdioceseBannerTitle: str('archdioceseBannerTitle'),
  }
}
