function Summary() {
  const bills = JSON.parse(localStorage.getItem("bills")) || [];
  const today = new Date().toDateString();

  const todayBills = bills.filter(b => b.date === today);

  const totalSales = todayBills.reduce((s, b) => s + b.total, 0);
  const totalProfit = todayBills.reduce((s, b) => s + b.profit, 0);
  const itemsSold = todayBills.reduce(
    (s, b) => s + b.items.reduce((q, i) => q + i.qty, 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Daily Summary</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <p>Total Bills: {todayBills.length}</p>
        <p>Total Items Sold: {itemsSold}</p>
        <p>Total Sales: ₹{totalSales}</p>
        <p>Total Profit: ₹{totalProfit}</p>
      </div>
    </div>
  );
}

export default Summary;