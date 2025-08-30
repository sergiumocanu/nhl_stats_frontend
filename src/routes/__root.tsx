import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TeamSchema = z.object({
  teams: z.array(
    z.object({
      franchiseId: z.number(),
      fullName: z.string(),
      id: z.number(),
      leagueId: z.number(),
      rawTricode: z.string(),
      triCode: z.string(),
    })
  ),
  total: z.number(),
});

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
});

function Navbar() {
  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["teamIds"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/teams");
      return await response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading teams. {error.message}</div>;

  const teams = TeamSchema.parse(data);
  // const teams = {
  //   team_names: [
  //     {
  //       triCode: "TOR",
  //       fullName: "Toronto Maple Leafs",
  //     },
  //   ],
  // };

  return (
    <NavigationMenu className="max-w-full w-full px-4 py-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger>Game</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[200px]">
              <NavigationMenuLink asChild>
                <Link
                  to="/game/$id"
                  params={{ id: "1000" }}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Game 1000
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Team</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="p-4 w-[400px] h-72">
              {teams.teams.map((team, i) => (
                <NavigationMenuLink asChild key={`${team.triCode}-${i}`}>
                  <Link
                    to="/team/$id"
                    params={{ id: team.triCode }}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {team.fullName}
                  </Link>
                </NavigationMenuLink>
              ))}
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Player</NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerLeave={(e) => e.preventDefault()}
            onPointerEnter={(e) => e.preventDefault()}
          >
            <div className="p-4 w-[400px] flex">
              <Select>
                <SelectTrigger
                  className="w-full mr-1"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.teams.map((team) => (
                    <SelectItem key={team.triCode} value={team.triCode}>
                      {team.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger
                  className="w-full"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SelectValue placeholder="Select Player" />
                </SelectTrigger>
                <SelectContent>
                  {teams.teams.map((team) => (
                    <SelectItem key={team.triCode} value={team.triCode}>
                      {team.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    // <NavigationMenu className="max-w-full w-full justify-between px-4 py-2 bg-background text-foreground">
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuLink asChild>
    //         <Link to="/">
    //           <Button variant={"ghost"}>Home</Button>
    //         </Link>
    //       </NavigationMenuLink>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Team</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="outline" className="w-56">
    //               Select Team
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent className="max-h-80 overflow-y-auto">
    //             {teams?.team_names.map((team) => (
    //               <DropdownMenuItem key={team.id}>
    //                 <Link
    //                   to="/team/$id"
    //                   params={{ id: team.triCode }}
    //                   className="block"
    //                 >
    //                   {team.fullName}
    //                 </Link>
    //               </DropdownMenuItem>
    //             ))}
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem className="relative">
    //       <NavigationMenuTrigger className="text-xl font-medium">
    //         Player
    //       </NavigationMenuTrigger>
    //       <NavigationMenuContent className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg">
    //         <NavigationMenuLink asChild>
    //           <Link
    //             to="/player/$id"
    //             params={{ id: "3" }}
    //             className="block py-2 px-3 hover:bg-gray-200 rounded"
    //           >
    //             Player 3
    //           </Link>
    //         </NavigationMenuLink>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
