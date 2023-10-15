import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../util/format-duration';
import { formatTimeAgo } from '../util/format-time-ago';

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
});

const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  const watchUrl = `/watch?v=${id}`;
  const userUrl = `/@${channel.id}`;

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={watchUrl} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? 'rounded-none' : 'rounded-xl'
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
        />
      </a>
      <div className="flex gap-2">
        <a href={userUrl} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            className="w-12 h-12 rounded-full"
            alt="profile"
          />
        </a>
        <div className="flex flex-col">
          <a href=""></a>
          <a href={watchUrl} className="font-bold">
            {title}
          </a>
          <a href={userUrl} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views{' '}
            <span className="text-xs">⚫</span> {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
