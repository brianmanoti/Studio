import { useState, useEffect } from "react"

export default function CreateExpenseForm({ estimates }) {
  const [form, setForm] = useState({
    projectId: "",
    reference: "",
    company: "",
    status: "pending",
    date: "",
    deliveryDate: "",
    deliveryAddress: "",
    notes: "",
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    vendorPhone: "",
    vendorAddress: "",
    items: [{ description: "", quantity: 0, unit: "", unitPrice: 0 }],
    amount: 0,
    estimateId: "",
    estimateLevel: "estimate",
    estimateTargetId: ""
  })

  const [selectedEstimate, setSelectedEstimate] = useState(null)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Handle items change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target
    const updatedItems = [...form.items]
    updatedItems[index][name] = value
    setForm({ ...form, items: updatedItems })
  }

  // Add new item row
  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: "", quantity: 0, unit: "", unitPrice: 0 }]
    })
  }

  // When estimate changes, set selected
  useEffect(() => {
    const est = estimates.find((est) => est.estimateId === form.estimateId)
    setSelectedEstimate(est || null)
  }, [form.estimateId, estimates])

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting expense:", form)

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    console.log("Response:", data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-xl font-bold">Create Expense</h2>

      {/* Project */}
      <input
        type="text"
        name="projectId"
        value={form.projectId}
        onChange={handleChange}
        placeholder="Project ID"
        className="w-full border p-2 rounded"
        required
      />

      {/* Estimate */}
      <select
        name="estimateId"
        value={form.estimateId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Estimate</option>
        {estimates.map((est) => (
          <option key={est.estimateId} value={est.estimateId}>
            {est.name} ({est.estimateId})
          </option>
        ))}
      </select>

      {/* Level Selector */}
      <select
        name="estimateLevel"
        value={form.estimateLevel}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="estimate">Estimate</option>
        <option value="group">Group</option>
        <option value="section">Section</option>
        <option value="subsection">Subsection</option>
      </select>

      {/* Target ID depending on level */}
      {selectedEstimate && form.estimateLevel !== "estimate" && (
        <select
          name="estimateTargetId"
          value={form.estimateTargetId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select {form.estimateLevel}</option>

          {form.estimateLevel === "group" &&
            selectedEstimate.groups.map((grp) => (
              <option key={grp.grpId} value={grp.grpId}>
                {grp.name} ({grp.grpId})
              </option>
            ))}

          {form.estimateLevel === "section" &&
            selectedEstimate.groups.flatMap((grp) =>
              grp.sections.map((sec) => (
                <option key={sec.secId} value={sec.secId}>
                  {sec.name} ({sec.secId})
                </option>
              ))
            )}

          {form.estimateLevel === "subsection" &&
            selectedEstimate.groups.flatMap((grp) =>
              grp.sections.flatMap((sec) =>
                sec.subsections.map((sub) => (
                  <option key={sub.subId} value={sub.subId}>
                    {sub.name} ({sub.subId})
                  </option>
                ))
              )
            )}
        </select>
      )}

      {/* Vendor Info */}
      <input
        type="text"
        name="vendorName"
        value={form.vendorName}
        onChange={handleChange}
        placeholder="Vendor Name"
        className="w-full border p-2 rounded"
        required
      />

      {/* Items */}
      <div className="space-y-4">
        <h3 className="font-semibold">Items</h3>
        {form.items.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(i, e)}
              placeholder="Description"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(i, e)}
              placeholder="Qty"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="unit"
              value={item.unit}
              onChange={(e) => handleItemChange(i, e)}
              placeholder="Unit"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(i, e)}
              placeholder="Unit Price"
              className="border p-2 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
      >
        Submit Expense
      </button>
    </form>
  )
}
