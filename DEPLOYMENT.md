# Deployment Guide

## GitHub Actions Workflow

This project includes an automated CI/CD pipeline using GitHub Actions that builds and deploys the wedding website.

### Workflow Overview

The workflow (`.github/workflows/build-deploy.yml`) runs automatically on:
- Every push to the `main` branch
- Every pull request targeting `main`

### What the Workflow Does

#### 1. Build Job
- Checks out the code
- Sets up Node.js 18.x
- Installs dependencies using `npm ci`
- Builds the React application
- Uploads build artifacts (stored for 7 days)

#### 2. Deploy Job (only on push to main)
- Rebuilds the project
- Deploys to GitHub Pages using the `gh-pages` branch
- Automatically publishes to: `https://killbilljkg.github.io/aromal-jesna`

### Setup Instructions

#### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/killbilljkg/aromal-jesna`
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
4. Click **Save**

#### 2. Repository Permissions

The workflow needs write permissions:
1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### Manual Deployment

If you want to deploy manually:

```bash
# Build the project
npm run build

# Install gh-pages (if not installed)
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npx gh-pages -d build
```

### Environment Variables

The workflow uses:
- `CI=false` - Treats warnings as warnings (not errors) during build
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

### Custom Domain (Optional)

To use a custom domain:

1. Update `.github/workflows/build-deploy.yml`:
   ```yaml
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./build
       cname: your-domain.com  # Change this to your domain
   ```

2. Add a CNAME record in your domain's DNS settings:
   ```
   CNAME: killbilljkg.github.io
   ```

### Viewing Build Status

- GitHub Actions runs can be viewed at: `https://github.com/killbilljkg/aromal-jesna/actions`
- Each commit will show a status badge (✓ or ✗)

### Troubleshooting

**Build fails with permission error:**
- Check repository permissions under Settings → Actions → General

**Pages not updating:**
- Ensure GitHub Pages is enabled
- Check that gh-pages branch exists
- Verify workflow completed successfully

**404 errors on deployed site:**
- Add `"homepage"` field to package.json (already configured)
- Ensure routes use HashRouter or BrowserRouter with basename

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
https://killbilljkg.github.io/aromal-jesna/?name=John%20Smith
```

The site will automatically:
- Show personalized greeting
- Pre-fill RSVP form with the guest's name
