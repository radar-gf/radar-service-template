# radar-service-template

Template de serviço NestJS do Radar, em arquitetura hexagonal.

## Criar um serviço a partir dele

gh repo create radar-gf/<nome-do-servico> --public --template radar-gf/radar-service-template

## Comandos

| Comando                                            | O que faz                                 |
| -------------------------------------------------- | ----------------------------------------- |
| `pnpm start:dev`                                   | Sobe o serviço em modo de desenvolvimento |
| `pnpm test:cov`                                    | Testes com cobertura                      |
| `pnpm lint && pnpm format:check && pnpm typecheck` | Mesmas checagens do CI                    |
