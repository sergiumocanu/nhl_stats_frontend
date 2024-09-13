import AppTable from "@/components/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { careerTotals, featuredStats, last5Games } from "./ColumDefs";
import Plot from 'react-plotly.js';
import { CartesianGrid, LineChart, Rectangle, ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { render } from "react-dom";
import { newPlot, react } from "plotly.js";

const Player = () => {
  const [chosenTeam, setChosenTeam] = useState<any>();
  const [chosenPlayer, setChosenPlayer] = useState<any>();

  const TeamPicker = () => {
    const [teams, setTeams] = useState<any>();
    useEffect(() => {
      fetch("/api/team")
        .then((res) => res.json())
        .then((data) => setTeams(data));
    }, []);

    return (
      <div>
        <Select value={chosenTeam} onValueChange={setChosenTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Team" />
          </SelectTrigger>
          <SelectContent>
            {teams?.team_names.map((team_name: any, i: number) => (
              <SelectItem key={i} value={team_name.value}>
                {team_name.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const PlayerPicker = () => {
    const [players, setPlayers] = useState<any>();

    useEffect(() => {
      fetch(`/api/all_team_players?team=${chosenTeam}`)
        .then((res) => res.json())
        .then((data) => {
          setPlayers(data);
        });
    }, [chosenTeam]);

    return (
      <div>
        <Select value={chosenPlayer} onValueChange={setChosenPlayer}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent>
            {players?.players.map((player: any) => (
              <SelectItem value={player.id}>{player.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const PlayerInfo = () => {
    const [playerInfo, setPlayerInfo] = useState<any>();

    useEffect(() => {
      fetch(`/api/player_info?player=${chosenPlayer}`)
        .then((res) => res.json())
        .then((data) => {
          setPlayerInfo(data);
          console.log(data);
        });
    }, [chosenPlayer]);

    return (
      <div>
        {typeof playerInfo === "undefined" ? (
          <p>Choose a player from above</p>
        ) : (
          <div>
            <div className="flex">
              <div className="flex w-1/3 pt-3">
                <Card>
                  <CardHeader>
                    <CardTitle>{playerInfo.name}</CardTitle>
                    <CardDescription className="flex justify-center">
                      #{playerInfo.number} | {playerInfo.position} |{" "}
                      <img width="35" src={playerInfo.teamLogo} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={playerInfo.headshot} />
                    <p>
                      <b>Height: </b>
                      {playerInfo.height}
                    </p>
                    <p>
                      <b>Weight: </b>
                      {playerInfo.weight} lbs
                    </p>
                    <p>
                      <b>Born:</b> {playerInfo.age}
                    </p>
                    <p>
                      <b>Birthplace:</b> {playerInfo.birthplace}
                    </p>
                    <p>
                      <b>Draft:</b> {playerInfo.draft}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="w-2/3 pt-3">
                <h1>{playerInfo.featuredStatsSeason}</h1>
                <AppTable
                  columns={featuredStats}
                  data={playerInfo.featuredStatsThisSeason}
                />
                <h1>Career</h1>
                <AppTable
                  columns={featuredStats}
                  data={playerInfo.featuredStatsCareer}
                />
                <h1>Last 5 Games</h1>
                <AppTable columns={last5Games} data={playerInfo?.last5Games} />
              </div>
            </div>
            <div>
              <AppTable
                columns={careerTotals}
                data={playerInfo?.seasonTotals}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const HockeyRink = () => {

    var x0 = 0;
    var y0 = 0;
    var x1 = 200;
    var y1 = 85;
    var h = 28;

    var bot_left = `M ${x0+h}, ${y0} Q ${x0}, ${y0} ${x0}, ${y0+h}`
    var top_left = ` L ${x0}, ${y1-h} Q ${x0}, ${y1} ${x0+h}, ${y1}`
    var top_right = ` L ${x1-h}, ${y1} Q ${x1}, ${y1} ${x1}, ${y1-h}`
    var bot_right = `L ${x1}, ${y0+h} Q ${x1}, ${y0} ${x1-h}, ${y0}Z`

    var rink_path = bot_left + top_left + top_right + bot_right;

    return (
      // react('myDiv', data, layout)
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}

        layout={ 
          {width: 1000, height: 500, title: 'A Fancy Plot',
          shapes:[
            {
              type: "path",
              path: rink_path, 
              line: {
                color: "black",
                width: 1,
              },
            },
            {
              type: "line", // center line
              x0: 100,
              y0: 0,
              x1: 100,
              y1: 85,
              line: {
                color: "red",
                width: 2,
                dash: "dash"
              }
            },
            {
              type: "line", // left goalie line
              x0: 11,
              y0: 4,
              x1: 11,
              y1: 81,
              line: {
                color: "red",
                width: 2
              }
            },
            {
              type: "line", // right goalie line
              x0: 200-11,
              y0: 4,
              x1: 200-11,
              y1: 81,
              line: {
                color: "red",
                width: 2
              }
            },
            {
              type: "line", // left blue line
              x0: 75,
              y0: 0,
              x1: 75,
              y1: 85,
              line: {
                color: "blue",
                width: 4
              }
            },
            {
              type: "line", // right blue line
              x0: 200-75,
              y0: 0,
              x1: 200-75,
              y1: 85,
              line: {
                color: "blue",
                width: 4
              }
            },
            {
              type: "circle", // bot left neutral dot
              xref: "x",
              yref: "y",
              x0: 80-1,
              y0: 20.5-1,
              x1: 80+1,
              y1: 20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // top left neutral dot
              xref: "x",
              yref: "y",
              x0: 80-1,
              y0: 85-20.5-1,
              x1: 80+1,
              y1: 85-20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // bot right neutral dot
              xref: "x",
              yref: "y",
              x0: 200-80-1,
              y0: 20.5-1,
              x1: 200-80+1,
              y1: 20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // top right neutral dot
              xref: "x",
              yref: "y",
              x0: 200-80-1,
              y0: 85-20.5-1,
              x1: 200-80+1,
              y1: 85-20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // center blue circle
              xref: "x",
              yref: "y",
              x0: 100-15,
              y0: 42.5-15,
              x1: 100+15,
              y1: 42.5+15,
              line: {
                color: "blue",
                width: 2
              }
            },
            {
              type: "circle", // center blue dot
              xref: "x",
              yref: "y",
              x0: 100-0.5,
              y0: 42.5-0.5,
              x1: 100+0.5,
              y1: 42.5+0.5,
              line: {
                color: "blue",
                width: 2
              },
              fillcolor: "blue"
            },
            {
              type: "circle", // bot left goalie dot
              xref: "x",
              yref: "y",
              x0: 31-1,
              y0: 20.5-1,
              x1: 31+1,
              y1: 20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // top left goalie dot
              xref: "x",
              yref: "y",
              x0: 31-1,
              y0: 85-20.5-1,
              x1: 31+1,
              y1: 85-20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // bot right goalie dot
              xref: "x",
              yref: "y",
              x0: 200-31-1,
              y0: 20.5-1,
              x1: 200-31+1,
              y1: 20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // top right goalie dot
              xref: "x",
              yref: "y",
              x0: 200-31-1,
              y0: 85-20.5-1,
              x1: 200-31+1,
              y1: 85-20.5+1,
              line: {
                color: "red",
                width: 2
              },
              fillcolor: "red"
            },
            {
              type: "circle", // bot left goalie circle
              xref: "x",
              yref: "y",
              x0: 31-15,
              y0: 20.5-15,
              x1: 31+15,
              y1: 20.5+15,
              line: {
                color: "red",
                width: 2
              }
            },
            {
              type: "circle", // top left goalie circle
              xref: "x",
              yref: "y",
              x0: 31-15,
              y0: 85-20.5-15,
              x1: 31+15,
              y1: 85-20.5+15,
              line: {
                color: "red",
                width: 2
              }
            },
            {
              type: "circle", // bot right goalie circle
              xref: "x",
              yref: "y",
              x0: 200-31-15,
              y0: 20.5-15,
              x1: 200-31+15,
              y1: 20.5+15,
              line: {
                color: "red",
                width: 2
              }
            },
            {
              type: "circle", // top right goalie circle
              xref: "x",
              yref: "y",
              x0: 200-31-15,
              y0: 85-20.5-15,
              x1: 200-31+15,
              y1: 85-20.5+15,
              line: {
                color: "red",
                width: 2
              }
            },
          ]
        }
          
        }
      />
    )

  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <TeamPicker />
        <PlayerPicker />
      </div>
      <PlayerInfo />
      <HockeyRink />
    </div>
  );
};

export default Player;
