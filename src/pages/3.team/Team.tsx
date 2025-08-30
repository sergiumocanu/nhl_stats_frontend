"use client";

import { Route } from "@/routes/team/$id";
import { useQuery } from "@tanstack/react-query";
import {
  teamProspectsSchema,
  teamRosterSchema,
  teamStatsSchema,
} from "./schemas";
import { AppTable } from "@/_components/Table";
import { goalieStats, skaterRoster, skaterStats } from "./ColumnDefs";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { H2, H3, P } from "@/components/ui/Typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

interface ClickedRow {
  id: number;
}

export function Team() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  // 1. Query for Team Roster
  const {
    isPending: isRosterPending,
    isError: isRosterError,
    error: rosterError,
    data: rosterData,
  } = useQuery({
    queryKey: ["team_roster", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/team_roster/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch team roster");
      }
      return await response.json();
    },
  });

  // 2. Query for Club Stats
  const {
    isPending: isStatsPending,
    isError: isStatsError,
    error: statsError,
    data: statsData,
  } = useQuery({
    queryKey: ["club_stats_now", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/club_stats_now/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch club stats");
      }
      return await response.json();
    },
  });

  // 2. Query for team prospects
  const {
    isPending: isProspectsPending,
    isError: isProspectsError,
    error: prospectsError,
    data: prospectsData,
  } = useQuery({
    queryKey: ["team_prospects", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/team_prospects/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch club stats");
      }
      return await response.json();
    },
  });

  if (isRosterPending || isStatsPending || isProspectsPending) {
    return <div>Loading team data...</div>;
  }

  if (isRosterError)
    return <div>Error loading roster: {rosterError.message}</div>;
  if (isStatsError) return <div>Error loading stats: {statsError.message}</div>;
  if (isProspectsError)
    return <div>Error loading prospects: {prospectsError.message}</div>;

  const {
    success: successParseRoster,
    error: parseErrorRoster,
    data: teamRoster,
  } = teamRosterSchema.safeParse(rosterData);

  if (!successParseRoster) {
    console.error("Zod validation error:", parseErrorRoster);
    return <div>Error loading roster: Invalid data format.</div>;
  }

  const forwardsRoster = teamRoster?.team_roster.forwards || [];
  const defensemenRoster = teamRoster?.team_roster.defensemen || [];
  const goaliesRoster = teamRoster?.team_roster.goalies || [];

  console.log("prospects", prospectsData);

  const {
    success: successParseStats,
    error: parseErrorStats,
    data: teamStats,
  } = teamStatsSchema.safeParse(statsData);

  if (!successParseStats) {
    console.error("Zod validation error:", parseErrorStats);
    return <div>Error loading prospects: Invalid data format.</div>;
  }

  const {
    success: successParseProspects,
    error: parseErrorProspects,
    data: teamProspects,
  } = teamProspectsSchema.safeParse(prospectsData);

  if (!successParseProspects) {
    console.error("Zod validation error:", parseErrorProspects);
    return <div>Error loading prospects: Invalid data format.</div>;
  }

  function handleRowClick(row: ClickedRow) {
    if (row.id) {
      navigate({ to: "/player/$id", params: { id: `${row.id}` } });
    }
  }

  return (
    <>
      <H2 className="mb-4">{id}</H2>
      <Tabs defaultValue="roster">
        <TabsList>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
        </TabsList>
        <TabsContent value="roster">
          <H3 className="flex items-start">Forwards</H3>
          <AppTable
            columns={skaterRoster}
            data={forwardsRoster}
            onRowClick={handleRowClick}
          />
          <H3 className="flex items-start">Defensemen</H3>
          <AppTable
            columns={skaterRoster}
            data={defensemenRoster}
            onRowClick={handleRowClick}
          />
          <H3 className="flex items-start">Goalies</H3>
          <AppTable
            columns={skaterRoster}
            data={goaliesRoster}
            onRowClick={handleRowClick}
          />
        </TabsContent>
        <TabsContent value="stats">
          <H3 className="flex items-start">Skaters</H3>
          <AppTable
            columns={skaterStats}
            data={teamStats.team_stats.skaters.map((skater) => ({
              ...skater,
              id: skater.playerId,
            }))}
            onRowClick={handleRowClick}
          />
          <H3 className="flex items-start">Goalies</H3>
          <AppTable
            columns={goalieStats}
            data={teamStats.team_stats.goalies.map((goalie) => ({
              ...goalie,
              id: goalie.playerId,
            }))}
            onRowClick={handleRowClick}
          />
        </TabsContent>
        <TabsContent value="prospects">
          <H3 className="flex items-start">Forwards</H3>
          <AppTable
            columns={skaterRoster}
            data={teamProspects.team_prospects.forwards}
            onRowClick={handleRowClick}
          />
          <H3 className="flex items-start">Defensemen</H3>
          <AppTable
            columns={skaterRoster}
            data={teamProspects.team_prospects.defensemen}
            onRowClick={handleRowClick}
          />
          <H3 className="flex items-start">Goalies</H3>
          <AppTable
            columns={skaterRoster}
            data={teamProspects.team_prospects.goalies}
            onRowClick={handleRowClick}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

// const Team = () => {

//   const [team, setTeam] = useState<any>("")
//   const [teamSeason, setTeamSeason] = useState<any>("")
//   var teamChosen = false
//   if (typeof team.team_roster !== "undefined") {
//     console.log(team)
//     teamChosen = true
//   }

//   const SeasonPicker = () => {
//     const [season, setSeason] = useState<any>()

//     useEffect(() => {
//       fetch(`/api/team_seasons?team=${team}`)
//       .then(res => res.json())
//       .then(data => {
//         setSeason(data)
//         console.log(data)
//       })
//     }, [team])

//     return(
//       <div>
//         <Select value={teamSeason} onValueChange={setTeamSeason}>
//           <SelectTrigger>
//             <SelectValue placeholder="Season"/>
//           </SelectTrigger>
//           <SelectContent>
//             {season?.team_seasons?.map((season: any) => (
//               <SelectItem value={season.value}>{season.label}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     )
//   }

//   const TeamPicker = () => {
//     const [data, setData] = useState<any>([{}])
//     console.log(team)

//     useEffect(() => {
//         fetch("/api/team")
//         .then(res => res.json())
//         .then(
//             data => {
//                 setData(data)
//             }
//         )
//     }, [])

//     return (
//       <div>
//       <Select value={team} onValueChange={setTeam}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select a Team" />
//         </SelectTrigger>
//         <SelectContent>
//           {data.team_names?.map((team_name: any) => (
//             <SelectItem value={team_name.value}>{team_name.label}</SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       </div>
//     )
//   }

//   const TeamRoster = () => {

//     const [ roster, setRoster ] = useState<any>([]);
//     useEffect(() => {
//       console.log("inside teamroster useeffect ", team)
//       fetch(`/api/team_roster?team=${team}&season=${teamSeason}`)
//       .then(res => res.json())
//       .then(
//           data => {
//               setRoster(data)
//               console.log(data)
//           }
//       )
//   }, [team])

//     const columns = skaterRoster;

//     return (
//       <div>
//         {typeof(roster.team_roster) === "undefined" ? (
//             <p>Choose a team from above</p>
//         ) : (
//             <>
//             <h1 className="text-3xl">Viewing {roster.team} roster </h1>
//             <SeasonPicker/>
//             <h2 className="text-left text-xl">Forwards</h2>
//             <AppTable data={roster.team_roster.forwards} columns={columns}/>
//             <h2 className="text-left text-xl">Defensemen</h2>
//             <AppTable data={roster.team_roster.defensemen} columns={columns}/>
//             <h2 className="text-left text-xl">Goalies</h2>
//             <AppTable data={roster.team_roster.goalies} columns={columns}/>
//             </>

//         )}
//       </div>
//     )
//   }

//   const TeamStats = () => {
//     const [ stats, setStats ] = useState<any>([]);
//     useEffect(() => {
//       console.log("inside teamroster useeffect ", team)
//       fetch(`/api/team_stats?team=${team}`)
//       .then(res => res.json())
//       .then(
//           data => {
//               setStats(data)
//               console.log(data)
//           }
//       )
//   }, [team])

//   const skaterColumns = skaterStats;
//   const goalieColumns = goalieStats;

//   return(
//     <div>
//         {typeof(stats.skaters) === "undefined" ? (
//             <p>Choose a team from above</p>
//         ) : (
//             <>
//             <h2 className="text-left text-xl">Skaters</h2>
//             <AppTable data={stats.skaters} columns={skaterColumns}/>
//             <h2 className="text-left text-xl">Goalies</h2>
//             <AppTable data={stats.goalies} columns={goalieColumns}/>
//             </>

//         )}
//       </div>
//     )

//   }

//   return (
//     <div>
//       <TeamPicker/>
//       <Tabs defaultValue="roster">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="roster">Roster</TabsTrigger>
//           <TabsTrigger value="stats">Stats</TabsTrigger>
//         </TabsList>
//         <TabsContent value="roster">
//           <TeamRoster/>
//         </TabsContent>
//         <TabsContent value="stats">
//           <TeamStats/>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default Team
