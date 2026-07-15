import { ConfidenceLevel } from '../../../generated/prisma/enums.js';

export function calculateConfidence(score: number): ConfidenceLevel {
  if (score >= 75) {
    return ConfidenceLevel.HIGH;
  }

  if (score >= 55) {
    return ConfidenceLevel.MEDIUM;
  }

  return ConfidenceLevel.LOW;
}
