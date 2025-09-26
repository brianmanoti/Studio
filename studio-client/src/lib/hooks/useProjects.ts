import { useQuery } from "@tanstack/react-query"
import { getProjects, getProjectById } from "@/lib/api/projects"

//  fetch all projects
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"], // unique key for caching
    queryFn: getProjects,
  })
}

//  fetch single project
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id, // only runs if id is provided
  })
}
