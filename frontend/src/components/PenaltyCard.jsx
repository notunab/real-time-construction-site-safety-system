export default function PenaltyCard() {
  const breakdown = [
    {
      title: "No Helmet",
      value: 75,
      width: "75%",
      color: "bg-red-500",
    },
    {
      title: "No Vest",
      value: 55,
      width: "55%",
      color: "bg-yellow-500",
    },
    {
      title: "No PPE",
      value: 35,
      width: "35%",
      color: "bg-orange-500",
    },
    {
      title: "Vehicle",
      value: 12,
      width: "12%",
      color: "bg-gray-700",
    },
  ];

  return (
    <div className="bg-white h-full">

      {/* Header */}

      <div className="border-b border-[#ececec] px-5 py-4">

        <p className="text-[10px] uppercase tracking-[4px] text-gray-500 font-medium">
          ₹ PENALTIES ISSUED
        </p>

      </div>

      {/* Top Stats */}

      <div className="grid grid-cols-2">

        {/* Today */}

        <div className="border-r border-[#ececec] p-5">

          <p className="text-[10px] uppercase tracking-[4px] text-gray-500">
            TODAY
          </p>

          <h1 className="text-[44px] font-bold mt-3 leading-none text-[#DC2626]">
            ₹1,24,000
          </h1>

          <p className="text-[11px] uppercase tracking-[3px] text-gray-500 mt-3">
            177 INCIDENTS
          </p>

        </div>

        {/* Week */}

        <div className="p-5">

          <p className="text-[10px] uppercase tracking-[4px] text-gray-500">
            THIS WEEK
          </p>

          <h1 className="text-[44px] font-semibold mt-3 leading-none">
            ₹1,56,000
          </h1>

          <p className="text-[11px] uppercase tracking-[3px] text-gray-500 mt-3">
            ROLLING 7 DAY
          </p>

        </div>

      </div>

      {/* Breakdown */}

      <div className="border-t border-[#ececec] px-5 py-5">

        <p className="text-[10px] uppercase tracking-[4px] text-gray-500 font-medium mb-6">
          BREAKDOWN · TODAY
        </p>

        {breakdown.map((item, index) => (
          <div key={index} className="mb-5">

            <div className="flex justify-between text-[13px] mb-2">

              <span className="text-gray-700">
                {item.title}
              </span>

              <span className="font-medium">
                {item.value}
              </span>

            </div>

            <div className="h-[6px] bg-[#f3f3f3]">

              <div
                className={`${item.color} h-full`}
                style={{ width: item.width }}
              ></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}