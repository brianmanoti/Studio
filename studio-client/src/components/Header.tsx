import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings, ChevronDown, CirclePlus, BriefcaseBusiness, LogOutIcon, User } from "lucide-react"
import ProjectForm from "@/components/Projects/projects-Form"

const Header = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const logo = "/images/logo-full.png", companyName = "Studio 1-1" 

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 shadow-sm bg-white">
      {/* Left Section: Logo + Nav */}
      <div className="flex items-center space-x-6">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={logo} alt={`Logo`} />
            <AvatarFallback className="bg-blue-600 text-white font-bold">
              {companyName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold text-blue-600">{companyName}</span>
        </Link>


        {/* Projects Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              Projects <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 font-semibold">
            <DropdownMenuItem className="flex items-center justify-center text-black font-bold">
              <BriefcaseBusiness className="mr-2 h-4 w-4" /> View all projects
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                to="/projects/1"
                className={location.pathname === "/projects/1" ? "text-blue-600 font-bold" : ""}
              >
                Project 1
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="/projects/2"
                className={location.pathname === "/projects/2" ? "text-blue-600 font-bold" : ""}
              >
                Project 2
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Create Project Button */}
            <DropdownMenuItem onClick={() => setOpen(true)} className="text-blue-700">
              <CirclePlus className="h-4 w-4 mr-2" /> Create New Project
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
            <DropdownMenuItem>Estimates</DropdownMenuItem>
            <DropdownMenuItem>Purchase Orders </DropdownMenuItem>
            <DropdownMenuItem>Wages</DropdownMenuItem>
            <DropdownMenuItem>Expenses</DropdownMenuItem>
            <DropdownMenuItem>Subcontactors</DropdownMenuItem>
            <DropdownMenuItem>Estimates</DropdownMenuItem>
            <DropdownMenuItem>Payroll</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        
      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/user-avatar.png" alt="User profile" />
              <AvatarFallback className="bg-blue-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      {/* Project Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined} className="p-2">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Fill in details to create a new project
            </DialogDescription>
          </DialogHeader>
          <ProjectForm />
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
