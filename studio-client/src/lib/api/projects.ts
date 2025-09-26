import axiosInstance from "../axios"

export const getProjects = async () => {
  const res = await axiosInstance.get("/api/projects")
  return res.data
}

// ✅ Example: get single project
export const getProjectById = async (id: string) => {
  const res = await axiosInstance.get(`/api/projects/${id}`)
  return res.data
}
