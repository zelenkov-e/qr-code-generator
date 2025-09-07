import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {
  src: string;
}
const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <div className={styles.videoWrapper}>
      <video className={styles.video} controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};
export default VideoPlayer;
