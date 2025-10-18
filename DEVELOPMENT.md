# Development Setup

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

This will:
1. Compile TypeScript to JavaScript in the `dist` folder
2. Copy icon files to the `dist` folder

## Test Locally with n8n

To test your node locally:

1. Build the node:
   ```bash
   npm run build
   ```

2. Link the package globally:
   ```bash
   npm link
   ```

3. In your n8n installation directory:
   ```bash
   npm link n8n-nodes-solannrank
   ```

4. Start n8n:
   ```bash
   n8n start
   ```

5. Your node should now appear in the n8n node selector

## Publishing

Before publishing:

1. Update version in `package.json`
2. Update `CHANGELOG.md` if you have one
3. Run linting and build:
   ```bash
   npm run lint
   npm run build
   ```

4. Publish to npm:
   ```bash
   npm publish
   ```

## Troubleshooting

- If TypeScript errors occur, run: `npm install n8n-workflow`
- For icon issues, ensure SVG files are in `nodes/SolannRank/`
- Check n8n logs for runtime errors
