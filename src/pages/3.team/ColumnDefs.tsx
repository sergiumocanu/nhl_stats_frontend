import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Roster = {
    id: number,
    firstName: string,
    lastName: string,
    position: string,
    shoots: "L" | "R",
    weight: number,
    height: number,
    birthDate: string,
    birthCity: string,
    birthCountry: string
  }

export const skaterRoster = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Face",
        accessorKey: "headshot",
        cell: (headshot: any) => (
            <div>
                <Avatar>
                    <AvatarImage src={headshot.getValue()}/>
                </Avatar>
            </div>
        )
    },
    {
        header: "First Name",
        accessorKey: "firstName"
    },
    {
        header: "Last Name",
        accessorKey: "lastName"
    },
    {
        header: "#",
        accessorKey: "sweaterNumber"
    },
    {
        header: "Position",
        accessorKey: "position"
    },
    {
        header: "Shoots",
        accessorKey: "shoots"
    },
    {
        Header: "Weight",
        accessorKey: "weight"
    },
    {
        header: "Height",
        accessorKey: "height"
    },
    {
        header: "DOB",
        accessorKey: "birthDate"
    },
    {
        header: "Birth City",
        accessorKey: "birthCity"
    },
    {
        header: "Birch Country",
        accessorKey: "birthCountry"
    }
];

export const skaterStats = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Face",
        accessorKey: "headshot",
        cell: (headshot: any) => (
            <div>
                <Avatar>
                    <AvatarImage src={headshot.getValue()}/>
                </Avatar>
            </div>
        )
    },
    {
        header: "First",
        accessorKey: "firstName"
    },
    {
        header: "Last",
        accessorKey: "lastName"
    },
    {
        header: "Position",
        accessorKey: "position"
    },
    {
        header: "Games Played",
        accessorKey: "gamesPlayed"
    },
    {
        header: "Goals",
        accessorKey: "goals"
    },
    {
        header: "Assists",
        accessorKey: "assists"
    },
    {
        header: "Points",
        accessorKey: "points"
    },
    {
        header: "+/-",
        accessorKey: "plusMinus"
    },
    {
        header: "PIM",
        accessorKey: "pim"
    },
    {
        header: "PPG",
        accessorKey: "ppg"
    },
    {
        header: "SHG",
        accessorKey: "shg"
    },
    {
        header: "GWG",
        accessorKey: "gwg"
    },
    {
        header: "OTG",
        accessorKey: "otg"
    },
    {
        header: "shots",
        accessorKey: "shots"
    },
    {
        header: "Shot %",
        accessorKey: "shootingPctg"
    },
    {
        header: "Avg TOI",
        accessorKey: "avgtoipergame"
    },
    {
        header: "Avg Shifts",
        accessorKey: "avgShiftsPerGame"
    },
    {
        header: "FO %",
        accessorKey: "faceoffWinPctg"
    },
]

export const goalieStats = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Face",
        accessorKey: "headshot",
        cell: (headshot: any) => (
            <div>
                <Avatar>
                    <AvatarImage src={headshot.getValue()}/>
                </Avatar>
            </div>
        )
    },
    {
        header: "First",
        accessorKey: "firstName"
    },
    {
        header: "Last",
        accessorKey: "lastName"
    },
    {
        header: "Games Played",
        accessorKey: "gamesPlayed"
    },
    {
        header: "Games Started",
        accessorKey: "gamesStarted"
    },
    {
        header: "Wins",
        accessorKey: "wins"
    },
    {
        header: "Losses",
        accessorKey: "losses"
    },
    {
        header: "Ties",
        accessorKey: "ties"
    },
    {
        header: "OT Losses",
        accessorKey: "overtimeLosses"
    },
    {
        header: "GAA",
        accessorKey: "gaa"
    },
    {
        header: "Save %",
        accessorKey: "savepctg"
    },
    {
        header: "Shots Against",
        accessorKey: "shotsAgainst"
    },
    {
        header: "Saves",
        accessorKey: "saves"
    },
    {
        header: "Goals Against",
        accessorKey: "goalsAgainst"
    },
    {
        header: "Shutouts",
        accessorKey: "shutouts"
    },
    {
        header: "Goals",
        accessorKey: "goals"
    },
    {
        header: "Assists",
        accessorKey: "assists"
    },
    {
        header: "Points",
        accessorKey: "points"
    },
    {
        header: "PIM",
        accessorKey: "pim"
    },
    {
        header: "TOI",
        accessorKey: "toi"
    },
]