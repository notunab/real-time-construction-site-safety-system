import { useNavigate } from "react-router-dom";
import logo from "../assets/ongc_logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-[#ececec] flex items-center justify-between px-8 shadow-sm">

      {/* LEFT */}

      <div className="flex items-center">

        {/* Logo */}

        <div className="flex items-center pr-8 border-r border-[#ececec]">

          <img
            src={logo}
            alt="ONGC"
            className="w-[58px] h-[58px] object-contain"
          />

        </div>

        {/* Title */}

        <div className="ml-8">

          <h1 className="text-[18px] font-semibold text-[#1d1d1d] leading-none">
            Site Safety · Control Room
          </h1>

          <p className="mt-2 text-[11px] tracking-[4px] uppercase text-[#8b8b8b] font-medium">
            YOLOV8 + SAHI · REAL-TIME PPE & VEHICLE DETECTION
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-12">

        {/* Time */}

        <div className="text-right">

          <div className="flex items-center justify-end gap-2">

            <span className="text-[12px] text-[#7d7d7d]">
              🕒
            </span>

            <span className="text-[15px] text-[#4b4b4b] font-medium">
              15 : 34 : 27
            </span>

          </div>

          <p className="mt-2 text-[11px] tracking-[3px] uppercase text-[#8b8b8b]">
            WED, 15 JUL 2026
          </p>

        </div>

        {/* Supervisor */}

        <div className="text-right">

          <h2 className="text-[17px] font-semibold text-[#202020]">
            Safety Supervisor
          </h2>

          <p className="mt-2 text-[11px] tracking-[3px] uppercase text-[#8b8b8b]">
            SUPERVISOR · ADMIN@ONGC.CO.IN
          </p>

        </div>

        {/* Logout */}

        <button
    onClick={() => navigate("/")}
    className="border border-gray-300 px-8 py-3 hover:bg-gray-100 transition"
>

          ⤴ Logout

        </button>

      </div>

    </header>
  );
}