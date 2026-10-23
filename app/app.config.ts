export default defineAppConfig({
  ui: {
    colors: {
      primary: 'gold',
      neutral: 'stone',
    },
    button: {
      defaultVariants: {
        size: 'md',
      },
    },
    badge: {
      defaultVariants: {
        size: 'sm',
      },
    },
    modal: {
      slots: {
        overlay: 'bg-obsidian/70 backdrop-blur-xs',
        content: 'bg-ivory',
      },
    },
  },
})
