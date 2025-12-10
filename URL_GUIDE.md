# Wedding Invitation URL Guide

This guide explains how to create separate URLs for engagement and wedding invitations.

## URL Parameters

The website supports two URL query parameters:

### 1. `name` - Personalized Guest Name
Shows a personalized greeting to the guest.

### 2. `event` - Event Filter
Filters which event(s) to display on the invitation.

**Valid values:**
- `engagement` - Shows only engagement invitation
- `wedding` - Shows only wedding invitation
- `both` or no parameter - Shows both events (default)

## URL Examples

### All Events (Default)
```
http://localhost:3001/
http://localhost:3001/?name=John%20Smith
```
Shows both engagement and wedding invitations.

### Engagement Only
```
http://localhost:3001/?event=engagement
http://localhost:3001/?event=engagement&name=John%20Smith
```
Shows only the engagement invitation with:
- Engagement-specific hero message
- Only engagement countdown
- Only engagement event details
- RSVP automatically checked for engagement

### Wedding Only
```
http://localhost:3001/?event=wedding
http://localhost:3001/?event=wedding&name=Sarah%20%26%20Mike
```
Shows only the wedding invitation with:
- Wedding-specific hero message
- Only wedding countdown
- Only wedding event details
- RSVP automatically checked for wedding

## Creating Personalized URLs

### For Individual Guests

**Engagement Invitation:**
```
http://localhost:3001/?event=engagement&name=John%20Doe
http://localhost:3001/?event=engagement&name=Jane%20Smith
```

**Wedding Invitation:**
```
http://localhost:3001/?event=wedding&name=John%20Doe
http://localhost:3001/?event=wedding&name=Jane%20Smith
```

**Both Events:**
```
http://localhost:3001/?name=John%20Doe
http://localhost:3001/?name=Jane%20Smith
```

### For Families

```
http://localhost:3001/?event=wedding&name=The%20Johnson%20Family
http://localhost:3001/?event=engagement&name=Mr.%20%26%20Mrs.%20Smith
```

### For Couples

```
http://localhost:3001/?event=both&name=John%20%26%20Jane
http://localhost:3001/?event=wedding&name=Sarah%20%26%20Mike
```

## URL Encoding

Special characters in names need to be encoded:
- **Space:** `%20` or `+`
- **&:** `%26`
- **+:** `%2B`

### Examples:
| Name | Encoded URL Parameter |
|------|----------------------|
| John Smith | `John%20Smith` |
| John & Jane | `John%20%26%20Jane` |
| The Brown Family | `The%20Brown%20Family` |
| Sarah-Ann Miller | `Sarah-Ann%20Miller` |

## Features by Event Type

| Feature | Both Events | Engagement Only | Wedding Only |
|---------|------------|-----------------|--------------|
| Hero Icon | 💕 | 💍 | 💒 |
| Hero Message | "journey of love" | "their engagement" | "their wedding" |
| Countdown | Both events | Engagement only | Wedding only |
| Event Cards | Both cards | Engagement card | Wedding card |
| RSVP Checkboxes | Both shown | Auto-checked | Auto-checked |

## Using in Production

When deploying to production, replace `localhost:3001` with your actual domain:

```
https://yourwedding.com/?event=engagement&name=Guest%20Name
https://yourwedding.com/?event=wedding&name=Guest%20Name
https://yourwedding.com/?name=Guest%20Name
```

## Bulk URL Generation

You can use a spreadsheet to generate URLs for all guests:

### Example Spreadsheet

| Guest Name | Event | Generated URL |
|------------|-------|---------------|
| John Smith | wedding | `https://yourwedding.com/?event=wedding&name=John%20Smith` |
| Jane Doe | both | `https://yourwedding.com/?name=Jane%20Doe` |
| The Browns | engagement | `https://yourwedding.com/?event=engagement&name=The%20Browns` |

### Excel/Google Sheets Formula

```excel
=CONCATENATE("https://yourwedding.com/?event=", B2, "&name=", SUBSTITUTE(A2, " ", "%20"))
```

Where:
- Column A = Guest Name
- Column B = Event Type (engagement/wedding/both)

## Tips

1. **Test URLs:** Always test your URLs before sending
2. **Short Links:** Use a URL shortener (bit.ly, tinyurl) for cleaner sharing
3. **QR Codes:** Generate QR codes from URLs for printed invitations
4. **Tracking:** Consider using UTM parameters for analytics
5. **Email Templates:** Save URL templates for different guest categories

## Common Use Cases

### Scenario 1: Different Guest Lists
- **Close family/friends:** Both events (`?name=Guest`)
- **Extended family:** Wedding only (`?event=wedding&name=Guest`)
- **Close friends:** Engagement only (`?event=engagement&name=Guest`)

### Scenario 2: Separate Ceremonies
- **Local guests:** Both events
- **Out-of-town guests:** Wedding only
- **Intimate engagement:** Selected guests for engagement

### Scenario 3: Phased Invitations
1. Send engagement invites first (`?event=engagement`)
2. Later send wedding invites (`?event=wedding`)
3. Or combine for VIP guests (`?name=Guest` - no event filter)

## Troubleshooting

**Problem:** URL not working
- **Solution:** Check URL encoding of special characters

**Problem:** Wrong event showing
- **Solution:** Verify `event` parameter is exactly `engagement` or `wedding`

**Problem:** Name not displaying
- **Solution:** Ensure `name` parameter is properly encoded

**Problem:** Both events showing when only one expected
- **Solution:** Check that `event` parameter is included in URL
