import  { useState,  } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle,  Clock, Users, FileText, CreditCard } from 'lucide-react';

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock data - would come from API
  const [projects] = useState([
    {
      id: 1,
      name: "Office Building Construction",
      code: "OBC-2024-001",
      status: "active",
      client: "Tech Corp Inc",
      budget: 500000,
      spent: 180000,
      committed: 120000,
      profitMargin: 12,
      targetMargin: 15,
      startDate: "2024-01-15",
      endDate: "2024-08-15",
      manager: "John Smith"
    },
    {
      id: 2,
      name: "Residential Complex",
      code: "RC-2024-002",
      status: "active",
      client: "Urban Developers",
      budget: 750000,
      spent: 425000,
      committed: 85000,
      profitMargin: 18,
      targetMargin: 20,
      startDate: "2024-02-01",
      endDate: "2024-12-01",
      manager: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Shopping Mall Renovation",
      code: "SMR-2024-003",
      status: "planning",
      client: "Retail Holdings",
      budget: 300000,
      spent: 15000,
      committed: 45000,
      profitMargin: 0,
      targetMargin: 12,
      startDate: "2024-03-01",
      endDate: "2024-07-01",
      manager: "Mike Davis"
    }
  ]);

  const [financialSummary] = useState({
    totalRevenue: 1550000,
    totalCosts: 620000,
    netProfit: 930000,
    activeProjects: 3,
    completedThisMonth: 2,
    pendingPOs: 8,
    overduePayments: 3
  });

  const [expensesByCategory] = useState([
    { name: 'Materials', value: 250000, color: '#0088FE' },
    { name: 'Labor', value: 180000, color: '#00C49F' },
    { name: 'Subcontractors', value: 120000, color: '#FFBB28' },
    { name: 'Equipment', value: 50000, color: '#FF8042' },
    { name: 'Utilities', value: 20000, color: '#8884D8' }
  ]);

  const [monthlyTrend] = useState([
    { month: 'Jan', budget: 400000, actual: 380000, projected: 420000 },
    { month: 'Feb', budget: 500000, actual: 485000, projected: 520000 },
    { month: 'Mar', budget: 450000, actual: 420000, projected: 460000 },
    { month: 'Apr', budget: 600000, actual: 580000, projected: 610000 },
    { month: 'May', budget: 550000, actual: 520000, projected: 570000 },
    { month: 'Jun', budget: 700000, actual: 650000, projected: 720000 }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'on_hold': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getBudgetHealthColor = (percentage) => {
    if (percentage < 70) return 'text-green-600';
    if (percentage < 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ProjectCard = ({ project }) => {
    const utilizationPercentage = ((project.spent + project.committed) / project.budget) * 100;
    const remaining = project.budget - project.spent - project.committed;

    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedProject(project)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.code} • {project.client}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="text-lg font-semibold text-gray-900">${project.budget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className={`text-lg font-semibold ${getBudgetHealthColor(utilizationPercentage)}`}>
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Budget Utilization</span>
            <span className={getBudgetHealthColor(utilizationPercentage)}>
              {utilizationPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${utilizationPercentage > 90 ? 'bg-red-500' : utilizationPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Spent: ${project.spent.toLocaleString()}</span>
          <span>Committed: ${project.committed.toLocaleString()}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Profit Margin</span>
            <span className={`text-sm font-medium ${project.profitMargin >= project.targetMargin ? 'text-green-600' : 'text-red-600'}`}>
              {project.profitMargin}% (Target: {project.targetMargin}%)
            </span>
          </div>
        </div>
      </div>
    );
  };

  const FinancialKPIs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">${financialSummary.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Net Profit</p>
            <p className="text-2xl font-semibold text-gray-900">${financialSummary.netProfit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Pending POs</p>
            <p className="text-2xl font-semibold text-gray-900">{financialSummary.pendingPOs}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <Clock className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Overdue Payments</p>
            <p className="text-2xl font-semibold text-gray-900">{financialSummary.overduePayments}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectDetailModal = () => {
    if (!selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
            <button 
              onClick={() => setSelectedProject(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Budget Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Budget:</span>
                  <span className="font-semibold">${selectedProject.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spent:</span>
                  <span>${selectedProject.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Committed:</span>
                  <span>${selectedProject.committed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Remaining:</span>
                  <span className="font-semibold text-green-600">
                    ${(selectedProject.budget - selectedProject.spent - selectedProject.committed).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Profitability</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Margin:</span>
                  <span className="font-semibold">{selectedProject.profitMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Margin:</span>
                  <span>{selectedProject.targetMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Variance:</span>
                  <span className={selectedProject.profitMargin >= selectedProject.targetMargin ? 'text-green-600' : 'text-red-600'}>
                    {(selectedProject.profitMargin - selectedProject.targetMargin).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{selectedProject.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span>{selectedProject.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Manager:</span>
                  <span>{selectedProject.manager}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Recent Expenses</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Steel Materials</p>
                    <p className="text-sm text-gray-500">Materials • Mar 15, 2024</p>
                  </div>
                  <span className="font-semibold">$25,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Electrical Work</p>
                    <p className="text-sm text-gray-500">Subcontractor • Mar 12, 2024</p>
                  </div>
                  <span className="font-semibold">$18,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Equipment Rental</p>
                    <p className="text-sm text-gray-500">Equipment • Mar 10, 2024</p>
                  </div>
                  <span className="font-semibold">$5,200</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Pending POs</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <div>
                    <p className="font-medium">Concrete Supply</p>
                    <p className="text-sm text-gray-500">PO-2024-045 • Pending Approval</p>
                  </div>
                  <span className="font-semibold">$32,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <div>
                    <p className="font-medium">HVAC Installation</p>
                    <p className="text-sm text-gray-500">PO-2024-046 • Awaiting Delivery</p>
                  </div>
                  <span className="font-semibold">$28,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                New Project
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {['overview', 'projects', 'expenses', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <FinancialKPIs />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Monthly Trend Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="budget" stroke="#8884d8" name="Budget" />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
                    <Line type="monotone" dataKey="projected" stroke="#ffc658" name="Projected" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Expense Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Projects Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
                <span className="text-sm text-gray-500">{projects.filter(p => p.status === 'active').length} active projects</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(project => project.status === 'active').map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">All Projects</h3>
                <div className="flex space-x-4">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Planning</option>
                    <option>Completed</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    New Project
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                  Add Expense
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 15, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Steel Materials Purchase</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Office Building</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Materials</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$25,000</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 12, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Electrical Installation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Residential Complex</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Subcontractor</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$18,500</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 10, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Equipment Rental - Crane</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Office Building</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Equipment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$5,200</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Budget vs Actual Report */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual by Project</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={projects}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="code" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                    <Bar dataKey="committed" fill="#ffc658" name="Committed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Profit Margin Analysis */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Margin Analysis</h3>
                <div className="space-y-4">
                  {projects.map(project => {
                    const marginHealth = project.profitMargin >= project.targetMargin ? 'healthy' : 'warning';
                    return (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <span className={`text-sm font-medium ${marginHealth === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                            {project.profitMargin}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>Target: {project.targetMargin}%</span>
                          <span>Variance: {(project.profitMargin - project.targetMargin).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${marginHealth === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${(project.profitMargin / project.targetMargin) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Reports Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <FileText className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">P&L Statement</h4>
                  <p className="text-sm text-gray-500">Generate profit & loss report</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <CreditCard className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Cash Flow</h4>
                  <p className="text-sm text-gray-500">View cash flow analysis</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <Users className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Payroll Summary</h4>
                  <p className="text-sm text-gray-500">Employee payment summary</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal />
    </div>
  );
};

export default FinancialDashboard;