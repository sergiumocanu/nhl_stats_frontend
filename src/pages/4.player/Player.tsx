import AppTable from "@/components/Table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { featuredStats, last5Games } from "./ColumDefs"

const Player = () => {

  const [chosenTeam, setChosenTeam] = useState<any>()
  const [chosenPlayer, setChosenPlayer] = useState<any>()

  const TeamPicker = () => {
    const [teams, setTeams] = useState<any>()
    useEffect(() => {
      fetch("https://nhl-stats-backend.onrender.com/team")
      .then(res => res.json())
      .then(data => setTeams(data))
    }, [])
  
    return(
      <div>
        <Select value={chosenTeam} onValueChange={setChosenTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Team" />
          </SelectTrigger>
          <SelectContent>
            {teams?.team_names.map((team_name: any, i: number) => (
              <SelectItem key={i} value={team_name.value}>{team_name.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  const PlayerPicker = () => {
    const [players, setPlayers] = useState<any>()

    useEffect(() => {
      fetch(`https://nhl-stats-backend.onrender.com/all_team_players?team=${chosenTeam}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data)
      })
    }, [chosenTeam])

    return(
      <div>
        <Select value={chosenPlayer} onValueChange={setChosenPlayer}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player"/>
          </SelectTrigger>
          <SelectContent>
            {players?.players.map((player: any) => (
              <SelectItem value={player.id}>{player.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )

  }

  const PlayerInfo = () => {
    const [playerInfo, setPlayerInfo] = useState<any>()

    useEffect(() => {
      fetch(`https://nhl-stats-backend.onrender.com/player_info?player=${chosenPlayer}`)
      .then(res => res.json())
      .then(data => {
        setPlayerInfo(data)
        console.log(data)
      })
    }, [chosenPlayer])

    return(
      <div>
        {typeof(playerInfo) === "undefined" ? (
          <p>Choose a player from above</p>
        ) : (
          <div className="flex">
          <div className="w-1/3 pt-3">
          <Card>
            <CardHeader>
              <CardTitle>{playerInfo.name}</CardTitle>
              <CardDescription className="flex justify-center">#{playerInfo.number} | {playerInfo.position} | <img width="35" src={playerInfo.teamLogo}/></CardDescription>
            </CardHeader>
            <CardContent>
            <img src={playerInfo.headshot}/>
            <p><b>Height: </b>{playerInfo.height}</p>
            <p><b>Weight: </b>{playerInfo.weight} lbs</p>
            <p><b>Born:</b> {playerInfo.age}</p>
            <p><b>Birthplace:</b> {playerInfo.birthplace}</p>
            <p><b>Draft:</b> {playerInfo.draft}</p>
            </CardContent>
          </Card>
          </div>
          <div className="w-2/3 pt-3">
            <h1>{playerInfo.featuredStatsSeason}</h1>
            <AppTable columns={featuredStats} data={playerInfo.featuredStatsThisSeason}/>
            <h1>Career</h1>
            <AppTable columns={featuredStats} data={playerInfo.featuredStatsCareer}/>
            <h1>Last 5 Games</h1>
            <AppTable columns={last5Games} data={playerInfo?.last5Games}/>
          </div>
          <div>
          </div>
          </div>
        )}
      </div>
    )

  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <TeamPicker/>
        <PlayerPicker/>
      </div>
      <PlayerInfo/>
    </div>
  )
}

export default Player