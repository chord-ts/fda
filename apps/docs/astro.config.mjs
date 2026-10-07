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
      title: "FDA",
      logo: {
        dark: "./src/assets/fda-mark-white.svg",
        light: "./src/assets/fda-mark.svg",
      },
      head: [
        {
          tag: "link",
          attrs: { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        },
        {
          tag: "link",
          attrs: { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        },
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        },
        {
          tag: "link",
          attrs: { rel: "manifest", href: "/site.webmanifest" },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#f5efe3",
            media: "(prefers-color-scheme: light)",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#171614",
            media: "(prefers-color-scheme: dark)",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/chord-ts/fda",
        },
      ],
      sidebar: [
        {
          label: "Документация FDA",
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
              label: "Скилл для AI-агентов",
              link: "/07-qwen-code-skill/",
            },
          ],
        },
      ],
      customCss: [
        "@fontsource-variable/space-grotesk/index.css",
        "@fontsource/space-mono/400.css",
        "@fontsource/space-mono/700.css",
        "./src/styles/tokens.css",
        "./src/styles/modern.css",
        "./src/styles/global.css",
      ],
      expressiveCode: {
        themes: ["github-dark"],
        styleOverrides: {
          borderRadius: "12px",
          borderWidth: "1px",
          borderColor: "#33302b",
          codeBackground: "#181715",
          editorBackground: "#181715",
          editorTabBackground: "#1f1e1b",
          editorActiveTabBackground: "#181715",
          editorTabBorderColor: "#33302b",
          tooltipBackground: "#252320",
          tooltipBorder: "#33302b",
          frames: {
            shadows: "none",
          },
        },
      },
      lastUpdated: true,
      pagination: true,
      components: {},
      plugins: [
        ion({
          icons: {
            iconDir: "./src/icons",
          },
          footer: {
            text: "© 2026 FDA Documentation",
            links: [
              {
                text: "GitHub",
                href: "https://github.com/chord-ts/fda",
              },
            ],
          },
          useCustomECTheme: false,
        }),
      ],
    }),
  ],
  output: "static",
});
