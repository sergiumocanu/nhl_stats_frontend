import { z } from "zod";

const languageSchema = z.object({
  default: z.string(),
  cs: z.string().optional(),
  fi: z.string().optional(),
  fr: z.string().optional(),
  sk: z.string().optional(),
  sv: z.string().optional(),
});

const playerSchema = z.object({
  birthCity: languageSchema.optional(),
  birthCountry: z.string(),
  birthDate: z.string().date(),
  birthStateProvince: languageSchema.optional(),
  firstName: languageSchema,
  headshot: z.string().url(),
  heightInCentimeters: z.number().positive().int(),
  heightInInches: z.number().positive().int(),
  id: z.number().positive().int(),
  lastName: languageSchema,
  positionCode: z.string().length(1),
  shootsCatches: z.enum(["R", "L"]),
  sweaterNumber: z.number().positive().int().optional(),
  weightInKilograms: z.number().positive().int(),
  weightInPounds: z.number().positive().int(),
});

export const teamRosterSchema = z.object({
  team: z.string().length(3, "Team abbreviation must be 3 characters long"),
  team_roster: z.object({
    defensemen: z.array(playerSchema),
    forwards: z.array(playerSchema),
    goalies: z.array(playerSchema),
  }),
});

const skaterStatsSchema = z.object({
  assists: z.number().int().nonnegative(),
  avgShiftsPerGame: z.number(),
  avgTimeOnIcePerGame: z.number(),
  faceoffWinPctg: z.number().min(0).max(1),
  firstName: languageSchema,
  gameWinningGoals: z.number().int().nonnegative(),
  gamesPlayed: z.number().int().nonnegative(),
  goals: z.number().int().nonnegative(),
  headshot: z.string().url(),
  lastName: languageSchema,
  overtimeGoals: z.number().int().nonnegative(),
  penaltyMinutes: z.number().int().nonnegative(),
  playerId: z.number().int().nonnegative(),
  plusMinus: z.number().int(),
  points: z.number().int().nonnegative(),
  positionCode: z.string().length(1),
  powerPlayGoals: z.number().int().nonnegative(),
  shootingPctg: z.number().min(0).max(1),
  shorthandedGoals: z.number().int().nonnegative(),
  shots: z.number().int().nonnegative(),
});

const goalieStatsSchema = z.object({
  assists: z.number().int().nonnegative(),
  firstName: languageSchema,
  gamesPlayed: z.number().int().nonnegative(),
  gamesStarted: z.number().int().nonnegative(),
  goals: z.number().int().nonnegative(),
  goalsAgainst: z.number().int().nonnegative(),
  goalsAgainstAverage: z.number().nonnegative(),
  headshot: z.string().url(),
  lastName: languageSchema,
  losses: z.number().int().nonnegative(),
  overtimeLosses: z.number().int().nonnegative(),
  penaltyMinutes: z.number().int().nonnegative(),
  playerId: z.number().int().nonnegative(),
  points: z.number().int().nonnegative(),
  savePercentage: z.number().min(0).max(1),
  saves: z.number().int().nonnegative(),
  shotsAgainst: z.number().int().nonnegative(),
  shutouts: z.number().int().nonnegative(),
  timeOnIce: z.number().int().nonnegative(),
  wins: z.number().int().nonnegative(),
});

export const teamStatsSchema = z.object({
  team: z.string().length(3, "Team abbreviation must be 3 characters long"),
  team_stats: z.object({
    gameType: z.number().positive().int(),
    season: z
      .string()
      .length(8, "Season must be 8 characters long ex: 20242025"),
    skaters: z.array(skaterStatsSchema),
    goalies: z.array(goalieStatsSchema),
  }),
});

export const teamProspectsSchema = z.object({
  team: z.string().length(3, "Team abbreviation must be 3 characters long"),
  team_prospects: z.object({
    defensemen: z.array(playerSchema),
    forwards: z.array(playerSchema),
    goalies: z.array(playerSchema),
  }),
});
