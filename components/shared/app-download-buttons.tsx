import Image from "next/image";
import Link from "next/link";

interface AppDownloadButtonsProps {
  layout?: "horizontal" | "vertical";
  showHuawei?: boolean;
}

export function AppDownloadButtons({
  layout = "horizontal",
  showHuawei = true,
}: AppDownloadButtonsProps) {
  const containerClass =
    layout === "horizontal"
      ? "flex flex-row items-center justify-center gap-2 md:gap-3"
      : "flex flex-col items-center gap-3";

  return (
    <div className={containerClass}>
      {/* App Store */}
      <Link
        href="https://apps.apple.com/sa/app/amanever"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105 active:scale-95"
        aria-label="حمّل من App Store"
      >
        <Image
          src="/images/app-store-ar.png"
          alt="حمّل من App Store"
          width={160}
          height={48}
          className="h-9 md:h-11 lg:h-12 w-auto"
        />
      </Link>

      {/* Google Play */}
      <Link
        href="https://play.google.com/store/apps/details?id=com.amanever"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105 active:scale-95"
        aria-label="حمّل من Google Play"
      >
        <Image
          src="/images/google-play-ar.png"
          alt="حمّل من Google Play"
          width={160}
          height={48}
          className="h-9 md:h-11 lg:h-12 w-auto"
        />
      </Link>

      {/* Huawei AppGallery */}
      {showHuawei && (
        <Link
          href="https://appgallery.huawei.com/app/amanever"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 active:scale-95"
          aria-label="حمّل من Huawei AppGallery"
        >
          <Image
            src="/images/huawei-appgallery-ar.png"
            alt="حمّل من Huawei AppGallery"
            width={160}
            height={48}
            className="h-9 md:h-11 lg:h-12 w-auto"
          />
        </Link>
      )}
    </div>
  );
}
