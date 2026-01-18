export const appConfig = {
  name: 'Quick Read',
  description: 'Speed read tweets with RSVP',

  // Default RSVP settings
  defaultWPM: 300,
  minWPM: 100,
  maxWPM: 1000,
  wpmPresets: [200, 300, 500, 700],

  // Keyboard shortcuts
  shortcuts: {
    togglePlayback: ' ', // Space
    restart: 'r',
    speedUp: 'ArrowUp',
    speedDown: 'ArrowDown',
    skipForward: 'ArrowRight',
    skipBackward: 'ArrowLeft',
  },
}
