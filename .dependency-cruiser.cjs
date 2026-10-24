/**
 * Regras da arquitetura hexagonal do Radar.
 * As dependências só apontam para dentro: interfaces/infrastructure -> application -> domain.
 * O domínio não conhece nenhum pacote externo; a aplicação não conhece framework.
 */
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-is-pure',
      comment: 'O domínio não importa outras camadas nem pacotes externos.',
      severity: 'error',
      from: { path: '^src/[^/]+/domain/' },
      to: {
        pathNot: ['^src/[^/]+/domain/'],
        dependencyTypesNot: ['core'],
      },
    },
    {
      name: 'application-depends-only-on-domain',
      comment:
        'Casos de uso dependem do domínio e de portas próprias, nunca de adaptadores ou de framework.',
      severity: 'error',
      from: { path: '^src/[^/]+/application/' },
      to: {
        pathNot: ['^src/[^/]+/(domain|application)/'],
        dependencyTypesNot: ['core'],
      },
    },
    {
      name: 'infrastructure-not-to-interfaces',
      comment: 'Adaptadores de saída não conhecem os adaptadores de entrada.',
      severity: 'error',
      from: { path: '^src/[^/]+/infrastructure/' },
      to: { path: '^src/[^/]+/interfaces/' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '\\.spec\\.ts$' },
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
  },
};
