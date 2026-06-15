/**
 * Skill Icon Utilities
 *
 * Resolves skill names to inline SVG icon metadata.
 *
 * @param skillName - Display name of the skill
 * @returns Matching inline icon data or null when no icon exists
 */
import { skillIconMap, type InlineIcon } from '../data/inlineIcons.generated';

export type { InlineIcon };

export const getSkillIcon = (skillName: string): InlineIcon | null => {
  return skillIconMap[skillName] ?? skillIconMap[skillName.toLowerCase()] ?? null;
};
