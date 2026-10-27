export function BudgetCard() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Estimated Budget Breakdown</h3>
            <div className="space-y-4">
                <BudgetRow label="Travel & Moving" amount={3500} color="bg-blue-500" />
                <BudgetRow label="Accommodation (3N)" amount={4500} color="bg-purple-500" />
                <BudgetRow label="Food & Drinks" amount={2000} color="bg-orange-500" />
                <BudgetRow label="Activities" amount={1500} color="bg-green-500" />

                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Estimate</span>
                    <span className="font-bold text-xl text-primary">₹11,500</span>
                </div>
            </div>
        </div>
    );
}

function BudgetRow({ label, amount, color }: { label: string, amount: number, color: string }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-gray-600">{label}</span>
            </div>
            <span className="font-medium text-gray-900">₹{amount.toLocaleString()}</span>
        </div>
    )
}

export function PackingList() {
    const items = ["Comfortable walking shoes", "Power bank", "Sunscreen & sunglasses", "Light rain jacket", "Personal medication"];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Smart Packing List</h3>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-md border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400">
                            {/* Mock checkbox state */}
                        </div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
