/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--theme-primary)',
        'primary-hover': 'var(--theme-primary-hover)',
        'primary-active': 'var(--theme-primary-active)',
        secondary: 'var(--theme-secondary)',
        background: 'var(--theme-background)',
        surface: 'var(--theme-surface)',
        text: 'var(--theme-text)',
        'text-secondary': 'var(--theme-text-secondary)',
        border: 'var(--theme-border)',
        hover: 'var(--theme-hover)',
        success: 'var(--theme-success)',
        warning: 'var(--theme-warning)',
        error: 'var(--theme-error)',
        info: 'var(--theme-info)',
      },
      fontFamily: {
        // Note: Fonts are centrally configured in src/config/theme.ts (FONT_CONFIG)
        // Update fonts there to change throughout the application
        lexend: ['"LexendRegular"', 'sans-serif'],
        roboto: ['"RobotoRegular"', 'sans-serif'],
        'roboto-bold': ['"RobotoBold"', 'sans-serif'],
        'roboto-medium': ['"RobotoMedium"', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        base: 'var(--spacing-base)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
    },
  },
  plugins: [],
  // Important: Add corePlugins to work alongside existing CSS
  corePlugins: {
    preflight: false, // Disable Tailwind's base reset to avoid conflicts with Ant Design
  },
}
