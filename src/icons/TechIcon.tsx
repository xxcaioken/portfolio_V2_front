import type { ReactElement, ComponentType } from 'react';
import type { TechKey } from './tech.data';
import { SiReact, SiDotnet, SiNodedotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiPostgresql, SiAngular, SiNextdotjs, SiPhp, SiPython, SiGraphql, SiMysql, SiElixir, SiCypress, SiSpringboot, SiLinux, SiGit, SiDocker, SiMinio, SiAdobeillustrator, SiOpenjdk, SiAmazon } from 'react-icons/si';

type IconCmp = ComponentType<{ className?: string; size?: string | number; title?: string }>;

const FallbackDb: IconCmp = ({ className, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v10c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 10c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
);

const FallbackCloud: IconCmp = ({ className, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M20 16.5a4.5 4.5 0 0 0-3.5-7.5 6 6 0 0 0-11.5 2A4 4 0 0 0 5 20h12a3 3 0 0 0 3-3.5z" />
  </svg>
);

const ICONS: Record<TechKey, IconCmp> = {
  react: SiReact,
  dotnet: SiDotnet,
  node: SiNodedotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss3,
  postgres: SiPostgresql,
  angular: SiAngular,
  nextjs: SiNextdotjs,
  csharp: SiDotnet,
  java: SiOpenjdk,
  php: SiPhp,
  python: SiPython,
  graphql: SiGraphql,
  sqlserver: FallbackDb,
  mysql: SiMysql,
  elixir: SiElixir,
  cypress: SiCypress,
  springboot: SiSpringboot,
  linux: SiLinux,
  git: SiGit,
  docker: SiDocker,
  minio: SiMinio,
  azure: FallbackCloud,
  amazons3: SiAmazon,
  adobeillustrator: SiAdobeillustrator,
};

export const TechIcon = ({ name, className }: { name: TechKey; className?: string }): ReactElement => {
  const Cmp = ICONS[name];
  return <Cmp className={className} size={16} />;
};


