export default function VideoFeed() {
  return (
    <div className="bg-black">

      <div className="relative overflow-hidden">

        {/* Video */}
        <video
          src="/construction_site.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[640px] object-cover"
        />

        {/* ================= TOP BAR ================= */}

        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">

          <div>
            <p className="small-label text-white">
              CAMERA 01
            </p>

            <h3 className="title text-[24px] text-white mt-1">
              North Gate
            </h3>
          </div>

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>

              <p className="small-label text-white">
                LIVE
              </p>
            </div>

            <p className="small-label text-white">
              15:34:27
            </p>

          </div>

        </div>

        {/* ================= AI DETECTIONS ================= */}

        {/* Worker 1 */}

        <div className="absolute top-[42%] left-[12%]">

          <div className="w-24 h-56 border-[4px] border-red-600 rounded-sm"></div>

          <div className="absolute -top-8 left-0 bg-red-600 text-white px-3 py-1 rounded-sm">

            <p className="text-[10px] font-bold tracking-[1px]">
              NO HELMET · 91%
            </p>

          </div>

        </div>

        {/* Worker 2 */}

        <div className="absolute top-[28%] left-[38%]">

          <div className="w-28 h-64 border-[4px] border-yellow-400 rounded-sm"></div>

          <div className="absolute -top-8 left-0 bg-yellow-400 text-black px-3 py-1 rounded-sm">

            <p className="text-[10px] font-bold tracking-[1px]">
              NO VEST · 91%
            </p>

          </div>

        </div>

        {/* Worker 3 */}

        <div className="absolute top-[45%] left-[49%]">

          <div className="w-24 h-40 border-[4px] border-green-500 rounded-sm"></div>

          <div className="absolute -top-8 left-0 bg-green-500 text-white px-3 py-1 rounded-sm">

            <p className="text-[10px] font-bold tracking-[1px]">
              PPE OK · 84%
            </p>

          </div>

        </div>

        {/* Vehicle */}

        <div className="absolute bottom-[12%] left-[58%]">

          <div className="w-44 h-24 border-[4px] border-orange-400 rounded-sm"></div>

          <div className="absolute -top-8 left-0 bg-orange-400 text-black px-3 py-1 rounded-sm">

            <p className="text-[10px] font-bold tracking-[1px]">
              UNAUTHORIZED VEHICLE · 81%
            </p>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 flex justify-between items-center">

          <p className="small-label text-white">
            AI MODEL · YOLOv8 + SAHI
          </p>

          <p className="small-label text-white">
            FRAME RATE · 30 FPS
          </p>

        </div>

      </div>

    </div>
  );
}