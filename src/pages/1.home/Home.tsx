import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

const Home = () => {

    const PlayerHighlights = () => {
        const [players, setPlayers] = useState<any>()

        useEffect(() => {
        })
    }

    const [data, setData] = useState<any>([{}])

    useEffect(() => {
        fetch("https://nhl-stats-backend.onrender.com/scores")
        .then(res => res.json())
        .then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

  return (
    <div>
        <div>
            <h1 className="text-3xl">{"Today's Games " + data.date + " There are " + data.games?.length + " games"}</h1>
        </div>
        <div className="grid grid-cols-3 gap-12">
            {data.games?.map((game: any, i: number) => (
                <Card key={i} className="flex flex-col justify-between"> {/* add key in here based on the game id */}
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <img src={game.away_team.logo} className="h-20 w-20"/>
                            <Separator orientation="vertical"/>
                            <img src={game.home_team.logo} className="h-20 w-20"/>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-xl">{game.away_team.abbrev} - {game.home_team.abbrev}</p>
                            {(game.game_state === "FUT" || game.game_state === "PRE") &&
                            <p>{game.away_team.record} : {game.home_team.record}</p>
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {(game.game_state === "FUT" || game.game_state === "PRE") &&
                        <div>
                            <Badge>{game.start_time}</Badge>
                            <h1>Team Leaders</h1>
                            <Carousel>
                                <CarouselContent>
                                    {game.team_leaders.map((player: any, i:number) => (
                                        <CarouselItem key={i} className="flex pt-2 justify-center">
                                            <Card>
                                                <CardContent>
                                                    <Avatar>
                                                        <AvatarImage src={player.headshot}/>
                                                    </Avatar>
                                                    <p>{player.name.default}: {player.value} {player.category}</p>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2"/>
                                <CarouselNext className="right-2"/>
                            </Carousel>
                        </div>}
                        {game.game_state === "LIVE" &&
                        <div>
                            <div>
                                <p>Period: {game.period.number} {game.clock.timeRemaining}</p>
                                <Badge variant="destructive">{game.game_state}</Badge>
                                <p className="text-xl">{game.away_team.score} - {game.home_team.score}</p>
                                <p>SOG: {game.away_team.sog} - {game.home_team.sog}</p>
                            </div>
                            <div>
                                {game.goals.length > 0 &&
                                <Carousel>
                                <CarouselContent>
                                    {game.goals.map((goal: any) => (
                                        <CarouselItem>
                                            <Card>
                                                <CardContent>
                                                    <div className="flex justify-center">
                                                        <Avatar>
                                                            <AvatarImage src={goal.mugshot}/>
                                                        </Avatar>
                                                        <p className="text-sm">({goal.teamAbbrev}) <b>{goal.name.default} ({goal.goalsToDate})</b> P:{goal.period} {goal.timeInPeriod}</p>
                                                    </div>
                                                    <div>{goal.assists.map((assist: any) => 
                                                        <p className="text-xs">{assist.name.default} ({assist.assistsToDate})</p>
                                                    )}</div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-1"/>
                                <CarouselNext className="right-1"/>
                                </Carousel>
                                }
                            </div>
                        </div>}
                        {game.game_state === "OFF" && 
                        <div>
                            <div>
                                {game.period.periodType === "OT" && 
                                <Badge variant="secondary">FINAL/OT</Badge>}
                                {game.period.periodType === "REG" && 
                                <Badge variant="secondary">FINAL</Badge>}
                                <p className="text-xl">{game.away_team.score} - {game.home_team.score}</p>
                                <p>SOG: {game.away_team.sog} - {game.home_team.sog}</p>
                            </div>
                            <div>
                                {game.goals.length > 0 &&
                                <Carousel>
                                <CarouselContent>
                                    {game.goals.map((goal: any) => (
                                        <CarouselItem>
                                            <Card>
                                                <CardContent>
                                                    <div className="flex justify-center">
                                                        <Avatar>
                                                            <AvatarImage src={goal.mugshot}/>
                                                        </Avatar>
                                                        <p className="text-sm">({goal.teamAbbrev}) <b>{goal.name.default} ({goal.goalsToDate})</b> P:{goal.period} {goal.timeInPeriod}</p>
                                                    </div>
                                                    <div>{goal.assists.map((assist: any) => 
                                                        <p className="text-xs">{assist.name.default} ({assist.assistsToDate})</p>
                                                    )}</div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-1"/>
                                <CarouselNext className="right-1"/>
                                </Carousel>
                                }
                            </div>
                        </div>
                        }
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  )

}

export default Home