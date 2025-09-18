"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axios"

// Zod schema aligned with Mongoose
const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  client: z.string().min(1, "Client is required"), // ObjectId as string
  address: z.string().min(5, "Address is required"),
  status: z.enum(["Pending", "In Progress", "Completed", "On Hold", "Cancelled", "draft"]).optional(),
  value: z.string().min(1, "Project value is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  onSuccess?: () => void
}

const ProjectForm = ({ onSuccess }: ProjectFormProps) => {
  const [clients, setClients] = useState<{ _id: string; name: string }[]>([])

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      client: "",
      address: "",
      status: "draft",
      value: "",
      startDate: "",
      endDate: "",
    },
  })

  // Fetch clients for dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axiosInstance.get("/api/clients")
        setClients(res.data)
      } catch (error) {
        console.error("Failed to load clients", error)
      }
    }
    fetchClients()
  }, [])

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      await axiosInstance.post("/api/projects", data)
      form.reset()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Create New Project</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700">Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" className="border-blue-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Client */}
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700">Client</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address & Value side by side */}
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" className="border-blue-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Project Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project value" className="border-blue-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="border-blue-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">End Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="border-blue-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700">Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Project
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProjectForm
