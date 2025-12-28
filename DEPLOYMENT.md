# Deployment Guide

## GitHub Actions Workflow

This project includes an automated CI/CD pipeline using GitHub Actions that builds and deploys the wedding website.

### Workflow Overview

The workflow (`.github/workflows/build-deploy.yml`) runs automatically on:
- Every push to the `main` branch
- Manual trigger via workflow_dispatch

### What the Workflow Does

#### 1. Build Job
- Checks out the code
- Sets up Node.js 20.x
- Installs dependencies using `npm install`
- Builds the React application with `CI=false`
- Adds `.nojekyll` file to disable Jekyll processing
- Creates CNAME file for custom domain
- Uploads build artifacts using GitHub Pages artifact action

#### 2. Deploy Job (only on push to main)
- Uses the official `actions/deploy-pages@v4` action
- Deploys artifacts to GitHub Pages
- Automatically publishes to: `https://aromalwedsjesna.story-labs.in`

### Setup Instructions

#### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/killbilljkg/aromal-jesna`
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Source: **GitHub Actions**
4. The custom domain `aromalwedsjesna.story-labs.in` will be automatically configured via the CNAME file in the workflow

#### 2. Repository Permissions

The workflow requires specific permissions (already configured in the workflow file):
- `contents: read` - To checkout the code
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For GitHub Pages deployment authentication

These are automatically handled by the workflow configuration. No additional repository settings are required.

### Manual Deployment

You can trigger a manual deployment using the workflow_dispatch trigger:

1. Go to **Actions** tab in your repository
2. Select **Deploy React App to GitHub Pages**
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

Alternatively, any push to the `main` branch will automatically trigger a deployment.

### Environment Variables

The workflow uses:
- `CI=false` - Treats warnings as warnings (not errors) during build

### Custom Domain Setup

The workflow is configured to deploy to `aromalwedsjesna.story-labs.in`. To make this work:

1. Add a CNAME record in your DNS settings for `story-labs.in`:
   ```
   Type: CNAME
   Name: aromalwedsjesna
   Value: killbilljkg.github.io
   ```

2. The workflow automatically creates a CNAME file in the build output

3. GitHub Pages will verify your domain and enable HTTPS automatically

### Viewing Build Status

- GitHub Actions runs can be viewed at: `https://github.com/killbilljkg/aromal-jesna/actions`
- Each commit will show a status badge (✓ or ✗)

### Troubleshooting

**Build fails with permission error:**
- Ensure GitHub Pages is set to deploy from "GitHub Actions" in Settings → Pages
- Check that the workflow has necessary permissions (already configured in workflow file)

**Pages not updating:**
- Ensure GitHub Pages source is set to "GitHub Actions"
- Verify workflow completed successfully in Actions tab
- Check deployment environment in repository settings

**404 errors on deployed site:**
- Verify `"homepage"` field in package.json matches your domain (already configured)
- Ensure `.nojekyll` file is being created (handled by workflow)
- Check that CNAME record is properly configured in DNS

**Custom domain not working:**
- Verify CNAME DNS record: `aromalwedsjesna` → `killbilljkg.github.io`
- Wait for DNS propagation (can take up to 24-48 hours)
- Check domain verification in Settings → Pages

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test production build locally
npx serve -s build
```

### Personalized Invitations

Share links with guest names:
```
https://aromalwedsjesna.story-labs.in/?name=John%20Smith
```

The site will automatically:
- Show personalized greeting
- Pre-fill RSVP form with the guest's name
