import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import AppTable from "@/components/Table"
import { skaterRoster } from "./ColumnDefs"

const Team = () => {
  
  const [team, setTeam] = useState<any>("")
  const [teamSeason, setTeamSeason] = useState<any>("")
  var teamChosen = false
  if (typeof team.team_roster !== "undefined") {
    console.log(team)
    teamChosen = true
  }

  const SeasonPicker = () => {
    const [season, setSeason] = useState<any>()

    useEffect(() => {
      fetch(`api/team_seasons?team=${team}`)
      .then(res => res.json())
      .then(data => {
        setSeason(data)
        console.log(data)
      })
    }, [team])

    return(
      <div>
        <Select value={teamSeason} onValueChange={setTeamSeason}>
          <SelectTrigger>
            <SelectValue placeholder="Season"/>
          </SelectTrigger>
          <SelectContent>
            {season?.team_seasons?.map((season: any) => (
              <SelectItem value={season.value}>{season.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  const TeamPicker = () => {
    const [data, setData] = useState<any>([{}])
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
          {data.team_names?.map((team_name: any) => (
            <SelectItem value={team_name.value}>{team_name.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
    )
  }
  
  const TeamRoster = () => {

    const [ roster, setRoster ] = useState<any>([]);
    useEffect(() => {
      console.log("inside teamroster useeffect ", team)
      fetch(`/api/team_roster?team=${team}&season=${teamSeason}`)
      .then(res => res.json())
      .then(
          data => {
              setRoster(data)
              console.log(data)
          }
      )
  }, [team])

    const columns = skaterRoster;    

    return (
      <div>
        {typeof(roster.team_roster) === "undefined" ? (
            <p>Choose a team from above</p>
        ) : (
            <>
            <h1 className="text-3xl">Viewing {roster.team} roster </h1>
            <SeasonPicker/>
            <h2 className="text-left text-xl">Forwards</h2>
            <AppTable data={roster.team_roster.forwards} columns={columns}/>
            <h2 className="text-left text-xl">Defensemen</h2>
            <AppTable data={roster.team_roster.defensemen} columns={columns}/>
            <h2 className="text-left text-xl">Goalies</h2>
            <AppTable data={roster.team_roster.goalies} columns={columns}/>
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