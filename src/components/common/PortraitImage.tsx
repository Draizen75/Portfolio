type PortraitSize = 'hero' | 'about';

interface PortraitImageProps {
  size?: PortraitSize;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const sizeClasses: Record<PortraitSize, string> = {
  hero: 'w-44 xs:w-48 sm:w-56 lg:w-64 xl:w-72',
  about: 'w-44 xs:w-48 sm:w-52',
};

/**
 * Renders the portfolio portrait with WebP preferred and PNG fallback.
 *
 * @param size - Preset width scale for hero or about placement
 * @param className - Optional wrapper classes
 * @param loading - Image loading strategy
 * @param fetchPriority - Fetch priority hint for the hero image
 */
export default function PortraitImage({
  size = 'hero',
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}: PortraitImageProps) {
  return (
    <div className={`relative mx-auto shrink-0 ${sizeClasses[size]} ${className}`}>
      <div
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 blur-2xl opacity-80 dark:from-blue-500/30 dark:to-indigo-500/25"
        aria-hidden="true"
      />
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-slate-200/80 dark:ring-slate-700/50 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.25)] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
        <picture>
          <source srcSet="/images/portrait.webp" type="image/webp" />
          <img
            src="/images/portrait.png"
            alt="Lloyd Draizen Martirez — Full Stack Developer"
            className="w-full h-full object-cover object-top"
            width={288}
            height={384}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
