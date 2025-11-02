# Deployment to Vercel

## Fixing Dependency Issues

This project had conflicts between ajv and @apideck/better-ajv-errors dependencies. The issue has been resolved by:

1. Updating ajv from version ^6.12.6 to ^8.12.0
2. Updating ajv-keywords from version ^3.5.2 to ^5.1.0
3. Modifying the build script to use --legacy-peer-deps flag

## Vercel Configuration

A `vercel.json` file has been added to configure the deployment:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Deployment Instructions

### Pre-deployment Cleanup

Before deploying to Vercel, it's recommended to clean the npm cache and reinstall dependencies:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Build the project
npm run build
```

### Vercel Deployment Steps

1. Push all changes to your Git repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Create React App project
4. The build command will be `npm run build`
5. The output directory will be `build/`

### Troubleshooting

If you encounter dependency conflicts during deployment:

1. In your Vercel project settings, go to "General" → "Build & Development Settings"
2. Add `NPM_FLAGS=--legacy-peer-deps` to the "Environment Variables" section
3. Redeploy the project

This will ensure that Vercel ignores peer dependency conflicts during the build process.