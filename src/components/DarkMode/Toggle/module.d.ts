export { };

declare global {
  interface Window {
    __theme: string;
    __onThemeChange: (theme?: string) => {}
    __setPreferredTheme: (theme?: string) => void
  }
}