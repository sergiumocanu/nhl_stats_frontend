import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import AppTable from "@/components/Table"
import { goalieStats, skaterRoster, skaterStats } from "./ColumnDefs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      fetch(`https://nhl-stats-backend.onrender.com/team_seasons?team=${team}`)
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
      fetch(`https://nhl-stats-backend.onrender.com/team_roster?team=${team}&season=${teamSeason}`)
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
  
  const TeamStats = () => {
    const [ stats, setStats ] = useState<any>([]);
    useEffect(() => {
      console.log("inside teamroster useeffect ", team)
      fetch(`https://nhl-stats-backend.onrender.com/team_stats?team=${team}`)
      .then(res => res.json())
      .then(
          data => {
              setStats(data)
              console.log(data)
          }
      )
  }, [team])

  const skaterColumns = skaterStats;
  const goalieColumns = goalieStats;

  return(
    <div>
        {typeof(stats.skaters) === "undefined" ? (
            <p>Choose a team from above</p>
        ) : (
            <>
            <h2 className="text-left text-xl">Skaters</h2>
            <AppTable data={stats.skaters} columns={skaterColumns}/>
            <h2 className="text-left text-xl">Goalies</h2>
            <AppTable data={stats.goalies} columns={goalieColumns}/>
            </>
            
        )}
      </div>
    )

  }

  return (
    <div>
      <TeamPicker/>
      <Tabs defaultValue="roster">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="roster">
          <TeamRoster/>
        </TabsContent>
        <TabsContent value="stats">
          <TeamStats/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Team