import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

const TeamPicker = () => {

  const [teams, setTeams] = useState<any>()

  useEffect(() => {
    fetch("/api/team")
    .then(res => res.json())
    .then(data => setTeams(data))
  }, [])

  return(
    <div>
      <Select>
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


const Player = () => {
  return (
    <div>
      <TeamPicker/>
    </div>
  )
}

export default Player