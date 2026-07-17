export default function CameraTabs() {
  return (
    <div className="grid grid-cols-4 bg-white border-b border-[#ececec] h-[95px]">

      {/* Active Camera */}
      <div className="bg-[#111827] text-white px-7 py-2 flex flex-col justify-center">

        <p className="text-[10px] uppercase tracking-[3px] opacity-70">
          📹 CAM-01
        </p>

        <h3 className="text-[17px] font-semibold mt-2 leading-none">
          North Gate
        </h3>

        <p className="text-[10px] uppercase tracking-[3px] opacity-70 mt-2">
          PERIMETER ZONE A
        </p>

      </div>

      {/* Camera 2 */}
      <div className="border-l border-[#ececec] px-7 py-2 flex flex-col justify-center hover:bg-gray-50 transition cursor-pointer">

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500">
          📹 CAM-02
        </p>

        <h3 className="text-[17px] font-semibold text-[#222] mt-2 leading-none">
          Rig Platform
        </h3>

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mt-2">
          DRILL SITE
        </p>

      </div>

      {/* Camera 3 */}
      <div className="border-l border-[#ececec] px-7 py-2 flex flex-col justify-center hover:bg-gray-50 transition cursor-pointer">

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500">
          📹 CAM-03
        </p>

        <h3 className="text-[17px] font-semibold text-[#222] mt-2 leading-none">
          Storage Yard
        </h3>

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mt-2">
          SECTOR 4
        </p>

      </div>

      {/* Camera 4 */}
      <div className="border-l border-[#ececec] px-7 py-2 flex flex-col justify-center hover:bg-gray-50 transition cursor-pointer">

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500">
          📹 CAM-04
        </p>

        <h3 className="text-[17px] font-semibold text-[#222] mt-2 leading-none">
          Loading Bay
        </h3>

        <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mt-2">
          TRANSPORT ZONE
        </p>

      </div>

    </div>
  );
}