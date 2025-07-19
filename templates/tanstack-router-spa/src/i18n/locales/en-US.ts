/* eslint "sort-keys": ["warn", "asc", {"caseSensitive": false, "natural": false, "minKeys": 2}] */

const enUSLocale = {
  Dialog: {
    close: 'Close',
  },
  HomePage: {
    kitchenSink: 'Kitchen Sink',
    reactHookFormZod: 'React Hook Form with Zod',
    reactQuery: 'Querying and Mutating Data with React Query',
    subTitle:
      'Below you will find a list of example routes with commonly used patterns for React projects',
    title: 'Welcome to a project scaffolded out with the McQuaid Stack!',
  },
  KitchenSinkPage: {
    clickOutsideToClose: 'Click outside to close!',
    count: 'Count',
    darkMode: 'Dark Mode',
    debouncedFilter: 'Debounced filter',
    desktop: 'Desktop',
    device: 'Device',
    dropdownMenu: 'Dropdown Menu',
    enableDarkMode: 'Enable dark mode',
    filterPosts: 'Filter Posts (debounced)',
    filters: 'Filters',
    gridView: 'Grid',
    hide: 'Hide',
    layout: 'Layout',
    listView: 'List',
    matches: 'matches',
    mobile: 'Mobile',
    name: 'Name',
    noPostsFound: 'No posts found matching',
    off: 'Off',
    on: 'On',
    optimizedFor: 'Optimized for',
    posts: 'Posts',
    reactHookFormZodTanstack: 'React Hook Form + Zod + TanStack Query',
    reset: 'Reset',
    show: 'Show',
    submit: 'Submit',
    switchTo: 'Switch to',
    title: 'Kitchen Sink - usehooks-ts Examples',
    typeToFilter: 'Type to filter posts...',
    useCounter: 'useCounter',
    useDebounceValue: 'useDebounceValue',
    usehookstsExamples: 'usehooks-ts Examples',
    useLocalStorageToggle: 'useLocalStorage + useToggle',
    useMediaQueryOnClickOutside: 'useMediaQuery + useOnClickOutside',
    view: 'View',
  },
  Modal: {
    close: 'Close',
  },
  NotFoundPage: {
    home: 'Home',
    notFound: 'Not Found',
    pleaseTryADifferentRoute: 'Please try a different route',
  },
  PageError: {
    goBack: 'Go Back',
    refresh: 'Refresh',
    title: "We're sorry, there was a problem loading this page",
  },
  ReactQueryPage: {
    delete: 'Delete',
    title: 'Querying and Mutating Data with React Query',
    view: 'View',
  },
  Routes: {
    home: '/',
    kitchenSink: '/kitchen-sink',
    reactHookFormZod: '/react-hook-form-zod',
    reactQuery: '/react-query',
  },
} as const;

export default enUSLocale;
