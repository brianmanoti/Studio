"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useProjects } from "@/lib/hooks/useProjects"

const ProjectList = () => {

  const notify = () => toast("Project created")
    const { data: projects, isLoading, isError } = useProjects()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load projects</p>

    if (!projects || projects.length === 0) {
    return <p className="text-gray-500">No projects found. Start by creating one!</p>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
        <div className="flex items-center gap-3">

          <Button onClick={notify}>
            Notify
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            <Link to={"./projects/new"}>
            + Create Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>

        {/* Multi-select placeholder */}
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="+4 selected" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>

        {/* Type filter */}
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New Home</SelectItem>
            <SelectItem value="renovation">Renovation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-medium">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Client</th>
              <th className="p-4">Project Type</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">End Date</th>
            </tr>
          </thead>
        <tbody className="divide-y divide-gray-200">
        {projects.map((project, i) => (
            <tr
            key={i}
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
            {/* ID */}
            <td className="p-4 font-medium text-blue-600">
                {project.id}
            </td>

            {/* Project Name */}
            <td className="p-4">
                <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-xs font-semibold">
                    {project.name?.charAt(0).toUpperCase()}
                </span>
                <span className="text-blue-700 font-medium hover:underline">
                    {project.name}
                </span>
                </div>
            </td>

            {/* Client */}
            <td className="p-4">
                <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                    {project.client?.charAt(0).toUpperCase()}
                </span>
                <span className="text-gray-700">{project.client}</span>
                </div>
            </td>

            {/* Project Type */}
            <td className="p-4 text-gray-600">{project.type}</td>

            {/* Start Date */}
            <td className="p-4 text-gray-600">{project.startDate}</td>

            {/* End Date */}
            <td className="p-4 text-gray-600">{project.endDate}</td>
            </tr>
        ))}
        </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            {"<"}
          </Button>
          <span className="px-2">1</span>
          <Button variant="outline" size="sm">
            {">"}
          </Button>
        </div>

        {/* Items per page */}
        <div className="flex items-center gap-2">
          <Select defaultValue="10">
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>Items per page</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectList
