import logo from "../assets/ongc_logo.png";
import bg from "../assets/construction_bg.jpg";

export default function HeroSection() {
  return (
    <div
      className="hidden lg:block w-1/2 h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-between px-12 py-12">

        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 mb-16">
            <img
              src={logo}
              alt="ONGC"
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="text-gray-300 text-4xl uppercase tracking-wider font-bold">
                ONGC
              </p>
              <p className="text-white text-sm font-bold">
                SAFETY OPS
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <div>
            <h1 className="text-white text-5xl font-black leading-tight mb-2">
              Building a Safer Future
            </h1>
            <h2 className="text-red-500 text-5xl font-black mb-6">
              Every Day.
            </h2>

            {/* Red Line */}
            <div className="w-16 h-1 bg-red-600 rounded-full mb-6" />
          </div>
        </div>

        {/* System Status Card */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 max-w-sm">
          <p className="text-xs text-gray-300 mb-3 uppercase tracking-wider font-bold">
            System Status
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-green-400 font-bold text-sm">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
              All Systems Operational
            </p>
            <p className="text-xs text-gray-300">
              Last updated: 15:34:27 IST
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
