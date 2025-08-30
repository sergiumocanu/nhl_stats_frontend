import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";

export type LanguageCodes = {
  default: string;
  cs?: string;
  fi?: string;
  fr?: string;
  sk?: string;
  sv?: string;
};

type Player = {
  id: number;
  headshot: string;
  firstName: LanguageCodes;
  lastName: LanguageCodes;
  positionCode: string;
  sweaterNumber?: number;
  shootsCatches: "L" | "R";
  weightInPounds: number;
  weightInKilograms: number;
  heightInInches: number;
  heightInCentimeters: number;
  birthDate: string;
  birthCity: LanguageCodes;
  birthStateProvince?: LanguageCodes;
  birthCountry: string;
};

type Skater = {
  id: number;
  playerId: number;
  headshot: string;
  firstName: LanguageCodes;
  lastName: LanguageCodes;
  positionCode: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  penaltyMinutes: number;
  powerPlayGoals: number;
  shorthandedGoals: number;
  gameWinningGoals: number;
  overtimeGoals: number;
  shots: number;
  shootingPctg: number;
  avgTimeOnIcePerGame: number;
  avgShiftsPerGame: number;
  faceoffWinPctg: number;
};

type Goalie = {
  id: number;
  playerId: number;
  headshot: string;
  firstName: LanguageCodes;
  lastName: LanguageCodes;
  gamesPlayed: number;
  gamesStarted: number;
  wins: number;
  losses: number;
  overtimeLosses: number;
  goalsAgainstAverage: number;
  savePercentage: number;
  shotsAgainst: number;
  saves: number;
  goalsAgainst: number;
  shutouts: number;
  goals: number;
  assists: number;
  points: number;
  penaltyMinutes: number;
  timeOnIce: number;
};

export const skaterRoster: ColumnDef<Player>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Face",
    accessorKey: "headshot",
    cell: (headshot: any) => (
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src={headshot.getValue()} />
        </Avatar>
      </div>
    ),
    enableSorting: false,
  },
  {
    header: "First Name",
    accessorKey: "firstName.default",
  },
  {
    header: "Last Name",
    accessorKey: "lastName.default",
  },
  {
    header: "#",
    accessorKey: "sweaterNumber",
  },
  {
    header: "Position",
    accessorKey: "positionCode",
  },
  {
    header: "Shoots",
    accessorKey: "shootsCatches",
  },
  {
    header: "Weight",
    accessorKey: "weightInPounds",
  },
  {
    header: "Height",
    accessorKey: "heightInCentimeters",
  },
  {
    header: "Age",
    accessorKey: "birthDate",
    cell: ({ row }) => {
      const dob = new Date(row.getValue("birthDate"));
      return formatDistanceToNowStrict(dob, {
        unit: "year",
        roundingMethod: "floor",
        addSuffix: false,
      });
    },
  },
  {
    header: "Birth City",
    accessorKey: "birthCity.default",
  },
  {
    header: "Birth State/Province",
    accessorKey: "birthStateProvince.default",
    cell: ({ row }) => {
      const player = row.original;
      if (player.birthStateProvince) {
        return player.birthStateProvince.default;
      }
      return "-";
    },
  },
  {
    header: "Birth Country",
    accessorKey: "birthCountry",
  },
];

export const skaterStats: ColumnDef<Skater>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Face",
    accessorKey: "headshot",
    cell: (headshot: any) => (
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src={headshot.getValue()} />
        </Avatar>
      </div>
    ),
  },
  {
    header: "First",
    accessorKey: "firstName.default",
  },
  {
    header: "Last",
    accessorKey: "lastName.default",
  },
  {
    header: "Position",
    accessorKey: "positionCode",
  },
  {
    header: "Games Played",
    accessorKey: "gamesPlayed",
  },
  {
    header: "Goals",
    accessorKey: "goals",
  },
  {
    header: "Assists",
    accessorKey: "assists",
  },
  {
    header: "Points",
    accessorKey: "points",
  },
  {
    header: "+/-",
    accessorKey: "plusMinus",
  },
  {
    header: "PIM",
    accessorKey: "penaltyMinutes",
  },
  {
    header: "PPG",
    accessorKey: "powerPlayGoals",
  },
  {
    header: "SHG",
    accessorKey: "shorthandedGoals",
  },
  {
    header: "GWG",
    accessorKey: "gameWinningGoals",
  },
  {
    header: "OTG",
    accessorKey: "overtimeGoals",
  },
  {
    header: "Shots",
    accessorKey: "shots",
  },
  {
    header: "Shot %",
    accessorKey: "shootingPctg",
    cell: ({ row }) => {
      const shootingPctg = Number(row.getValue("shootingPctg"));
      return shootingPctg ? (shootingPctg * 100).toFixed(2) : "-";
    },
  },
  {
    header: "TOI/G",
    accessorKey: "avgTimeOnIcePerGame",
    cell: ({ row }) => {
      const toi = Number(row.getValue("avgTimeOnIcePerGame"));
      return toi ? `${Math.floor(toi / 60)}:${(toi % 60).toFixed(0)}` : "-";
    },
  },
  {
    header: "Shifts/G",
    accessorKey: "avgShiftsPerGame",
    cell: ({ row }) => {
      const shiftsPerGame = Number(row.getValue("avgShiftsPerGame"));
      return shiftsPerGame ? shiftsPerGame.toFixed(2) : "-";
    },
  },
  {
    header: "FO %",
    accessorKey: "faceoffWinPctg",
    cell: ({ row }) => {
      const faceoffWinPctg = Number(row.getValue("faceoffWinPctg"));
      return faceoffWinPctg ? (faceoffWinPctg * 100).toFixed(2) : "-";
    },
  },
];

export const goalieStats: ColumnDef<Goalie>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Face",
    accessorKey: "headshot",
    cell: (headshot: any) => (
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src={headshot.getValue()} />
        </Avatar>
      </div>
    ),
  },
  {
    header: "First",
    accessorKey: "firstName.default",
  },
  {
    header: "Last",
    accessorKey: "lastName.default",
  },
  {
    header: "Games Played",
    accessorKey: "gamesPlayed",
  },
  {
    header: "Games Started",
    accessorKey: "gamesStarted",
  },
  {
    header: "Wins",
    accessorKey: "wins",
  },
  {
    header: "Losses",
    accessorKey: "losses",
  },
  {
    header: "OT Losses",
    accessorKey: "overtimeLosses",
  },
  {
    header: "GAA",
    accessorKey: "goalsAgainstAverage",
    cell: ({ row }) => {
      const goalsAgainstAverage = Number(row.getValue("goalsAgainstAverage"));
      return goalsAgainstAverage ? goalsAgainstAverage.toFixed(2) : "-";
    },
  },
  {
    header: "Save %",
    accessorKey: "savePercentage",
    cell: ({ row }) => {
      const savePercentage = Number(row.getValue("savePercentage"));
      return savePercentage ? savePercentage.toFixed(3) : "-";
    },
  },
  {
    header: "Shots Against",
    accessorKey: "shotsAgainst",
  },
  {
    header: "Saves",
    accessorKey: "saves",
  },
  {
    header: "Goals Against",
    accessorKey: "goalsAgainst",
  },
  {
    header: "Shutouts",
    accessorKey: "shutouts",
  },
  {
    header: "Goals",
    accessorKey: "goals",
  },
  {
    header: "Assists",
    accessorKey: "assists",
  },
  {
    header: "Points",
    accessorKey: "points",
  },
  {
    header: "PIM",
    accessorKey: "penaltyMinutes",
  },
  {
    header: "TOI",
    accessorKey: "timeOnIce",
    cell: ({ row }) => {
      const timeOnIce = Number(row.getValue("timeOnIce"));
      return timeOnIce
        ? `${Math.floor(timeOnIce / 60)}:${(timeOnIce % 60).toFixed(0)}`
        : "-";
    },
  },
];
