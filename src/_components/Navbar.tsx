// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { router } from "@/router";
// import { useNavigate } from "react-router-dom";

// type TeamTypes = {
//   team_names: {
//     franchiseId: number;
//     fullName: string;
//     id: number;
//     leagueId: number;
//     rawTricode: string;
//     triCode: string;
//   }[];
//   total: number;
// };

// export const Navbar = () => {
//   const components: { title: string; href: string }[] = [
//     {
//       title: "Home",
//       href: "/",
//     },
//   ];
//   const [teams, setTeams] = useState<TeamTypes>();
//   const [selectedTeam, setSelectedTeam] = useState("");
//   const [selectedPlayerTeam, setSelectedPlayerTeam] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetch("http://localhost:5000/teams")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setTeams(data);
//       });
//   }, []);
//   function handleTeamChange(teamId: string) {
//     setSelectedTeam(teamId), navigate(`/teams/${teamId}`);
//   }
//   function handlePlayerTeamChange(teamId: string) {
//     setSelectedPlayerTeam(teamId);
//   }
//   return (
//     <div>
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuLink
//               className={navigationMenuTriggerStyle()}
//               href="/"
//             >
//               Home
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink
//               className={navigationMenuTriggerStyle()}
//               href="/game"
//             >
//               Game
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
//             <NavigationMenuContent
//               onPointerEnter={(e) => e.preventDefault()}
//               onPointerLeave={(e) => e.preventDefault()}
//             >
//               <ul className="p-6 md:w-[400px] lg:w-[300px]">
//                 <li>
//                   <Select value={selectedTeam} onValueChange={handleTeamChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Team" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {teams?.team_names.map((team) => (
//                         <SelectItem value={team.triCode} key={team.id}>
//                           {team.fullName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </li>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>Players</NavigationMenuTrigger>
//             <NavigationMenuContent
//               onPointerEnter={(e) => e.preventDefault()}
//               onPointerLeave={(e) => e.preventDefault()}
//             >
//               <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                 <li>
//                   <Select
//                     value={selectedPlayerTeam}
//                     onValueChange={handlePlayerTeamChange}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Team" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {teams?.team_names.map((team) => (
//                         <SelectItem value={team.triCode} key={team.id}>
//                           {team.fullName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </li>
//                 <li>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Player" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="123123">Auston Matthews</SelectItem>
//                       <SelectItem value="345345">Connor McDavid</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </li>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// };

// // export default Navbar;

// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuLink,
// } from "@/components/ui/navigation-menu";
// import { Link } from "@tanstack/react-router";
// import { Button } from "./ui/button";

// export const Navbar = () => {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuLink asChild>
//             <Link to="/">
//               <Button variant={"outline"}>HOME</Button>
//             </Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuLink asChild>
//             <Link to="/about">About</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };
