import { Prisma, PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DamageType,
  SkillEffect,
  SkillSlot,
  TargetType,
} from '../../src/generated/prisma/enums.js';

type ChampionSkillSeed = {
  championKey: string;
  slot: SkillSlot;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  damageType: DamageType;
  targetType: TargetType;
  cooldown?: Prisma.InputJsonValue;
  cost?: Prisma.InputJsonValue;
  range?: Prisma.InputJsonValue;
  scaling?: Prisma.InputJsonValue;
  effects: SkillEffect[];
  tags: string[];
};

export async function seedChampionSkills(
  prisma: PrismaClient,
  patchId: string,
) {}
