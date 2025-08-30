import { z } from "zod";

const nameSchema = z.object({
  default: z.string(),
  cs: z.string().optional(),
  fi: z.string().optional(),
  sk: z.string().optional(),
});

const assistSchema = z.object({
  playerId: z.number(),
  assistsToDate: z.number(),
  name: nameSchema,
});

const goalSchema = z.object({
  assists: z.array(assistSchema),
  awayScore: z.number(),
  discreteClip: z.number(),
  discreteClipFr: z.number(),
  firstName: nameSchema,
  lastName: nameSchema,
  goalModifier: z.string(),
  goalsToDate: z.number().optional(),
  highlightClip: z.number(),
  highlightClipFr: z.number(),
  highlightClipSharingUrl: z.string().url(),
  highlightClipSharingUrlFr: z.string().url(),
  homeScore: z.number(),
  mugshot: z.string().url(),
  name: nameSchema,
  period: z.number(),
  periodDescriptor: z.object({
    maxRegulationPeriods: z.number(),
    number: z.number(),
    periodType: z.string(),
  }),
  playerId: z.number(),
  strength: z.string(),
  teamAbbrev: z.string(),
  timeInPeriod: z.string(),
});

const teamSchema = z.object({
  abbrev: z.string(),
  id: z.number(),
  logo: z.string().url(),
  //   name: z.object({
  //     default: z.string(),
  //   }),
  score: z.number().optional(),
  //   sog: z.number(),
});

const clockSchema = z.object({
  inIntermission: z.boolean(),
  running: z.boolean(),
  secondsRemaining: z.number(),
  timeRemaining: z.string(),
});

const TvBroadcastSchema = z.object({
  countryCode: z.string(),
  id: z.number(),
  market: z.string(),
  network: z.string(),
  sequenceNumber: z.number(),
});

const gameSchema = z.object({
  id: z.number(),
  awayTeam: teamSchema,
  homeTeam: teamSchema,
  clock: clockSchema.optional(),
  //   condensedGame: z.string(),
  //   condensedGameFr: z.string(),
  //   easternUTCOffset: z.string(),
  //   gameCenterLink: z.string(),
  //   gameDate: z.string(), // You could use z.coerce.date() if desired
  //   gameOutcome: z.object({
  //     lastPeriodType: z.string(),
  //   }),
  //   gameScheduleState: z.string(),
  gameState: z.string(),
  //   gameType: z.number(),
  //   goals: z.array(goalSchema),
  //   neutralSite: z.boolean(),
  //   period: z.number(),
  //   periodDescriptor: z.object({
  //     maxRegulationPeriods: z.number(),
  //     number: z.number(),
  //     periodType: z.string(),
  //   }),
  //   season: z.number(),
  //   startTimeUTC: z.string(),
  //   threeMinRecap: z.string(),
  //   threeMinRecapFr: z.string(),
  //   tvBroadcasts: z.array(TvBroadcastSchema),
  //   venue: z.object({
  //     default: z.string(),
  //   }),
  //   venueTimezone: z.string(),
  //   venueUTCOffset: z.string(),
});

const gameWeek = z.object({
  date: z.string().date(),
  dayAbbrev: z.string().length(3),
  numberOfGames: z.number().int().nonnegative(),
});

export const todaysScoresSchema = z.object({
  currentDate: z.string().date(),
  nextDate: z.string().date(),
  prevDate: z.string().date(),
  games: z.array(gameSchema),
  gameWeek: z.array(gameWeek),
});
