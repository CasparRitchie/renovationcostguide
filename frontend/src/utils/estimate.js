export const PROJECT_BASE_COSTS = {
  loft: 40000,
  extension: 60000,
  garden: 18000,
  kitchen: 12000,
};

export const SIZE_MULTIPLIER = {
  small: 0.8,
  medium: 1,
  large: 1.3,
};

export const FINISH_MULTIPLIER = {
  basic: 0.9,
  standard: 1,
  premium: 1.25,
};

export function calculateEstimate(projectType, size, finish) {
  const base = PROJECT_BASE_COSTS[projectType];
  const mid = base * SIZE_MULTIPLIER[size] * FINISH_MULTIPLIER[finish];
  const low = Math.round(mid * 0.85);
  const high = Math.round(mid * 1.15);

  return { low, high };
}
