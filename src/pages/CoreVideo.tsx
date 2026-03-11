import heroVideo from "@/assets/hero-video-core.mp4";

const CoreVideo = () => (
  <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <video
      autoPlay
      muted
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      className="w-full h-screen object-cover"
      style={{ pointerEvents: "none", WebkitAppearance: "none" }}
      ref={(el) => {
        if (el) {
          el.removeAttribute("controls");
          el.playbackRate = 0.75;
          el.play().catch(() => {});
        }
      }}
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  </div>
);

export default CoreVideo;
