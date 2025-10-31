export type TechKey =
  | 'react'
  | 'dotnet'
  | 'node'
  | 'typescript'
  | 'javascript'
  | 'html5'
  | 'css3'
  | 'postgres'
  | 'angular'
  | 'nextjs'
  | 'csharp'
  | 'java'
  | 'php'
  | 'python'
  | 'graphql'
  | 'sqlserver'
  | 'mysql'
  | 'elixir'
  | 'cypress'
  | 'springboot'
  | 'linux'
  | 'git'
  | 'docker'
  | 'minio'
  | 'azure'
  | 'amazons3'
  | 'adobeillustrator';

export const TECH_KEYS: TechKey[] = [
  'react',
  'dotnet',
  'node',
  'typescript',
  'javascript',
  'html5',
  'css3',
  'postgres',
  'angular',
  'nextjs',
  'csharp',
  'java',
  'php',
  'python',
  'graphql',
  'sqlserver',
  'mysql',
  'elixir',
  'cypress',
  'springboot',
  'linux',
  'git',
  'docker',
  'minio',
  'azure',
  'amazons3',
  'adobeillustrator',
];

const aliases: Record<string, TechKey> = {
  react: 'react',
  'reactjs': 'react',
  '.net': 'dotnet',
  dotnet: 'dotnet',
  net: 'dotnet',
  node: 'node',
  nodejs: 'node',
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  postgres: 'postgres',
  postgresql: 'postgres',
  angular: 'angular',
  next: 'nextjs',
  nextjs: 'nextjs',
  nextdotjs: 'nextjs',
  csharp: 'csharp',
  'c#': 'csharp',
  java: 'java',
  php: 'php',
  python: 'python',
  graphql: 'graphql',
  sqlserver: 'sqlserver',
  mssql: 'sqlserver',
  'microsoftsqlserver': 'sqlserver',
  mysql: 'mysql',
  elixir: 'elixir',
  cypress: 'cypress',
  spring: 'springboot',
  springboot: 'springboot',
  linux: 'linux',
  git: 'git',
  docker: 'docker',
  minio: 'minio',
  azure: 'azure',
  'microsoftazure': 'azure',
  s3: 'amazons3',
  'amazon s3': 'amazons3',
  amazons3: 'amazons3',
  adobeillustrator: 'adobeillustrator',
  illustrator: 'adobeillustrator',
};

export const findTechKey = (input: string): TechKey | null => {
  const normalized = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return aliases[normalized] ?? null;
};


