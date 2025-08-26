## Component Cleanup

Date: 2025-08-26

- Removed unused components (no imports/usages found across `src`):
  - `src/components/layout/DockStyleNavbar.jsx`
  - `src/components/magicui/dot-pattern.jsx`
  - `src/components/magicui/terminal.jsx`
  - `src/components/project/ClipPathLink.jsx`
  - `src/components/ui/separator.jsx`

Status:

- [x] Scan for usages of all components under `src/components`
- [x] Delete files for components with no usages
- [x] Update project plan with cleanup status

Notes:

- Searches used project-wide ripgrep for component names and import paths to ensure no references remained before deletion.
