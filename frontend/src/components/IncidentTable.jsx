import { useState } from "react";

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function IncidentTable() {
  const incidents = [
    {
      date: "15 Jul 2026",
      time: "15:34:15",
      id: "9B5B0B26",
      camera: "North Gate",
      person: "V-299",
      violation: "No Helmet",
      severity: "HIGH",
      penalty: "₹500",
      confidence: "0.98",
      status: "Open",
    },
    {
      date: "15 Jul 2026",
      time: "15:33:41",
      id: "A4D9C128",
      camera: "Rig Platform",
      person: "V-184",
      violation: "No Vest",
      severity: "MEDIUM",
      penalty: "₹300",
      confidence: "0.87",
      status: "Review",
    },
    {
      date: "15 Jul 2026",
      time: "15:32:56",
      id: "D881E541",
      camera: "Storage Yard",
      person: "V-512",
      violation: "Unauthorized Vehicle",
      severity: "HIGH",
      penalty: "₹1000",
      confidence: "0.93",
      status: "Closed",
    },
    {
      date: "15 Jul 2026",
      time: "15:31:12",
      id: "F192CC73",
      camera: "Loading Bay",
      person: "V-078",
      violation: "No Helmet",
      severity: "HIGH",
      penalty: "₹500",
      confidence: "0.95",
      status: "Open",
    },
    {
      date: "15 Jul 2026",
      time: "15:29:44",
      id: "B552AD91",
      camera: "North Gate",
      person: "V-337",
      violation: "No Gloves",
      severity: "LOW",
      penalty: "₹200",
      confidence: "0.81",
      status: "Closed",
    },
  ];

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filtered = incidents.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.person.toLowerCase().includes(search.toLowerCase()) ||
      item.camera.toLowerCase().includes(search.toLowerCase()) ||
      item.violation.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "All" || item.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const handleExport = () => {
    const headers = [
      "Time",
      "Incident ID",
      "Camera",
      "Worker",
      "Violation",
      "Severity",
      "Penalty",
      "Confidence",
      "Status",
    ];
    const rows = filtered.map((item) => [
      `${item.date}, ${item.time}`,
      item.id,
      item.camera,
      item.person,
      item.violation,
      item.severity,
      item.penalty,
      item.confidence,
      item.status,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "incident_log.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white h-full">

      {/* Header */}

      <div className="border-b border-gray-300 px-3 py-2 flex items-center justify-between flex-wrap gap-2">

        <div className="flex items-center gap-2">

          <p className="text-[11px] font-semibold tracking-[1.5px] text-gray-800">
            INCIDENT &amp; VIOLATION LOG
          </p>

          <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[9px] font-semibold uppercase tracking-[0.5px]">
            {incidents.length} Entries
          </span>

        </div>

        <div className="flex items-center gap-1.5">

          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search person, camera, violation..."
              className="pl-6 pr-2 py-1 text-[11px] border border-gray-300 rounded w-44 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-1.5 py-1 text-[11px] border border-gray-300 rounded text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="All">All severities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-2 py-1 bg-black text-white text-[11px] font-semibold rounded hover:bg-gray-800 transition"
          >
            <DownloadIcon className="w-3 h-3" />
            Export CSV
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="w-full">

        <table className="w-full table-fixed text-[11px]">

          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "9%" }} />
          </colgroup>

          <thead className="bg-gray-50">

            <tr className="border-b border-gray-300">

              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">TIME</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">INCIDENT ID</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">CAMERA</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">WORKER</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">VIOLATION</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">SEVERITY</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">PENALTY</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">CONFIDENCE</th>
              <th className="text-left px-2 py-2 text-[9.5px] uppercase tracking-[0.5px] text-gray-500 font-normal">STATUS</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >

                <td className="px-2 py-2 font-medium truncate">
                  {item.date}, {item.time}
                </td>

                <td className="px-2 py-2 font-semibold truncate">
                  {item.id}
                </td>

                <td className="px-2 py-2 truncate">
                  {item.camera}
                </td>

                <td className="px-2 py-2 truncate">
                  {item.person}
                </td>

                <td className="px-2 py-2">

                  <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[9.5px] font-semibold truncate max-w-full">

                    {item.violation}

                  </span>

                </td>

                <td className="px-2 py-2">

                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.5px] rounded
                      ${
                        item.severity === "HIGH"
                          ? "bg-red-600 text-white"
                          : item.severity === "MEDIUM"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-600 text-white"
                      }`}
                  >
                    {item.severity}
                  </span>

                </td>

                <td className="px-2 py-2 font-bold text-red-600 truncate">
                  {item.penalty}
                </td>

                <td className="px-2 py-2 text-gray-700 truncate">
                  {item.confidence}
                </td>

                <td className="px-2 py-2">

                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold truncate max-w-full ${
                      item.status === "Open"
                        ? "bg-red-100 text-red-700"
                        : item.status === "Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}