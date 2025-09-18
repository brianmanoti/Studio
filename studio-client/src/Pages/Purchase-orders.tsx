
import { Link } from "react-router-dom";

const PurchaseOrders = () => {
  // Example dummy data
  const orders = [
    { id: "PO-1001", supplier: "ABC Supplies", date: "2025-09-01", total: 1200, status: "Pending" },
    { id: "PO-1002", supplier: "XYZ Traders", date: "2025-09-05", total: 850, status: "Approved" },
    { id: "PO-1003", supplier: "Global Parts Ltd", date: "2025-09-10", total: 4300, status: "Shipped" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Purchase Orders</h1>
        <Link
          to="/dashboard/purchase-orders/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + New Order
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="px-6 py-3 border-b">Order ID</th>
              <th className="px-6 py-3 border-b">Supplier</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b">Total ($)</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b font-medium">{order.id}</td>
                <td className="px-6 py-3 border-b">{order.supplier}</td>
                <td className="px-6 py-3 border-b">{order.date}</td>
                <td className="px-6 py-3 border-b">${order.total.toLocaleString()}</td>
                <td className="px-6 py-3 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3 border-b">
                  <Link
                    to={`/dashboard/purchase-orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrders;
