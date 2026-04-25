# Modern Language Switcher Design - 2026

## Overview
تم تحديث الـ Language Switcher ليتبع أحدث ممارسات UI/UX لعام 2026 مع تصميم dropdown حديث وتفاعلي.

## Design Features

### 1. **Globe Icon Button**
- أيقونة الكرة الأرضية فقط في الـ header
- Hover effect مع scale animation
- Active indicator dot (نقطة بيضاء متحركة)
- Glassmorphism styling

```tsx
<Button
  variant="ghost"
  size="icon"
  className="hover:scale-110 transition-all duration-300"
>
  <Globe className="h-5 w-5" />
  <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
</Button>
```

### 2. **Modern Dropdown Menu**
- يظهر عند الضغط على الكرة الأرضية
- Glassmorphism effect: `bg-white/10 backdrop-blur-xl`
- Smooth animations: fade-in + slide-in
- Shadow: `shadow-2xl` للعمق

### 3. **Language Options**
- كل لغة مع:
  - Flag emoji (🇸🇦 🇺🇸 🇵🇰)
  - Native name (العربية, English, اردو)
  - Check icon للغة النشطة
  - Hover effect مع background change

### 4. **Interactions**

#### Click Outside to Close
```typescript
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  // ...
}, [isOpen]);
```

#### Escape Key to Close
```typescript
useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };
  // ...
}, [isOpen]);
```

### 5. **Animations**

#### Dropdown Entrance
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-top {
  from { transform: translateY(-8px); }
  to { transform: translateY(0); }
}

.animate-in {
  animation: fade-in 0.2s ease-out, slide-in-from-top 0.2s ease-out;
}
```

#### Button Hover
- Scale: `hover:scale-110`
- Background: `hover:bg-white/10`
- Color: `hover:text-white`

### 6. **Visual Hierarchy**

```
Globe Button (Always Visible)
    ↓ (Click)
Dropdown Menu (Glassmorphism)
    ├─ 🇸🇦 العربية ✓ (Active)
    ├─ 🇺🇸 English
    └─ 🇵🇰 اردو
```

## Styling Details

### Globe Button
```tsx
className="text-white/80 hover:text-white hover:bg-white/10 
           transition-all duration-300 hover:scale-110 relative"
```

### Dropdown Container
```tsx
className="absolute top-full right-0 mt-2 w-48 
           bg-white/10 backdrop-blur-xl 
           border border-white/20 rounded-xl shadow-2xl 
           overflow-hidden animate-in"
```

### Language Option (Active)
```tsx
className="bg-white/20 text-white"
```

### Language Option (Inactive)
```tsx
className="text-white/80 hover:text-white hover:bg-white/10"
```

## Accessibility Features

1. **ARIA Attributes**
   - `aria-label`: وصف الزر
   - `aria-expanded`: حالة الـ dropdown
   - `aria-haspopup`: يشير لوجود popup
   - `role="menu"` و `role="menuitem"`
   - `aria-current`: للغة النشطة

2. **Keyboard Support**
   - Escape key لإغلاق الـ dropdown
   - Click outside لإغلاق الـ dropdown
   - Focus management

3. **Screen Reader Friendly**
   - Labels واضحة بكل اللغات
   - Check icon مع `aria-hidden`

## Locale Configurations

```typescript
export const localeConfigs: Record<Locale, LocaleConfig> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    font: 'IBM Plex Sans Arabic',
    flag: '🇸🇦',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    font: 'Roboto',
    flag: '🇺🇸',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    font: 'IBM Plex Sans Arabic',
    flag: '🇵🇰',
  },
};
```

## User Experience Flow

1. User sees globe icon in header
2. Hover shows scale animation
3. Click opens dropdown with smooth animation
4. User sees all languages with flags
5. Current language highlighted with check mark
6. Click language → dropdown closes → page switches
7. Click outside or press Escape → dropdown closes

## Performance

- **No Layout Shift**: Dropdown positioned absolutely
- **Smooth Animations**: 200ms duration
- **Efficient Re-renders**: State managed locally
- **Event Cleanup**: useEffect cleanup functions

## Mobile Optimization

- Touch-friendly button size (icon button)
- Dropdown width: `w-48` (192px) - comfortable for touch
- Clear visual feedback on tap
- No hover-only interactions

## Browser Support

- ✅ All modern browsers
- ✅ Mobile Safari
- ✅ Chrome Mobile
- ✅ Firefox Mobile

## Future Enhancements

1. Add keyboard navigation (Arrow keys)
2. Add language search for more languages
3. Remember last selected language
4. Add transition animations between languages
5. Add language-specific icons/illustrations

## References

- [Dropdown Menu Best Practices 2026](https://www.eleken.co/blog-posts/dropdown-menu-ui)
- [Accessible Dropdowns](https://copyprogramming.com/howto/use-the-drop-down-menus-to-complete-the-statements)
- [Modern UI Patterns](https://copyprogramming.com/howto/clickable-dropdowns)
