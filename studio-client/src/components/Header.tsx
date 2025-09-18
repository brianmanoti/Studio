import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, ChevronDown, CirclePlus, BriefcaseBusiness } from "lucide-react"
import { ProjectsForm } from "./Projects/projects-Form"
import { Link } from "react-router-dom"

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full h-16  flex items-center justify-between px-4 shadow-sm">
      {/* Left Section: Logo + Nav */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="text-lg font-semibold">Logo</div>

        {/* Projects Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              Projects <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-66 absolute top-2.5 rounded-t-none font-semibold">
          <DropdownMenuItem className="flex justify-center text-black font-bold ">
            <BriefcaseBusiness className="mr-2 h-4 w-4" /> 
            View all projects
          </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to={"/projects"}>Project 1</Link></DropdownMenuItem>
            <DropdownMenuItem>Project 2</DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Create Project Button */}
          <DropdownMenuItem className="w-full text-blue-700  focus:text-white  focus:bg-blue-400" asChild>
            <button
              onClick={() => setOpen(true)}
              className="flex w-full items-center gap-2 border-none bg-transparent outline-none"
            >
              <CirclePlus className="h-4 w-4 text-blue focus:text-white " />
              <span>Create New Project</span>
            </button>
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* All Items Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              All Items <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>All Items</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item One</DropdownMenuItem>
            <DropdownMenuItem>Item Two</DropdownMenuItem>
            <DropdownMenuItem>Item Three</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Projects Form Modal */}
      <ProjectsForm open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
