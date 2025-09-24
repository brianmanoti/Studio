import  { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  DollarSign,
  Users,
  Briefcase,
  CreditCard,
  PieChart,
  ChevronLeft,
  ChevronRight,
  ListOrderedIcon,
  TrendingUpDownIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { name: "Projects", icon: Briefcase, to: "/projects" },
  { name: "Estimates", icon: TrendingUpDownIcon, to: "/projects/estimates" },
  { name: "Expenses", icon: FileText, to: "/projects/expenses" },
  { name: "Purchase Orders", icon: ListOrderedIcon, to: "/projects/purchase-orders" },
  { name: "Wages", icon: DollarSign, to: "/projects/wages" },
  { name: "Subcontractors", icon: Users, to: "/projects/subcontractors" },
  { name: "Payroll", icon: CreditCard, to: "/projects/payroll" },
  { name: "Budget", icon: PieChart, to: "/projects/budget" },
];

const Sidebar = ({ logo, logoCollapsed, projectName = "My Project" }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen border-r shadow-sm flex flex-col transition-all duration-300",
        isCollapsed
          ? "w-20 bg-blue-700 text-white"
          : "w-64 bg-white text-gray-800"
      )}
    >
      {/* Logo + Collapse Button */}
      <div className="h-16 flex items-center justify-between border-b px-4">
        {isCollapsed ? (
          <div className="flex items-center justify-center w-full">
            {logoCollapsed ? (
              <img
                src={logoCollapsed}
                alt="Collapsed Logo"
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                {projectName.charAt(0)}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {logo && (
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            )}
            <h1 className="text-xl font-bold text-blue-600">{projectName}</h1>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "ml-auto p-1 rounded-md hover:bg-gray-100 transition-colors",
            isCollapsed ? "text-white hover:bg-blue-600" : "text-gray-600"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <TooltipProvider>
        <nav className="flex-1 px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;

            const linkClasses = cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
              active
                ? isCollapsed
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700"
                : isCollapsed
                ? "text-blue-100 hover:bg-blue-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              isCollapsed && "justify-center"
            );

            return isCollapsed ? (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link to={item.to} className={linkClasses}>
                    {active && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r" />
                    )}
                    <Icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ) : (
              <Link to={item.to} key={item.name} className={linkClasses}>
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r" />
                )}
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </TooltipProvider>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} {projectName}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
