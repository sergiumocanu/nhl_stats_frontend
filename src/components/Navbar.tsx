import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { Link } from "@radix-ui/react-navigation-menu"
  


const Navbar = () => {
  return (
    <div>
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <Link href="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/game">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Game
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/team">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Team
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/player">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Player
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>

    </div>
  )
}

export default Navbar