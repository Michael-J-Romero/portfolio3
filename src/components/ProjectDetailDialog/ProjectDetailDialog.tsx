import { ExternalLink, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { useVariantPanel } from '../../variants';
import styles from './ProjectDetailDialog.module.scss';

interface ProjectDetailDialogProps {
  children: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  headerAction?: ReactNode;
  footerAction?: ReactNode;
  mediaHref?: string;
  content?: ReactNode;
  mainContent?: ReactNode;
  asideContent?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  videoUrl?: string;
  mediaLabel?: ReactNode;
  dialogClassName?: string;
  contentClassName?: string;
  mediaClassName?: string;
  mediaLabelClassName?: string;
  titleClassName?: string;
  metaClassName?: string;
  closeClassName?: string;
  overlayClassName?: string;
  mainClassName?: string;
  asideClassName?: string;
}

export default function ProjectDetailDialog({
  children,
  title,
  meta,
  headerAction,
  footerAction,
  mediaHref,
  content,
  mainContent,
  asideContent,
  imageSrc,
  imageAlt,
  videoUrl,
  mediaLabel,
  dialogClassName,
  contentClassName,
  mediaClassName,
  mediaLabelClassName,
  titleClassName,
  metaClassName,
  closeClassName,
  overlayClassName,
  mainClassName,
  asideClassName,
}: ProjectDetailDialogProps) {
  const { variantState, resolvedContent } = useVariantPanel();
  const [open, setOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [directVideoSrc, setDirectVideoSrc] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const hasMedia = Boolean(videoUrl || imageSrc);
  const resolvedMainContent = mainContent ?? content;
  const isDirectVideoFile = useMemo(() => {
    if (!videoUrl) {
      return false;
    }

    const normalizedVideoUrl = videoUrl.split('#')[0];
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(normalizedVideoUrl);
  }, [videoUrl]);

  const autoplayVideoSrc = useMemo(() => {
    if (!videoUrl || isDirectVideoFile) {
      return null;
    }

    try {
      const url = new URL(videoUrl);
      url.searchParams.set('autoplay', '1');
      url.searchParams.set('rel', '0');
      url.searchParams.set('enablejsapi', '1');
      if (typeof window !== 'undefined') {
        url.searchParams.set('origin', window.location.origin);
      }
      return url.toString();
    } catch {
      return `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&rel=0&enablejsapi=1`;
    }
  }, [videoUrl, isDirectVideoFile]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      if (autoplayVideoSrc) {
        setVideoSrc(autoplayVideoSrc);
      }

      if (isDirectVideoFile && videoUrl) {
        setDirectVideoSrc(videoUrl);
      }

      setOpen(true);
      return;
    }

    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
      iframeRef.current.remove();
    }

    flushSync(() => {
      setVideoSrc(null);
      setDirectVideoSrc(null);
    });

    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={clsx(styles.overlay, overlayClassName)} />
        <Dialog.Content
          className={clsx(
            styles.dialog,
            styles[`size-${variantState.dialogSize}`],
            dialogClassName,
          )}
        >
          <Dialog.Close className={clsx(styles.closeButton, closeClassName)} aria-label={resolvedContent.dialogs.closeAriaLabel}>
            <X size={18} />
          </Dialog.Close>

          {hasMedia ? (
            <div className={clsx(styles.media, mediaClassName)}>
              {videoUrl ? (
                isDirectVideoFile ? (
                  <div className={styles.videoWrapper}>
                    <video
                      src={directVideoSrc ?? undefined}
                      className={styles.videoFrame}
                      controls
                      autoPlay
                      loop
                      preload="auto"
                      playsInline
                    />
                  </div>
                ) : videoSrc ? (
                  <div className={styles.videoWrapper}>
                    <iframe
                      key={videoSrc}
                      ref={iframeRef}
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={videoSrc}
                      title={typeof title === 'string' ? `${title} ${resolvedContent.dialogs.projectVideoTitleSuffix}` : resolvedContent.dialogs.projectVideoTitleFallback}
                      className={styles.videoFrame}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : null
              ) : imageSrc ? (
                mediaHref ? (
                  <a
                    href={mediaHref}
                    className={styles.mediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={imageSrc}
                      alt={imageAlt ?? ''}
                      className={styles.mediaAsset}
                      decoding="async"
                    />
                    <span className={styles.mediaLinkHint} aria-hidden="true">
                      <ExternalLink size={18} />
                    </span>
                  </a>
                ) : (
                  <img
                    src={imageSrc}
                    alt={imageAlt ?? ''}
                    className={styles.mediaAsset}
                    decoding="async"
                  />
                )
              ) : null}
              {mediaLabel ? (
                <span className={clsx(styles.mediaLabel, mediaLabelClassName)}>{mediaLabel}</span>
              ) : null}
            </div>
          ) : null}

          <div className={styles.dialogHeader}>
            <Dialog.Title className={clsx(styles.title, titleClassName)}>{title}</Dialog.Title>
            {headerAction ? <div className={styles.headerAction}>{headerAction}</div> : null}
          </div>

          {meta ? (
            <Dialog.Description className={clsx(styles.meta, metaClassName)}>{meta}</Dialog.Description>
          ) : null}

          <div
            className={clsx(
              styles.layout,
              styles[`layout-${variantState.dialogLayout}`],
              contentClassName,
            )}
          >
            {resolvedMainContent ? (
              <div className={clsx(styles.main, mainClassName)}>{resolvedMainContent}</div>
            ) : null}
            {asideContent ? (
              <div className={clsx(styles.aside, asideClassName)}>{asideContent}</div>
            ) : null}
          </div>

          {footerAction ? <div className={styles.footerAction}>{footerAction}</div> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}