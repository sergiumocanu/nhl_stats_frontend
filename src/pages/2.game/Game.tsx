import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AppTable from "@/components/Table"
import { Separator } from "@radix-ui/react-select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

const Game = () => {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const gameDate = date?.toLocaleString("en-CA").slice(0, 10)
    const [boxscore, setBoxscore] = React.useState()

    const getButtonId = async (el) => {
        console.log(el.target.id)
        try {
            const game_id = el.target.id;
            const data = await (await fetch(`/api/game_details?game_id=${game_id}`)).json()
            setBoxscore(data)
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const GameTabs = () => {
        return (
            <Tabs defaultValue="play-by-play">
                <TabsList>
                    <TabsTrigger value="boxscore">Boxscore</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="play-by-play">Play-By-Play</TabsTrigger>
                </TabsList>
                <TabsContent value="boxscore">
                    <BoxScoreDisplay/>
                </TabsContent>
                <TabsContent value="summary">
                    <SummaryData/>
                </TabsContent>
                <TabsContent value="play-by-play">
                    <PlayByPlay/>
                </TabsContent>
            </Tabs>
        )
    }

    const GameDayPicker = () => {
        
        return (
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        )
    }
    
    const GamesByDate = () => {

        const [games, setGames] = useState();

        useEffect(() => {
            fetch(`/api/game?date=${gameDate}`)
            .then(response => response.json())
            .then(json => {
                setGames(json)
            })
        }, [])
        
        return(
                <Carousel className="pt-5">
                    <CarouselContent className="-ml-1">
                    {games?.games?.map(game => 
                        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <Card className="flex flex-col justify-between">
                                <CardHeader className="flex-row gap-4 items-center">
                                    <CardTitle>
                                        AWAY - HOME
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {game.label}
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"outline"} id={game.id} onClick={getButtonId}>Details</Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    )}
                    </CarouselContent>
                    <CarouselNext/>
                    <CarouselPrevious/>
                </Carousel>
                
        )
    }
    
    const BoxScoreDisplay = () => {

        const skaterColumns = [
            {
                header: "ID",
                accessorKey: "id"
            },
            {
                header: "Name",
                accessorKey: "name"
            },
            {
                header: "Sweater",
                accessorKey: "number"
            },
            {
                header: "Position",
                accessorKey: "position"
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
                header: "Shots",
                accessorKey: "shots"
            },
            {
                header: "+/-",
                accessorKey: "plusminus"
            },
            {
                header: "PIM",
                accessorKey: "pim"
            },
            {
                header: "PPG",
                accessorKey: "PPG"
            },
            {
                header: "Hits",
                accessorKey: "hits"
            },
            {
                header: "TOI",
                accessorKey: "TOI"
            },
            {
                header: "FO%",
                accessorKey: "FOWin"
            },
        ];

        const goalieColumns = [
            {
                header: "ID",
                accessorKey: "id"
            },
            {
                header: "Name",
                accessorKey: "name"
            },
            {
                header: "Sweater",
                accessorKey: "number"
            },
            {
                header: "Position",
                accessorKey: "position"
            },
            {
                header: "GA",
                accessorKey: "GA"
            },
            {
                header: "Save SA",
                accessorKey: "saveSA"
            },
            {
                header: "Even Strength GA",
                accessorKey: "evenStrengthGA"
            },
            {
                header: "Even Strength SA",
                accessorKey: "evenStrengthSA"
            },
            {
                header: "PowerPlay GA",
                accessorKey: "powerPlayGA"
            },
            {
                header: "PowerPlay SA",
                accessorKey: "powerPlaySA"
            },
            {
                header: "Shorthanded GA",
                accessorKey: "shorthandedGA"
            },
            {
                header: "Shorthanded SA",
                accessorKey: "shorthandedSA"
            },
            {
                header: "TOI",
                accessorKey: "toi"
            },
            {
                header: "PIM",
                accessorKey: "pim"
            },
        ];

        return (
            <div>
                {(typeof boxscore === "undefined") ? (
                    <p>Choose a game from above</p>
                ) : (
                <div>
                    <h1>{boxscore.awayTeam.name} {boxscore.awayTeam.score} - {boxscore.homeTeam.score} {boxscore.homeTeam.name}</h1>
                    <div className="flex items-center justify-center">
                        <img src={boxscore.awayTeam.logo} className="h-40 w-40"/> <img src={boxscore.homeTeam.logo} className="h-40 w-40"/>
                    </div>
                    
                    <p>SOG: {boxscore.team_game_stats.sog}</p>
                    <p>Faceoff %: {boxscore.team_game_stats.faceoffWinningPctg}</p>
                    <p>Hits: {boxscore.team_game_stats.hits}</p>
                    <p>Blocks: {boxscore.team_game_stats.blockedShots}</p>
                    <p>PIM: {boxscore.team_game_stats.pim}</p>
                    <p>Powerplay: {boxscore.team_game_stats.powerPlay}</p>
                    <p>Powerplay %: {boxscore.team_game_stats.powerPlayPctg}</p>
                    <p>Giveaways: {boxscore.team_game_stats.giveaways}</p>
                    <p>Takeaways: {boxscore.team_game_stats.takeaways}</p>
                    <Tabs defaultValue={boxscore.awayTeam.name.toLowerCase()}>
                        <TabsList>
                            <TabsTrigger value={boxscore.awayTeam.name.toLowerCase()}>
                            {boxscore.awayTeam.name}
                            </TabsTrigger>
                            <TabsTrigger value={boxscore.homeTeam.name.toLowerCase()}>
                            {boxscore.homeTeam.name}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value={boxscore.awayTeam.name.toLowerCase()}>
                            Forwards and Defensemen
                            <AppTable data={boxscore.away_skater_game_stats} columns={skaterColumns}/>
                            Goalies
                            <AppTable data={boxscore.away_goalie_game_stats} columns={goalieColumns}/>
                        </TabsContent>
                        <TabsContent value={boxscore.homeTeam.name.toLowerCase()}>
                            Forwards and Defensemen
                            <AppTable data={boxscore.home_skater_game_stats} columns={skaterColumns}/>
                            Goalies
                            <AppTable data={boxscore.home_goalie_game_stats} columns={goalieColumns}/>
                        </TabsContent>
                    </Tabs>
                </div>
                )}
            </div>
        )
    }

    const SummaryData = () => {

        return(
            <div>
                {(typeof boxscore === "undefined") ? (
                    <p>Choose a game from above</p>
                ) : (
                    <>
                    <div className="flex justify-center gap-3">
                    <Card className="w-80">
                        <CardHeader>
                            <CardTitle>
                                Linescore
                                <CardDescription>
                                <div className="flex justify-center">
                                <img src={boxscore.summary_data.awayTeamLogo} className="h-20 w-20"/>
                                <img src={boxscore.summary_data.homeTeamLogo} className="h-20 w-20"/>
                                </div>
                                </CardDescription>
                                <CardContent>
                                    <p className="text-base">Period {boxscore.summary_data.awayTeamAbbrev} {boxscore.summary_data.homeTeamAbbrev}</p>
                                    {boxscore.summary_data.team_goals_by_period.map(goals => 
                                    <div>
                                        <p className="text-base">{goals.period} {goals.away_score} {goals.home_score}</p>
                                        <Separator className="w-10"/>
                                    </div>
                                    )}
                                </CardContent>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="w-80">
                        <CardHeader>
                            <CardTitle>
                                Shots on Goal
                                <CardDescription>
                                <div className="flex justify-center">
                                <img src={boxscore.summary_data.awayTeamLogo} className="h-20 w-20"/>
                                <img src={boxscore.summary_data.homeTeamLogo} className="h-20 w-20"/>
                                </div>
                                </CardDescription>
                                <CardContent>
                                    Figure this out
                                </CardContent>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    </div>
                    <div>
                        <h1 className="text-left">Scoring Summary</h1>
                        {boxscore.summary_data.period_player_goals.map(goal =>
                        <div className="pb-3"> 
                            <Card>
                                <CardContent className="flex flex-wrap align-middle justify-between">
                                    <Avatar>
                                        <AvatarImage src={goal.headshot}/>
                                        <AvatarFallback>{goal.scoring_player}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>{goal.scoring_player} ({goal.goals_to_date})</p>
                                        <p>{goal.time_in_period}</p>
                                        <p>Period: {goal.period}</p>
                                    </div> {
                                        (typeof goal.assist === "undefined" ) ? (
                                            <p>Unassisted</p> // this has to be fixed
                                        ) : (
                                            <div className="">
                                                <p>Assists:</p>
                                            {goal.assist.map( assist => 
                                                <p className="text-sm text-muted-foreground">{assist.player} ({assist.assistsToDate})</p>
                                            )}
                                            </div>
                                        )   
                                    }
                                </CardContent>
                            </Card>
                        </div>
                        )}
                    </div>
                    </>
                )}
            </div>
        )
    }

    
    const PlayByPlay = () => {

        const getPlayerFromId = (players, play, property) => {
            var chosenPlayer;
            players.map(player => {
                if(player.playerId === play.details[property]){
                    chosenPlayer = player;
                }
            })
            return(chosenPlayer)
        }

        const getFOWinnerAndLoser = (players, play) => {
            const winner = getPlayerFromId(players, play, "winningPlayerId")
            const loser = getPlayerFromId(players, play, "losingPlayerId")

            return(
                <div className="flex">
                <Avatar>
                    <AvatarImage src={winner.headshot}/>
                </Avatar>
                <p>{winner.firstName.default} {winner.lastName.default} #{winner.sweaterNumber} ({winner.positionCode}) has won against {loser.firstName.default} {loser.lastName.default} #{loser.sweaterNumber} ({loser.positionCode})</p>
                <Avatar>
                    <AvatarImage src={loser.headshot}/>
                </Avatar>
                </div>
            )
        }

        const giveawayPlayer = (players, play) => {
            const giveawayPlayer = getPlayerFromId(players, play, "playerId");

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={giveawayPlayer.headshot}/>
                    </Avatar>
                    <p>Giveaway by {giveawayPlayer.firstName.default} {giveawayPlayer.lastName.default} #{giveawayPlayer.sweaterNumber} ({giveawayPlayer.positionCode})</p>
                </div>
            )
        }

        const takeawayPlayer = (players, play) => {
            const takeawayPlayer = getPlayerFromId(players, play, "playerId");

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={takeawayPlayer.headshot}/>
                    </Avatar>
                    <p>Takeaway by {takeawayPlayer.firstName.default} {takeawayPlayer.lastName.default} #{takeawayPlayer.sweaterNumber} ({takeawayPlayer.positionCode})</p>
                </div>
            )
        }

        const hit = (players, play) => {
            const hittingPlayer = getPlayerFromId(players, play, "hittingPlayerId");
            const playerGettingHit = getPlayerFromId(players, play, "hitteePlayerId");

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={hittingPlayer.headshot}/>
                    </Avatar>
                    <p>{hittingPlayer.firstName.default} {hittingPlayer.lastName.default} #{hittingPlayer.sweaterNumber} ({hittingPlayer.positionCode}) hit on {playerGettingHit.firstName.default} {playerGettingHit.lastName.default} #{playerGettingHit.sweaterNumber} ({playerGettingHit.positionCode})</p>
                    <Avatar>
                        <AvatarImage src={playerGettingHit.headshot}/>
                    </Avatar>
                </div>
            )
        }

        const blockedShot = (players, play) => {
            const blockingPlayer = getPlayerFromId(players, play, "blockingPlayerId");
            const shootingPlayer = getPlayerFromId(players, play, "shootingPlayerId");

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={blockingPlayer.headshot}/>
                    </Avatar>
                    <p>{blockingPlayer.firstName.default} {blockingPlayer.lastName.default} #{blockingPlayer.sweaterNumber} ({blockingPlayer.positionCode}) blocked the shot by {shootingPlayer.firstName.default} {shootingPlayer.lastName.default} #{shootingPlayer.sweaterNumber} ({shootingPlayer.positionCode})</p>
                    <Avatar>
                        <AvatarImage src={shootingPlayer.headshot}/>
                    </Avatar>
                </div>
            )
        }

        const shotOnGoal = (players, play) => {
            const shooter = getPlayerFromId(players, play, "shootingPlayerId");
            const goalie = getPlayerFromId(players, play, "goalieInNetId");

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={shooter.headshot}/>
                    </Avatar>
                    <p>{shooter.firstName.default} {shooter.lastName.default} #{shooter.sweaterNumber} ({shooter.positionCode}) {play.details.shotType} shot saved by {goalie.firstName.default} {goalie.lastName.default} #{goalie.sweaterNumber} ({goalie.positionCode})</p>
                    <Avatar>
                        <AvatarImage src={goalie.headshot}/>
                    </Avatar>
                </div>
            )
        }

        const penalty = (players, play) => {
            const committingPlayer = getPlayerFromId(players, play, "committedByPlayerId");
            const victimPlayer = getPlayerFromId(players, play, "drawnByPlayerId");
            const servedByPlayer = getPlayerFromId(players, play, "servedByPlayerId")
            console.log(committingPlayer);

            if (servedByPlayer) {
                return(
                    <div className="flex">
                        <p>{play.details.descKey} penalty served by {servedByPlayer.firstName.default} {servedByPlayer.lastName.default} #{servedByPlayer.sweaterNumber} ({servedByPlayer.positionCode})</p>
                        <Avatar>
                            <AvatarImage src={servedByPlayer.headshot}/>
                        </Avatar>
                    </div>
                )
            }
            
            if (typeof(victimPlayer) === "undefined") {
                return(
                    <div className="flex">
                        <Avatar>
                            <AvatarImage src={committingPlayer.headshot}/>
                        </Avatar>
                        <p>{committingPlayer.firstName.default} {committingPlayer.lastName.default} #{committingPlayer.sweaterNumber} ({committingPlayer.positionCode}) {play.details.duration} min penalty for {play.details.descKey}</p>
                    </div>
                )
            }

            return(
                <div className="flex">
                    <Avatar>
                        <AvatarImage src={committingPlayer.headshot}/>
                    </Avatar>
                    <p>{committingPlayer.firstName.default} {committingPlayer.lastName.default} #{committingPlayer.sweaterNumber} ({committingPlayer.positionCode}) {play.details.duration} min penalty for {play.details.descKey} on {victimPlayer.firstName.default} {victimPlayer.lastName.default} #{victimPlayer.sweaterNumber} ({victimPlayer.positionCode})</p>
                    <Avatar>
                        <AvatarImage src={victimPlayer.headshot}/>
                    </Avatar>
                </div>
            )
        }
        
        return (
            <div>
                {(typeof boxscore === "undefined") ? (
                    <p>Choose a game from above</p>
                ) : (
                    <div>
                        {boxscore.plays.map(play => 
                            <Card className="flex justify-evenly">
                                <div>
                                <p>Period: {play.periodDescriptor.number}</p>
                                <p>{play.timeRemaining}</p>
                                </div>
                                <div>
                                    <p className="capitalize">{play.typeDescKey}</p>
                                </div>
                                <div>
                                    {play.typeDescKey === "faceoff" && 
                                        getFOWinnerAndLoser(boxscore.players, play)}
                                    {play.typeDescKey === "giveaway" &&
                                        giveawayPlayer(boxscore.players, play)}
                                    {play.typeDescKey === "takeaway" &&
                                        takeawayPlayer(boxscore.players, play)}
                                    {play.typeDescKey === "hit" &&
                                        hit(boxscore.players, play)}
                                    {play.typeDescKey === "blocked-shot" &&
                                        blockedShot(boxscore.players, play)}
                                    {play.typeDescKey === "shot-on-goal" &&
                                        shotOnGoal(boxscore.players, play)}
                                    {play.typeDescKey === "penalty" &&
                                        penalty(boxscore.players, play)}
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        )
    }
    

  return (
    <>
    <div>
        <GameDayPicker/>
        <GamesByDate/>
    </div>
    <div className="pt-3">
        <GameTabs/>
    </div>
    </>
  )
}

export default Game