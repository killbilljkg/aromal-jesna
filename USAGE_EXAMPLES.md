# Wedding Invitation Website - Usage Examples

## How to Use URL Query Parameters

### Basic URL (No personalization)
```
http://localhost:3000/
```
This will show the invitation without a personalized greeting.

### Personalized URLs for Guests

#### Example 1: Single Name
```
http://localhost:3000/?name=John
```
Displays: "Dear John,"

#### Example 2: Full Name
```
http://localhost:3000/?name=John%20Smith
```
Displays: "Dear John Smith,"

#### Example 3: Family
```
http://localhost:3000/?name=The%20Smith%20Family
```
Displays: "Dear The Smith Family,"

#### Example 4: Couple
```
http://localhost:3000/?name=John%20%26%20Jane
```
Displays: "Dear John & Jane,"

## Customizing the Website

### 1. Update Wedding Data

Edit `src/wedding-data.json`:

```json
{
  "couple": {
    "groom": {
      "name": "Aromal",
      "fullName": "Aromal Kumar",
      "image": "/images/aromal.png"
    },
    "bride": {
      "name": "Jesna",
      "fullName": "Jesna Mary",
      "image": "/images/jesna.png"
    }
  },
  "events": {
    "engagement": {
      "title": "Engagement Ceremony",
      "date": "2025-12-25",
      "time": "10:00 AM",
      "venue": {
        "name": "Green Valley Gardens",
        "address": "123 Garden Street, Kochi, Kerala",
        "mapLink": "https://maps.google.com/?q=Your+Venue+Address"
      },
      "description": "Join us as we celebrate our engagement..."
    },
    "wedding": {
      "title": "Wedding Ceremony",
      "date": "2026-01-15",
      "time": "11:00 AM",
      "venue": {
        "name": "St. Mary's Church",
        "address": "456 Church Road, Kochi, Kerala",
        "mapLink": "https://maps.google.com/?q=Your+Venue+Address"
      },
      "description": "We joyfully invite you to witness..."
    }
  },
  "rsvp": {
    "email": "your-email@example.com",
    "phone": "+91 1234567890"
  }
}
```

### 2. Replace Images

1. Prepare your images:
   - Use PNG format with transparent background
   - Recommended size: 800x1000 pixels
   - Name them appropriately (e.g., `groom.png`, `bride.png`)

2. Copy to public folder:
   ```bash
   cp your-groom-image.png public/images/aromal.png
   cp your-bride-image.png public/images/jesna.png
   ```

3. Update image paths in `src/wedding-data.json` if you use different filenames

### 3. Change Color Scheme

Edit `src/index.css` to customize colors:

```css
:root {
  --primary-color: #d4af37;        /* Gold */
  --secondary-color: #8b7355;      /* Brown */
  --text-dark: #2c3e50;            /* Dark text */
  --text-light: #ecf0f1;           /* Light text */
  --bg-light: #ffffff;             /* Background */
  --accent-pink: #ff6b9d;          /* Pink accent */
  --accent-purple: #764ba2;        /* Purple accent */
}
```

### 4. Update Fonts

Currently using:
- **Great Vibes**: Fancy cursive script
- **Montserrat**: Modern sans-serif
- **Cormorant Garamond**: Elegant serif

To change fonts, edit `public/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;600&display=swap" rel="stylesheet">
```

Then update CSS files to use the new font.

## Sharing Invitations

### Creating Personalized Links

Use a spreadsheet to generate personalized URLs for each guest:

| Guest Name | URL |
|------------|-----|
| John Smith | `https://your-website.com/?name=John%20Smith` |
| Jane Doe | `https://your-website.com/?name=Jane%20Doe` |
| The Brown Family | `https://your-website.com/?name=The%20Brown%20Family` |

### URL Encoding Guide

Special characters need to be encoded:
- Space: `%20`
- &: `%26`
- +: `%2B`
- =: `%3D`
- ?: `%3F`

Or use JavaScript:
```javascript
const guestName = "John & Jane Smith";
const encodedName = encodeURIComponent(guestName);
const url = `https://your-website.com/?name=${encodedName}`;
```

## RSVP Management

### Viewing RSVP Responses

RSVPs are currently stored in browser localStorage. To view them:

1. Open browser console (F12)
2. Go to "Application" or "Storage" tab
3. Find "localStorage"
4. Look for key: `rsvps`

### Exporting RSVP Data

In browser console, run:
```javascript
const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
console.table(rsvps);
// Or download as JSON
const dataStr = JSON.stringify(rsvps, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'rsvp-responses.json';
link.click();
```

### Production RSVP Setup

For production, integrate with a backend service:

**Option 1: Google Forms**
- Create a Google Form
- Update the RSVP form to submit to Google Sheets

**Option 2: Backend API**
- Set up a simple backend (Node.js, Python, etc.)
- Update `RSVPForm.js` to POST to your API
- Store in database (MongoDB, PostgreSQL, etc.)

**Option 3: Third-party Services**
- Use services like Formspree, Netlify Forms, or EmailJS
- No backend required

## Deployment

### Deploy to Netlify (Free)

1. Push code to GitHub
2. Connect GitHub to Netlify
3. Deploy with these settings:
   - Build command: `npm run build`
   - Publish directory: `build`

### Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/wedding",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Deploy:
```bash
npm run deploy
```

## Testing

### Test with Different Guest Names

```bash
# Start development server
npm start

# Test URLs:
# http://localhost:3000/?name=Test%20User
# http://localhost:3000/?name=The%20Johnson%20Family
# http://localhost:3000/?name=Sarah%20%26%20Mike
```

### Test Responsive Design

1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Test on various screen sizes:
   - Mobile: 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1440px, 1920px

### Test Accessibility

1. Install Lighthouse extension
2. Run audit
3. Check for:
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast
   - Alt text on images

## Troubleshooting

### Images Not Showing

- Check file paths in `wedding-data.json`
- Ensure images are in `public/images/`
- Clear browser cache and refresh

### Animations Not Working

- Check browser console for errors
- Ensure all dependencies are installed
- Try a different browser

### RSVP Not Saving

- Check browser console for errors
- Ensure localStorage is enabled
- Try incognito mode to test

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Support

For questions or issues:
- Email: your-email@example.com
- Phone: +91 1234567890
