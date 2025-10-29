export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  techs: string[];
  link?: string;
};

export const profile = {
  name: 'CAIO KORMIVES',
  title: 'Desenvolvedor Full Stack',
  location: 'Florianópolis, SC',
  phone: '+55 48 99845-8492',
  email: 'caio.kormives@gmail.com',
  linkedin: 'https://linkedin.com/in/caio-kormives',
  summary:
    'Desenvolvedor Full Stack apaixonado por tecnologia, com experiência em React.js, Angular, .NET, Java, PHP, Python, Node.js e Elixir (funcional) com GraphQL (Absinthe). Atuação de ponta a ponta: web, migração de legados, e2e com Cypress e desenvolvimento de plugins.',
  skills: {
    languages:
      'Elixir, C# (.NET), Java, JavaScript/TypeScript, PHP, Python, GraphQL, SQL',
    frontend: 'React, Angular, Next.js, HTML5, CSS3, Cypress (e2e)',
    backend: 'Node.js, ASP.NET, Absinthe, Spring Boot',
    databases: 'PostgreSQL, MySQL, SQL Server',
    tools:
      'Linux (Manjaro), Git, Docker, CI/CD, Min.io, Azure, Amazon S3, Adobe Illustrator (Plugin Dev)'
  },
  experience: [
    {
      company: 'C.M.',
      role: 'Desenvolvedor Full Stack',
      period: 'Mais recente',
      bullets: [
        'React, Elixir, GraphQL (Absinthe) e paradigmas funcionais',
        'Cypress para testes E2E garantindo estabilidade',
        'Postgres e Min.io para dados e objetos',
        'Desenvolvimento de plugin para Adobe Illustrator'
      ]
    },
    {
      company: 'Tech6 Group Ltda - PATHOM',
      role: 'Desenvolvedor Full Stack',
      period: '04/2022 - 07/2024',
      bullets: [
        'App web de alta performance com React.js e .NET (C#)',
        'Restructure de repositório para hot updates sem reinício',
        'Correções em FE/BE/migrations para multi-tenancy em PRD',
        'Migração B2W v2→v3 e integrações com APIs de terceiros'
      ]
    },
    {
      company: 'SCC4 - PORTAL POSTAL',
      role: 'Desenvolvedor Full Stack',
      period: 'Anterior a 04/2022',
      bullets: [
        'Angular e Java no core web',
        'E-commerce (WooCommerce) com PHP',
        'Integrações de pagamentos e frete; análise de dados'
      ]
    }
  ] as ExperienceItem[],
  education: [
    'Análise e Desenvolvimento de Sistemas | Senai (01/2022 - Presente)',
    'Técnico em Desenvolvimento de Sistemas | Senai (01/2019 - 12/2022)'
  ],
  certifications: [
    'React - The Complete Guide 2025 (Udemy)',
    'Java - Profissional + Cursos (Udemy)'
  ],
  languages: ['Português (Nativo)', 'Inglês (Proficiente)'],
  projects: [
    {
      name: 'Plugin Adobe Illustrator',
      description:
        'Plugin integrado ao ecossistema da empresa, conectando fluxos com serviços internos.',
      techs: ['Elixir', 'GraphQL', 'React'],
    },
  ] as ProjectItem[],
} as const;


