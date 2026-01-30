# 🎧 EduAudio - Educational Audio Player

A fully functional, production-ready audio player built for educational content, lectures, and podcasts.

![Audio Player](https://via.placeholder.com/800x400?text=EduAudio+Player)

## ✨ Features

### 🎵 Audio Playback
- Play/Pause with large central button
- Skip forward/backward (15 seconds)
- Variable speed control (0.5x, 1x, 1.5x, 2x)
- Volume control with slider
- Visual waveform display

### 📝 Interactive Transcript
- Full synchronized transcript
- Click any timestamp to jump to that moment
- Auto-highlighting of current segment
- Share timestamp feature (copies URL with ?t=seconds)

### 📚 Chapter Navigation
- Chapter markers with timestamps
- Click chapters to navigate
- Visual indicator for current chapter
- Duration display per chapter

### 🎨 Design
- Corporate, professional aesthetic
- Responsive mobile-first design
- Clean IBM/Oracle/Salesforce inspired UI
- High contrast, accessible colors

### 🔗 Sharing
- Shareable timestamp URLs
- Direct deep-linking to any moment
- URL format: `?t=90` jumps to 1:30

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to:
- ✅ Vercel (Recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages
- IONOS Deploy Now
- StaticHost.eu

## 📁 Project Structure

```
eduaudio-player/
├── src/
│   ├── AudioPlayer.tsx       # Main player component
│   ├── AudioPlayer.css        # Player styles
│   ├── App.tsx                # App wrapper
│   ├── App.css                # App styles
│   └── main.tsx               # Entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

## 🎯 Key Components

### AudioPlayer Component

The main component handles:
- Audio state management (play/pause, time, duration)
- Transcript rendering and interaction
- Chapter navigation
- Speed and volume controls
- URL parameter handling for timestamp sharing

### Features Implementation

#### Timestamp Navigation
```typescript
const seekTo = (seconds: number) => {
  if (audioRef.current) {
    audioRef.current.currentTime = seconds;
  }
};

// Usage in transcript
<div onClick={() => seekTo(30)}>0:30 - Transcript text</div>
```

#### Share Timestamp
```typescript
const shareTimestamp = (timestamp: number) => {
  const url = `${window.location.origin}?t=${timestamp}`;
  navigator.clipboard.writeText(url);
};
```

#### Speed Control
```typescript
const changeSpeed = (rate: number) => {
  setPlaybackRate(rate);
  if (audioRef.current) {
    audioRef.current.playbackRate = rate;
  }
};
```

## 🔧 Customization

### Change Audio Source

Edit `AudioPlayer.tsx`, line ~110:

```typescript
<audio
  ref={audioRef}
  src="YOUR_AUDIO_URL_HERE"
  // ... rest of props
/>
```

### Add Your Content

Replace the sample data in `AudioPlayer.tsx`:

```typescript
const chapters: Chapter[] = [
  { id: '1', title: 'Your Chapter', startTime: 0, endTime: 180 },
  // Add more chapters
];

const transcript: TranscriptSegment[] = [
  { timestamp: 0, text: 'Your transcript text' },
  // Add more segments
];
```

### Styling

All styles are in `AudioPlayer.css`. Key CSS variables:

```css
/* Primary color */
#0066cc  /* IBM Blue */

/* Background */
#f5f7fa  /* Light gray */

/* Text */
#1a1a1a  /* Almost black */
#666     /* Secondary text */
```

## 🎨 Design System

### Colors
- **Primary:** `#0066cc` (IBM Blue)
- **Secondary:** `#0052a3` (Darker blue)
- **Background:** `#f5f7fa` (Light gray)
- **Surface:** `#ffffff` (White)
- **Text Primary:** `#1a1a1a`
- **Text Secondary:** `#666666`
- **Border:** `#e0e0e0`

### Typography
- **Font Family:** System font stack (SF Pro, Segoe UI, etc.)
- **Headings:** 600 weight
- **Body:** 400 weight
- **Small:** 14px
- **Base:** 16px
- **Large:** 24px

### Spacing
- **Unit:** 8px base
- **Small:** 8px
- **Medium:** 16px
- **Large:** 24px
- **XL:** 32px

## 🚀 Next Steps: Building the Full Platform

This player is the **consumption layer**. To build the complete educational audio platform:

### Phase 1: Upload System
- File upload interface
- MP3 validation
- Metadata extraction (ID3 tags)

### Phase 2: Processing Pipeline
- Whisper API integration for transcription
- Automatic chapter detection
- Speaker diarization

### Phase 3: Editing Interface
- Transcript editor with timestamp sync
- Chapter marker adjustments
- Metadata form (title, description, tags)

### Phase 4: AI Enhancement
- Auto-generated show notes
- AI-generated chapter images
- SEO optimization
- Quote extraction

### Phase 5: Distribution
- Export package (ZIP with all assets)
- RSS feed generation
- Podcast platform integration
- Embeddable player widget

## 📚 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Vanilla CSS
- **Audio:** HTML5 Audio API
- **State Management:** React Hooks (useState, useRef, useEffect)

## 🤝 Contributing

This is a working prototype. To extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 🎓 Educational Use

Perfect for:
- Online courses
- Corporate training
- Podcast episodes
- Lecture recordings
- Audiobook chapters
- Language learning

## 🐛 Known Issues

- Waveform is currently a visual placeholder (not generated from actual audio)
- Tabs (Chapters/Playlist) need JavaScript to toggle visibility
- Mobile landscape orientation could use optimization

## 🔜 Planned Features

- [ ] Real waveform generation from audio
- [ ] Playlist functionality
- [ ] Keyboard shortcuts (Space, Arrow keys)
- [ ] Dark mode
- [ ] Download transcript button
- [ ] Nested comments system
- [ ] Progress saving (optional)
- [ ] Accessibility improvements (ARIA labels)

## 💬 Support

Need help? Have questions?
- Create an issue in the repository
- Check DEPLOYMENT.md for deployment help
- Review the code comments for implementation details

## 🎉 Credits

Built with love for educators and learners worldwide.

**Special thanks to:**
- React team for amazing DX
- Vite for blazing fast builds
- The open source community

---

**Made with ❤️ for education**
