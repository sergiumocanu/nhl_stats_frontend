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