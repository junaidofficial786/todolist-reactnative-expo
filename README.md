# Smart To-Do (Expo + React Native)

A production-style task app with categories, filters, due dates, swipe-to-delete, dark mode, AsyncStorage persistence, and a centralized theme (Todoist / Notion inspired UI).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) via `npx` (no global install required)

## Install

```bash
npm install
```

### Dependencies (already in `package.json`)

Core packages used by this project:

```bash
npx expo install expo expo-status-bar expo-splash-screen expo-system-ui expo-haptics expo-font expo-constants
npx expo install react react-native react-native-web react-dom
npx expo install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-worklets
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install @react-native-async-storage/async-storage @react-native-community/datetimepicker @expo/vector-icons
```

## Run

```bash
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with **Expo Go**.

```bash
npm run ios
npm run android
```

## Project layout

```text
App.tsx                 # Entry: providers + root navigator
src/
  components/           # Reusable UI (TaskItem, Button, theme toggle, FAB, …)
  screens/              # Home, AddTask, EditTask
  navigation/           # Native stack + types
  context/              # Task + Theme (AsyncStorage)
  hooks/                # Filtered list + progress helpers
  utils/                # IDs, dates, categories, storage keys, sample data
  theme/                # colors.js, spacing.js, typography.js + index.ts
```

## Features

- Add / edit / delete tasks (swipe left on a card, tap **Delete**)
- Optional description, category (Work / Personal / Gym), due date (native picker)
- Filters: All, Pending, Completed
- Progress bar (completed vs total)
- Light / dark theme toggle (persisted)
- Sample tasks on first launch when no saved data exists

## Resetting data

Uninstall the app or clear app data, or remove the keys `@smart_todo/tasks_v1` and `@smart_todo/theme_mode_v1` from storage using a dev menu / debugger if you need a clean slate.

## Notes

- `babel.config.js` includes `react-native-reanimated/plugin` (must stay last).
- `App.tsx` imports `react-native-gesture-handler` and `react-native-reanimated` at the top level, as required by those libraries.
