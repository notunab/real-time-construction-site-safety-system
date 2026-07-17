import Header from "./Header";
import CameraTabs from "./CameraTabs";
import VideoFeed from "./VideoFeed";
import RightStats from "./RightStats";
import PenaltyCard from "./PenaltyCard";
import IncidentTable from "./IncidentTable";

export default function MainContent() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] overflow-y-auto">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-8 py-6">

        {/* Top Section */}
        <div className="flex items-end justify-between mb-8">

          <div>

            <p className="label mb-3">
              LIVE OPERATIONS
            </p>

            <h1 className="title text-[50px] leading-[0.95] text-gray-900">
              Perimeter · Zone Alpha.
            </h1>

          </div>

          <div className="flex gap-3">

            <div className="bg-[#111827] text-white px-5 py-3">
              <p className="small-label text-white">
                SYSTEM · NOMINAL
              </p>
            </div>

            <div className="border border-gray-300 bg-white px-5 py-3">
              <p className="small-label text-gray-700">
                4 CAMERAS ONLINE
              </p>
            </div>

            <div className="border border-gray-300 bg-white px-5 py-3">
              <p className="small-label text-gray-700">
                MODEL · YOLOV8N
              </p>
            </div>

          </div>

        </div>

        {/* Camera + Stats */}
        <div className="flex bg-white border border-gray-300">

          {/* Left Side */}
          <div className="w-[69%] border-r border-gray-300">

            {/* LIVE bar */}
            <div className="flex items-center justify-between h-14 px-6 border-b border-[#ececec] bg-white">

              <div className="flex items-center gap-4">

                <div className="bg-[#111827] text-white px-4 py-2 flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-red-500"></span>

                  <span className="text-[12px] uppercase tracking-[2px]">
                    LIVE
                  </span>

                </div>

                <span className="text-[12px] uppercase tracking-[2px] text-gray-500">
                  CAM-01
                </span>

                <span className="text-[18px] font-semibold">
                  North Gate
                </span>

              </div>

              <div className="flex items-center gap-8 text-[12px] uppercase tracking-[2px] text-gray-500">

                <span>YOLOV8N + SAHI</span>

                <span>
                  LATENCY <strong className="text-[#111827]">73 MS</strong>
                </span>

                <span>
                  VIOLATIONS <strong className="text-[#111827]">4</strong>
                </span>

              </div>

            </div>

            <CameraTabs />

            <VideoFeed />

          </div>

          {/* Right Side */}
          <div className="w-[31%]">

            <RightStats />

          </div>

        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-12 bg-white border border-gray-300 border-t-0">

          <div className="col-span-4 border-r border-gray-300">
            <PenaltyCard />
          </div>

          <div className="col-span-8">
            <IncidentTable />
          </div>

        </div>

      </main>

    </div>
  );
}