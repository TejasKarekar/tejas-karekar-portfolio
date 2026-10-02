# Portfolio assets

Place public image assets in these folders, then update the matching path in `src/data/portfolio.ts`.

- `profile/` — an optional profile image. Set `personalInfo.profileImage`, for example `/images/profile/tejas-karekar.jpg`.
- `projects/attendance/`
- `projects/just-go/`
- `projects/telesupport/`
- `projects/threat-intelligence/`
- `projects/yashasvibhav/`
- `projects/marketing-pro/`
- `projects/rupeegrow/`
- `projects/fetal-ai/`

Project images are optional. Leave `image: null` to keep the current abstract project visual.

To enable the Resume link, add the real file at `public/resume.pdf` and set `personalInfo.resume` to `/resume.pdf`. Do not add credentials, API keys, or private files to `public/`.
