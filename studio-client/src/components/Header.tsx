import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom" // ⬅ added useNavigate
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Settings, CirclePlus, BriefcaseBusiness, LogOutIcon, User } from "lucide-react"
import ProjectForm from "@/components/Projects/projects-Form"
import { useAuth } from "@/lib/hooks/useAuth"

const Header = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate() // ⬅ added
  const { user, clearAuth } = useAuth()

  const [initials, setInitials] = useState("U")

  useEffect(() => {
    if (user?.name) {
      const nameInitials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      setInitials(nameInitials)
    } else {
      setInitials("U")
    }
  }, [user])

  const handleLogout = () => {
    clearAuth()
    navigate("/login") // ⬅ redirect after logout
  }

  const logo = "/images/logo-full.png"
  const companyName = "Studio 1-1"

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 shadow-sm bg-white">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={logo} alt="Logo" />
            <AvatarFallback className="bg-blue-600 text-white font-bold">
              {companyName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold text-blue-600">{companyName}</span>
        </Link>

        {/* Projects + Items menus (unchanged) */}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>  

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {user?.profileImage ? (
                  <AvatarImage src={user.profileImage} alt={user?.name || "User profile"} />
                ) : null}
                <AvatarFallback className="bg-blue-600 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col px-3 py-2">
              <span className="font-semibold text-sm">{user?.name || "Guest"}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email || "guest@example.com"}
              </span>
            </div>

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

            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
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
