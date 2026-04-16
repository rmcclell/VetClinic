import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  isDarkMode = signal<boolean>(this.loadTheme());

  constructor() {
    // Effect to apply/remove dark theme class to the root element
    effect(() => {
      const isDark = this.isDarkMode();
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.add('dark'); // For Tailwind
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark'); // For Tailwind
      }
      this.saveTheme(isDark);
    });
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
  }

  private loadTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to light or check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }
}
