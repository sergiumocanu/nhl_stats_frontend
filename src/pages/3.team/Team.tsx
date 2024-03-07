import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type } from "os"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import AppTable from "@/components/Table"

const Team = () => {
  
  const [team, setTeam] = useState("")
  var teamChosen = false
  if (typeof team.team_roster !== "undefined") {
    console.log(team)
    teamChosen = true
  }

  const TeamPicker = () => {
    const [data, setData] = useState([{}])
    console.log(team)

    useEffect(() => {
        fetch("/api/team")
        .then(res => res.json())
        .then(
            data => {
                setData(data)
            }
        )
    }, [])

    return (
      <div>
      <Select value={team} onValueChange={setTeam}>
        <SelectTrigger>
          <SelectValue placeholder="Select a Team" />
        </SelectTrigger>
        <SelectContent>
          {data.team_names?.map(team_name => (
            <SelectItem value={team_name.value}>{team_name.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
    )
  }
  
  const TeamRoster = () => {

    const [ roster, setRoster ] = useState([]);
    useEffect(() => {
      console.log("inside teamroster useeffect ", team)
      fetch(`/api/team_roster?team=${team}`)
      .then(res => res.json())
      .then(
          data => {
              setRoster(data)
              console.log(data)
          }
      )
  }, [team])

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

    const columns = [
      {
          header: "ID",
          accessorKey: "id"
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

    return (
      <div>
        {typeof(roster.team_roster) === "undefined" ? (
            <p>...</p>
        ) : (
            <>
            <h1>Viewing {roster.team} roster </h1>
            <AppTable data={roster.team_roster} columns={columns}/>
            </>
            
        )}
      </div>
    )
  }
  

  return (
    <div>
      <TeamPicker/>
      <TeamRoster/>
    </div>
  )
}

export default Team