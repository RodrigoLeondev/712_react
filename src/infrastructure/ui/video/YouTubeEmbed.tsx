import { useEffect, useRef } from 'react';
import type { YouTubeEmbedProps } from '@/infrastructure/ui/video/types';
import styles from './YouTubeEmbed.module.css';

const ID_PATTERNS = [
  /youtu\.be\/([^?&/]+)/,
  /\/embed\/([^?&/]+)/,
  /[?&]v=([^?&/]+)/,
];

const extractVideoId = (url: string) => {
  for (const pattern of ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return '';
};

export default function YouTubeEmbed({
  videoUrl,
  className,
  title = 'YouTube video player',
}: YouTubeEmbedProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = extractVideoId(videoUrl);
  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    loop: '1',
    ...(videoId ? { playlist: videoId } : {}),
  });
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  useEffect(() => {
    const postMessage = (action: 'playVideo' | 'pauseVideo') => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: action, args: '' }),
        '*',
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => postMessage(entry.isIntersecting ? 'playVideo' : 'pauseVideo'),
      { threshold: 0.3 },
    );
    if (frameRef.current) observer.observe(frameRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={[styles.frame, className].filter(Boolean).join(' ')}
    >
      <iframe
        ref={iframeRef}
        className={styles.iframe}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
