import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { ion } from "starlight-ion-theme";
import { rehypeMermaid } from "./src/plugins/rehype-mermaid.js";

// https://astro.build/config
export default defineConfig({
  site: "https://fda-docs.vercel.app/",
  base: "/",
  mdx: {
    rehypePlugins: [rehypeMermaid],
  },
  integrations: [
    starlight({
      title: "FDA Docs",
      logo: {
        dark: "./src/assets/logo.png",
        light: "./src/assets/logo.png",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/chord-ts/fda",
        },
      ],
      sidebar: [
        {
          label: "📚 Документация FDA",
          items: [
            {
              label: "Введение",
              link: "/01-introduction/",
            },
            {
              label: "Основные концепции",
              link: "/02-core-concepts/",
            },
            {
              label: "Структура проекта",
              link: "/03-project-structure/",
            },
            {
              label: "Домены и подмодули",
              link: "/04-domains-submodules/",
            },
            {
              label: "Контракты файлов",
              link: "/05-file-contracts/",
            },
            {
              label: "FAQ и Checklist",
              link: "/06-faq-checklist/",
            },
            {
              label: "Qwen Code Skill",
              link: "/07-qwen-code-skill/",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
      ],
      customCss: [
        "@fontsource-variable/space-grotesk/index.css",
        "@fontsource/space-mono/400.css",
        "@fontsource/space-mono/700.css",
        "@fontsource-variable/unbounded/index.css",
        "@fontsource/geist-sans/index.css",
        "./src/styles/modern.css",
        "./src/styles/global.css",
      ],
      lastUpdated: true,
      pagination: true,
      components: {
        // PageFrame: "./src/components/PageFrame.astro",
      },
      plugins: [
        ion({
          icons: {
            iconDir: "./src/icons",
          },
          footer: {
            text: "©️ 2026 FDA Documentation",
            links: [
              {
                text: "GitHub",
                href: "https://github.com/chord-ts/fda",
              },
            ],
          },
        }),
      ],
    }),
  ],
  output: "static",
});
