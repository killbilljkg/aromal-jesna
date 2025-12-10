# Wedding Invitation Website

A beautiful, interactive wedding invitation website built with React, featuring stunning Three.js animations, countdown timers, and RSVP functionality.

## Features

- **Personalized Greetings**: URL query parameters allow personalized guest names
- **Three.js Animation**: Stunning scroll-based animation where bride and groom images come together
- **Dual Event Support**: Separate sections for both Engagement and Wedding ceremonies
- **Countdown Timers**: Real-time countdown to both events
- **RSVP Form**: Complete RSVP functionality with form validation
- **Responsive Design**: Fully responsive across all devices
- **Beautiful Animations**: Framer Motion powered animations throughout
- **Accessibility**: Includes reduced motion support and keyboard navigation

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

## Customization

### Update Event Details

Edit `src/wedding-data.json` to update:
- Couple names
- Event dates and times
- Venue information
- Contact details

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
        "mapLink": "https://maps.google.com"
      }
    }
  }
}
```

### Replace Images

Replace the images in `public/images/` folder:
- `aromal.png` - Groom's cutout image
- `jesna.png` - Bride's cutout image

For best results, use PNG images with transparent backgrounds.

### Personalized Invitations

Share the invitation with personalized guest names using URL query parameters:

```
https://your-website.com/?name=John%20Smith
```

This will display "Dear John Smith" in the hero section.

## Components

- **HeroSection**: Landing page with couple names and invitation message
- **ThreeAnimation**: 3D scroll animation with bride and groom images
- **CountdownTimer**: Dual countdown timers for both events
- **EventCards**: Detailed information about engagement and wedding
- **RSVPForm**: Interactive RSVP form with validation

## Technologies Used

- React 18
- React Three Fiber (Three.js for React)
- Framer Motion (Animations)
- Custom CSS with CSS Grid and Flexbox

## RSVP Data

RSVPs are currently stored in browser's localStorage. For production, integrate with a backend service:

1. Create a backend API endpoint
2. Update `RSVPForm.js` to POST data to your API
3. Set up a database to store responses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for personal use.

## Support

For questions or issues, contact:
- Email: rsvp@aromaljesna.com
- Phone: +91 1234567890
