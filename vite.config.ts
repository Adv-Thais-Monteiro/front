import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { EMAIL, WHATSAPP_NUMBER } from "./src/lib/contact";

/**
 * SEO gerado no build.
 * - Dados estruturados (JSON-LD) do escritório: sempre.
 * - URL canônica, og:url, og:image/twitter:image, sitemap.xml e a linha "Sitemap:"
 *   do robots.txt: só quando SITE_URL estiver definido (.env ou variável de ambiente
 *   na Vercel), para nunca publicar um domínio errado.
 */
function seoPlugin(siteUrlRaw: string): Plugin {
  const siteUrl = siteUrlRaw.trim().replace(/\/+$/, "");
  const phone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 4)} ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "Thais Monteiro Advocacia Criminal",
    legalName: "Monteiro Sociedade de Advogados",
    description:
      "Advocacia criminal estratégica em Uberaba - MG: defesa técnica, Tribunal do Júri e atendimento sigiloso e humanizado.",
    telephone: phone,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua São Sérgio, 305, 2º andar - Leblon",
      addressLocality: "Uberaba",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Uberaba" },
      { "@type": "State", name: "Minas Gerais" },
    ],
    knowsAbout: ["Direito Penal", "Processo Penal", "Tribunal do Júri", "Habeas Corpus", "Crimes Digitais"],
    knowsLanguage: "pt-BR",
    employee: {
      "@type": "Person",
      name: "Thais Monteiro",
      honorificPrefix: "Dra.",
      jobTitle: "Advogada Criminalista",
      identifier: "OAB/MG 198361",
    },
  };

  if (siteUrl) {
    jsonLd.url = `${siteUrl}/`;
    jsonLd.image = `${siteUrl}/og-image.jpg`;
    jsonLd.logo = `${siteUrl}/icon-512.png`;
  }

  const domainTags = siteUrl
    ? [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="Dra. Thais Monteiro, advogada criminalista em Uberaba - MG" />`,
        `<meta name="twitter:image" content="${siteUrl}/og-image.jpg" />`,
      ]
    : [];

  const generated = [
    ...domainTags,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");

  const robots = [
    "User-agent: *",
    "Allow: /",
    ...(siteUrl ? ["", `Sitemap: ${siteUrl}/sitemap.xml`] : []),
    "",
  ].join("\n");

  return {
    name: "seo-generated-tags",
    transformIndexHtml(html) {
      return html.replace("<!--SEO_GENERATED_TAGS-->", generated);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        });
      } else {
        this.warn("SITE_URL não definido: URL canônica, og:image e sitemap.xml não foram gerados.");
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      seoPlugin(env.SITE_URL ?? ""),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
