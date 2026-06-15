import { buildProjectCoverSvg } from '../../utils/projectCoverSvgUtil';

interface ProjectCoverArtProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Renders the shared glowing project cover art used when no screenshot exists.
 *
 * @param title - Project title displayed on the cover
 * @param subtitle - Optional subtitle below the title
 * @param className - Optional wrapper classes
 */
export default function ProjectCoverArt({
  title,
  subtitle = 'Live Project',
  className = '',
}: ProjectCoverArtProps) {
  const svgMarkup = buildProjectCoverSvg(title, subtitle.toUpperCase());

  return (
    <img
      src={`data:image/svg+xml,${encodeURIComponent(svgMarkup)}`}
      alt={`${title} cover`}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
