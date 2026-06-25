# Devansh's Living Digital Universe

An interactive, high-fidelity 3D portfolio and digital universe built to showcase full-stack projects, academic research publications, technical essays, certifications, shayari, and public speaking milestones.

The landing page centers on a glowing neural brain network featuring a 3D WebGL cosmos graph. Users can orbit, sway, and interact with categories radiating from the central profile avatar. Selecting nodes portals the user into distinct, custom-themed interactive environments.

---

## 🚀 Tech Stack

The application leverages a modern, high-performance web stack:

- **Core & Runtime**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) (extremely fast Hot Module Replacement and optimized asset packaging).
- **3D Graphics & Force Simulations**: [Three.js](https://threejs.org/) + [react-force-graph-3d](https://github.com/vasturiano/react-force-graph-3d) (d3-force directed layout simulation rendering glowing 3D canvas textures and connected cylinders).
- **Animations & Transitions**: [Framer Motion](https://www.framer.com/motion/) (orchestrating cinematic splash overlays, spring transitions, and fading HUD coordinates).
- **Typography & Aesthetics**: Sleek dark space themes, glassmorphism filters, Inter & Outfit Google Fonts, custom CSS-shimmer loaders, and responsive layouts.
- **Scroll Engine**: [Lenis](https://lenis.darkroom.engineering/) (high-end inertia smooth scrolling wrapper).
- **Icons**: [Lucide React](https://lucide.dev/).

---

## 📱 Responsiveness & Adaptability

The project is built with responsiveness at its core, scaling seamlessly from ultra-wide desktops to tablets and mobile screens:

### 1. Unified 3D Mobile Viewport
The portfolio uses **ForceGraph3D** on both mobile and desktop viewports, avoiding simple flat mockups.
- **Mobile Camera Fitting**: Automatically increases camera distance (`z = 550` on mobile vs. `430` on desktop) to fit all elements inside portrait screen dimensions.
- **Symmetric Mobile Grid**: Arranges category nodes into a balanced rectangular layout on small screens (4 nodes above the profile, 4 nodes below) to prevent overlap with Devansh's profile photo and description.
- **Micro-Sway Parallax**: Retains a gentle horizontal/vertical orbit sway on touchscreens.

### 2. Tablet Layouts (`max-width: 1024px`)
- Portal grids (such as the **Skills Constellation**) adapt to a 2-column card deck.
- Column structures auto-stack vertically, converting sidebars to headers for clean readability.
- Re-aligns back navigation buttons for touch compatibility.

### 3. Mobile Portals & Forms (`max-width: 768px`)
- **Horizontal Tab Navigation**: Portal lists (such as the **Projects list**) convert into a horizontal, scrollable pill-tab dock.
- **Portals Scroll Locking**: Portal lists in writing feeds are capped at a max-height of `250px` with custom scrollable boxes. This lets the user see selected case study/preprint details immediately without excessive vertical scrolls.
- **Floating social dock**: Fades out completely when scrolling down into the contact section (`#contact-section`) to prevent visual duplicate rows.

---

## 🎨 Interactive Portals

1. **Projects World**: Production case studies displaying overview descriptions, pipeline node systems, and technical TS/JS code snippets.
2. **Writing World**: Double-panel reader rendering academic preprint drafts (with abstract lists and contribution bullets), philosophy essays, and a dynamic Medium feed.
3. **Experience World**: A chronological vertical track detailing SDE internships, community leadership, and certifications.
4. **Skills World**: Modern flat bars plotting language, frontend, backend, and DevOps competencies.
5. **Shayari World**: Handwritten journal notebook layout showcasing Hindi and Urdu couplets alongside English translations.
6. **Community World**: Keynote presentation modules, YouTube webinar slots, and metrics grids.

---

## ⚙️ Development Setup

To run this project locally:

```bash
# 1. Clone repository
git clone https://github.com/Devansh1974/devansh_universe.git
cd devansh_universe

# 2. Install dependencies
npm install

# 3. Spin up the development server
npm run dev

# 4. Compile build check
npm run build
```
