/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly DATABASE_URL?: string
  readonly REDIS_URL?: string
  readonly VAULT_TOKEN?: string
  readonly KETO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
