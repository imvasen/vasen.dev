export const directusUrl = process.env.DIRECTUS_URL || '';

const defaultTTL = 60 * 60 * 24; // 24 hours

function getValidTTL(value: string | undefined): number {
  if (!value) {
    return defaultTTL;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return defaultTTL;
  }

  return parsed;
}

export const cacheTTL = getValidTTL(process.env.CACHE_TTL);
