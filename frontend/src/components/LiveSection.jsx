import CameraTabs from "./CameraTabs";
import VideoFeed from "./VideoFeed";
import RightStats from "./RightStats";

export default function LiveSection() {
  return (
    <div className="px-8 pb-8">

      <div className="flex">

        <div className="w-[68%]">

          <CameraTabs />

          <VideoFeed />

        </div>

        <RightStats />

      </div>

    </div>
  );
}