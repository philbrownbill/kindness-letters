# Kindness Letters

A dependency-free static website for kindnessletters.org. No database, analytics, cookies or external fonts. Plain HTML, CSS and JavaScript in `site/`.

## Preview and review

Run `python3 -m http.server 8000 --directory site` from this folder and open http://localhost:8000. In the managed preview environment use `sites-preview start /workspace/kindness-letters` instead. No build is needed. `.openai/hosting.json` is only local preview configuration; this project is intended for GitHub Pages.

**Live preview requested.** The workflow now deploys pushes to `main` and can also be run manually. It publishes a preview without the custom-domain CNAME and permits the temporary text branding. The standard launch check still requires the original logo. DNS has not been changed.

## Update content

Edit `site/index.html` for homepage text, `site/guidance.html` for organisation guidance and `site/display-sign.html` for the A5 sign. Shared design is in `site/styles.css`. Use relative asset/page links to support both the custom domain and a repository preview. The font stack uses locally installed Inter or system sans-serif; no third-party requests.

## Required before launch

- Save the original supplied artwork as `site/assets/kindness-letters-logo.png`; set `logo: 'assets/kindness-letters-logo.png'` in `site/config.js`. The image is displayed at its natural proportions in the header and on the sign. The current plain text brand is a temporary fallback, not a replacement logo. The original image was visible in chat but not available as a downloadable file in the workspace.
- Set `email` in `site/config.js` to the approved project contact email. The approved address is currently `hello@kindnessletters.org`. Buttons explain that contact details are coming soon until this is set. When set, they open mailto links with appropriate subjects. Public static configuration must never contain secrets or private contact details.
- Review all content and the desktop/mobile preview. The neutral K favicon is provisional; replace it with an approved favicon if desired. Add `og:image` and `twitter:image` metadata using the final approved logo's absolute URL if a social image is wanted; text social metadata is already present.
- Run `node scripts/check-launch.mjs`. It deliberately fails until the original logo is configured (the project email is already set).

## Change the homepage phase or campaign

In `site/config.js`, change `phase: 'recruitment'` to `phase: 'recipient'` to show the prepared recipient-first headline and reassurance. Participation sections remain available below. The small recipient section is hidden in this mode to avoid repetition. Change `campaign`, `introduction`, and `aboutSeason` for another season; an empty campaign hides the label. All seasonal homepage wording is in these settings, with initial HTML fallback text in `site/index.html` (update that too for visitors without JavaScript and search engines). No rebuild is needed.

## Print the sign

Open `display-sign.html`, choose Print A5 sign, select A5 portrait at 100% scale and disable browser headers/footers. Print or save as PDF. The print stylesheet removes controls and sets the page to 148 × 210 mm. Add the approved logo before final printing.

## Publish only after design approval

1. Merge the reviewed website onto the default branch.
2. Set the email and logo, run the launch check, and commit changes.
3. In GitHub Settings → Pages select GitHub Actions as the build source.
4. When authorised, configure the custom domain `kindnessletters.org` and its DNS using GitHub’s current Pages documentation; verify ownership and enable HTTPS once available. `site/CNAME` is prepared but does not change DNS or repository settings by itself.
5. Manually run **Publish approved website to GitHub Pages** in Actions. The workflow also runs on pushes to `main`. It currently stages a GitHub-hosted preview without CNAME; restore the custom-domain deployment only when DNS is ready.
6. Check the resulting deployment and custom domain. For subsequent approved changes, run the workflow manually again.

The deployment workflow uploads only `site/`, excluding repository metadata and maintenance scripts.
