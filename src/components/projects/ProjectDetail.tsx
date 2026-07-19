import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Tag,
  Target,
  Trophy,
  UserRound,
  UsersRound,
  Wrench,
} from 'lucide-react';
import { getProjectImages } from '../../utils/imageUtils';
import type { PortfolioProject } from '../../data/projectsData';
import { socialIcons } from '../../data/inlineIcons.generated';
import ProjectCoverArt from './ProjectCoverArt';

interface ProjectDetailProps {
  project: PortfolioProject;
  titleId?: string;
}

const iconClass = 'h-4 w-4';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
    {children}
  </h4>
);

const GithubLogo = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={socialIcons.github.path} />
  </svg>
);

const DetailCard = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <article className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
    <div className="mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
      <Icon className={iconClass} />
      <h5 className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</h5>
    </div>
    <p className="type-body-sm">{children}</p>
  </article>
);

export default function ProjectDetail({ project, titleId }: ProjectDetailProps) {
  const projectImages = useMemo(() => getProjectImages(project.imageFolder), [project.imageFolder]);
  const hasGallery = projectImages.length > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const facts = [
    project.category ? { label: 'Type', value: project.category, icon: Tag } : null,
    project.role ? { label: 'Role', value: project.role, icon: UserRound } : null,
    project.duration ? { label: 'Duration', value: project.duration, icon: CalendarDays } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; icon: typeof Tag }>;

  const caseStudyItems = [
    project.problem ? { label: 'Problem', value: project.problem, icon: Target } : null,
    project.users ? { label: 'Users', value: project.users, icon: UsersRound } : null,
    project.contribution ? { label: 'Contribution', value: project.contribution, icon: Wrench } : null,
    project.outcome ? { label: 'Outcome', value: project.outcome, icon: Trophy } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; icon: typeof Target }>;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === projectImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [projectImages.length]);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projectImages.length - 1 : prevIndex - 1
    );
  }, [projectImages.length]);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNextImage();
    if (isRightSwipe) goToPrevImage();
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextImage, goToPrevImage, isLightboxOpen]);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-b-2xl bg-white dark:bg-slate-900 sm:rounded-b-[2rem]">
        <div className="border-b border-slate-100 bg-slate-50 p-3 dark:border-slate-800/60 dark:bg-slate-950/40 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/80 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/80 sm:px-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 dark:bg-green-500/70" />
              </div>
              <div className="mx-3 min-w-0 flex-1 truncate rounded-md bg-white/70 px-3 py-1 text-center font-mono text-[10px] tracking-wide text-slate-500 dark:bg-slate-950/30 dark:text-slate-400 sm:text-xs">
                {project.liveUrl !== '#' ? project.liveUrl.replace('https://', '') : `preview/${project.imageFolder}`}
              </div>
              <button
                type="button"
                onClick={() => hasGallery && setIsLightboxOpen(true)}
                disabled={!hasGallery}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-blue-600 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-300"
                aria-label={`Open ${project.title} screenshot fullscreen`}
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-slate-100/60 dark:bg-slate-950/40">
              {hasGallery ? (
                <div className="relative h-full w-full p-2 sm:p-4">
                  <button
                    type="button"
                    className="h-full w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
                    onClick={() => setIsLightboxOpen(true)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    aria-label={`Open ${project.title} screenshot ${currentImageIndex + 1} fullscreen`}
                  >
                    <img
                      key={currentImageIndex}
                      src={projectImages[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      className="h-full w-full rounded-lg object-contain transition-transform duration-300 hover:scale-[1.01]"
                      draggable={false}
                      decoding="async"
                    />
                  </button>

                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/80 text-slate-800 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-black/45 dark:text-white dark:hover:bg-black/65"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/80 text-slate-800 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-black/45 dark:text-white dark:hover:bg-black/65"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-black/5 bg-white/85 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/55 dark:text-white">
                        {currentImageIndex + 1} / {projectImages.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <ProjectCoverArt title={project.title} />
              )}
            </div>
          </div>

        </div>

        <div className="bg-white p-5 dark:bg-slate-900 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <div className="animate-detail-enter">
              <span className="type-eyebrow mb-3 block">Case Study</span>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <h3 id={titleId} className="mb-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
                    {project.title}
                  </h3>
                  <p className="type-body max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                    {project.description}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-500"
                    >
                      Visit Site <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                    >
                      GitHub <GithubLogo />
                    </a>
                  )}
                </div>
              </div>

              {facts.length > 0 && (
                <dl className="mt-6 grid grid-cols-1 gap-3 border-y border-slate-200 py-4 dark:border-slate-800 sm:grid-cols-3">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200/70 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {caseStudyItems.length > 0 && (
              <section className="mt-9 animate-detail-enter animation-delay-75">
                <SectionTitle>Project Breakdown</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {caseStudyItems.map((item) => (
                    <DetailCard key={item.label} icon={item.icon} label={item.label}>
                      {item.value}
                    </DetailCard>
                  ))}
                </div>
              </section>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <section className="mt-9 animate-detail-enter animation-delay-150">
                <SectionTitle>Highlights</SectionTitle>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-950/20">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <span className="type-body-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {isLightboxOpen && hasGallery && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            aria-label="Close fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {projectImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/65 px-3 py-2 text-white shadow-lg backdrop-blur-md sm:bottom-8">
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="min-w-14 text-center text-sm font-bold tracking-widest text-white">
                {currentImageIndex + 1} / {projectImages.length}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}

          <img
            key={`lightbox-${currentImageIndex}`}
            src={projectImages[currentImageIndex]}
            alt={`${project.title} fullscreen screenshot`}
            className="max-h-[78vh] max-w-[95vw] select-none rounded-lg object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:max-h-[86vh] sm:max-w-[calc(100vw-96px)]"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            decoding="async"
          />
        </div>
      )}
    </>
  );
}
