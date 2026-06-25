# SEO & Branding Documentation

This document outlines the SEO optimizations, search console integrations, real profile URL bindings, and technical competencies updated on this portfolio.

---

## 1. Technical SEO & Meta Tags
We have updated [index.html](file:///Users/devanshsingh/Desktop/devansh_universe/index.html) to include comprehensive, production-ready metadata tags:

- **Page Title**: `Devansh Singh | Full Stack Developer • AI Engineer • MERN • Flutter • Marketer`
- **Meta Description**: `Explore the interactive digital universe portfolio of Devansh Singh, a Full Stack Developer, AI Engineer, and Growth Marketer specializing in MERN stack, Flutter, Next.js, Node.js, React, Machine Learning, and Meta/Google Ads.`
- **Canonical URL**: `https://devanshh.tech/`
- **Keywords**: 
  `Devansh Singh, Full Stack Developer, AI Engineer, MERN, Flutter, Next.js, Node.js, React, Machine Learning, Digital Marketing, Meta Ads, Google Ads, Growth Marketer, Portfolio, Open Source, Projects, Bengaluru, Software Engineer`
- **Theme Color**: `#050508`
- **Robots Directives**: `index, follow` (fully configured in `index.html` and supported by [robots.txt](file:///Users/devanshsingh/Desktop/devansh_universe/public/robots.txt)).

---

## 2. Integrated Webmaster & Analytics Verification Tools
The following integrations have been completed in [index.html](file:///Users/devanshsingh/Desktop/devansh_universe/index.html):

1. **Bing Webmaster Tools (Active)**:
   Added the active verification meta tag:
   ```html
   <meta name="msvalidate.01" content="3274AC15EF26FC08EEF8AC41DB2D2A58" />
   ```
2. **Google Analytics 4 (Active)**:
   Fully integrated your tracking tag (`G-YR6ZYN3S99`) with page tracking:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR6ZYN3S99"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-YR6ZYN3S99');
   </script>
   ```
3. **Google Search Console (Placeholder)**:
   Prepared a clean placeholder tag for HTML verification:
   ```html
   <!-- <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE_HERE" /> -->
   ```

---

## 3. Social Media & Developer Profiles (Everywhere)
All profile links have been updated to point to your real URLs across the application (floating bar, community pages, sitemap, and metadata):

- **X (Twitter)**: `https://x.com/Dev_Developerr`
- **LeetCode**: `https://leetcode.com/u/Devansh1974/`
- **Medium**: `https://medium.com/@devanshsingh1974`
- **GitHub**: `https://github.com/Devansh1974`
- **Instagram**: `https://www.instagram.com/bydevansh`
- **YouTube**: `https://www.youtube.com/@bydevansh`

*Note: YouTube was added as a primary network inside the floating homepage social dock and the Public Speaker sidebar.*

---

## 4. Schema.org JSON-LD Structured Data
Structured data is embedded statically in the head section of [index.html](file:///Users/devanshsingh/Desktop/devansh_universe/index.html) to enable Google rich snippet indexing. It outlines:
- **Person** schema listing name, title, worksFor, custom knowsAbout skills (including Digital Marketing and Meta/Google Ads), and all linked social profiles.
- **WebSite** schema.
- **WebPage** schema.

---

## 5. Skill & Portfolio Highlights
We added a highlighted competency focus:
- **Digital Marketing & Growth**:
  - In [SkillsWorld.tsx](file:///Users/devanshsingh/Desktop/devansh_universe/src/worlds/SkillsWorld.tsx), a dedicated skills card is now live featuring:
    - *Digital Marketing (Meta & Google Ads)*
    - *Ad Copywriting & Creatives Design*
    - *Campaign Optimization & Budgeting*
    - *Growth Marketing & SEO Strategy*
  - Re-mapped Skills description in the 3D galaxy visualization ([universe.ts](file:///Users/devanshsingh/Desktop/devansh_universe/src/data/universe.ts)) to highlight marketing.
- **Generic SDE Intern Phrasing**:
  - Replaced all explicit references to "AIRIZZ" on the homepage bio and main layout.
  - Refined the experience timelines in [ExperienceWorld.tsx](file:///Users/devanshsingh/Desktop/devansh_universe/src/worlds/ExperienceWorld.tsx) to describe SDE Intern contributions at a **Stealth SaaS Startup**.
