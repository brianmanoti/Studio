
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PurchaseOrdersTable = () => {
  const data = [
    {
      _id: "1",
      poNumber: "PO-001",
      reference: "Electricity",
      company: "Globex",
      vendorName: "County Government",
      amount: 15500,
      status: "approved",
      deliveryDate: "2025-08-28T00:00:00.000Z",
    },
    {
      _id: "2",
      poNumber: "PO-002",
      reference: "Water Supply",
      company: "Initech",
      vendorName: "Aqua Services Ltd",
      amount: 22500,
      status: "pending",
      deliveryDate: "2025-09-15T00:00:00.000Z",
    },
    {
      _id: "3",
      poNumber: "PO-003",
      reference: "Construction",
      company: "Umbrella Corp",
      vendorName: "BuildIt Co.",
      amount: 50000,
      status: "rejected",
      deliveryDate: "2025-10-05T00:00:00.000Z",
    },
    {
      _id: "4",
      poNumber: "PO-004",
      reference: "Office Supplies",
      company: "Stark Industries",
      vendorName: "OfficeMart",
      amount: 3200,
      status: "approved",
      deliveryDate: "2025-07-21T00:00:00.000Z",
    },
  ];

  const statusBadge = (status) => {
    const color =
      status === "approved"
        ? "bg-green-100 text-green-700"
        : status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Purchase Orders
      </h1>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableCaption>A list of purchase orders.</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-600 text-white">
              <TableHead className="text-white">PO Number</TableHead>
              <TableHead className="text-white">Reference</TableHead>
              <TableHead className="text-white">Company</TableHead>
              <TableHead className="text-white">Vendor</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Delivery Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id} className="hover:bg-blue-50">
                <TableCell>{row.poNumber}</TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>KSh {row.amount.toLocaleString()}</TableCell>
                <TableCell>{statusBadge(row.status)}</TableCell>
                <TableCell>
                  {new Date(row.deliveryDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrdersTable;
