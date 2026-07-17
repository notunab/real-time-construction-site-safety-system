export default function RightStats() {
  return (
    <div className="w-full bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 px-6 py-5">

        <div>
          <p className="small-label">
            AI ANALYTICS
          </p>

          <h2 className="title text-[26px] mt-1">
            Detection Status
          </h2>
        </div>

        <div className="bg-[#111827] px-4 py-2">
          <p className="small-label text-white">
            REAL-TIME
          </p>
        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2">

        {/* Active Violations */}

        <div className="border-r border-b border-gray-300 px-6 py-6">

          <p className="small-label">
            ACTIVE VIOLATIONS
          </p>

          <h1 className="number-red mt-4">
            195
          </h1>

          <p className="small-label mt-4 text-red-600">
            ▲ REQUIRES ACTION
          </p>

        </div>

        {/* Compliance */}

        <div className="border-b border-gray-300 px-6 py-6">

          <p className="small-label">
            PPE COMPLIANCE
          </p>

          <h1 className="number-red mt-4">
            75%
          </h1>

          <p className="small-label mt-4 text-red-600">
            ▼ BELOW TARGET
          </p>

        </div>

        {/* Incidents */}

        <div className="border-r border-b border-gray-300 px-6 py-6">

          <p className="small-label">
            INCIDENTS TODAY
          </p>

          <h1 className="number-black mt-4">
            174
          </h1>

          <p className="small-label mt-4">
            LAST 24 HOURS
          </p>

        </div>

        {/* Logged */}

        <div className="border-b border-gray-300 px-6 py-6">

          <p className="small-label">
            TOTAL LOGGED
          </p>

          <h1 className="number-black mt-4">
            207
          </h1>

          <p className="small-label mt-4">
            DATABASE RECORDS
          </p>

        </div>

      </div>

      {/* Compliance Index */}

      <div className="px-6 py-7">

        <p className="label">
          SITE COMPLIANCE INDEX
        </p>

        <div className="flex justify-between items-end mt-6">

          <div>

            <h1 className="big-percentage">
              75%
            </h1>

            <p className="small-label mt-2">
              TARGET ≥ 90%
            </p>

          </div>

          <div className="text-right">

            <p className="small-label text-red-600">
              BELOW TARGET
            </p>

            <p className="title text-[22px] text-red-600 mt-1">
              -15%
            </p>

          </div>

        </div>

        {/* Progress Bar */}

        <div className="mt-8">

          <div className="w-full h-[10px] bg-gray-200 overflow-hidden">

            <div className="h-full w-[75%] bg-red-600"></div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-gray-300 px-6 py-4 flex justify-between">

        <div>

          <p className="small-label">
            MODEL
          </p>

          <p className="title text-[18px] mt-1">
            YOLOv8 + SAHI
          </p>

        </div>

        <div className="text-right">

          <p className="small-label">
            LAST UPDATE
          </p>

          <p className="title text-[18px] mt-1">
            0.04 s
          </p>

        </div>

      </div>

    </div>
  );
}