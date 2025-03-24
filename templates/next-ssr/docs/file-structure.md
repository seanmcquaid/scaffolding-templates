# File structure

This is the file structure that I have landed on from my years of experience working in web development. But it's important to note that this is not the only way to structure your files. I have seen many different ways to structure files and I have found that this is the most effective for me, but it may not be for you. I encourage you to try out different file structures and see what works best for you! Feel free to open an issue on the repo if you have any questions or suggestions!

I have notably left out any sort of feature flagging, analytics or monitoring which I highly recommend for any production application. This is because these are usually associated with paid services which I did not want to formally endorse in this template.

## /components

This is where all of your components will live. I like to organize my components in two segments, ui or app components. UI components are components that are used throughout the application and are mostly presentational in nature with minimal state management internally. App components are components that are specific to a page or feature and are more complex in nature.

## /constants

This is where all of your constants or enums will live. I like keeping these files small and focused on a specific topic. For example, I would have a `QueryKey.ts` file that would contain all of my query keys for TanStack Query.

## /hooks

This is where all of your custom hooks will live. I have a `services` directory for hooks that are related to API calls with TanStack Query.

## /i18n

This is where all of your i18n related files will live. I have a locales directory to store all of my translations for each language setting. I also have a typesafe instance of i18n that I use to access the translations so I can get type safety when accessing translations outside of the custom `useAppTranslation` hook I have included.

## /icons

This is where all of your icons will live. I like to use svgs for my icons and I use [svgr](https://react-svgr.com/) to convert them to React components.

## /routes

This is where all of your routes will live.

## /services

This is where all of your services for API calls will live. I like to keep my service files small and focused on a specific URL. For example, I would have a `postsService.ts` file that would contain all of my API calls related to the posts microservice. I also have directories for queries with TanStack Query to remove redundancy of manually creating queries for each service hook. There can be instances you want to interact with the queryClient outside of a hook, so I have a `queryClient.ts` file that exports the queryClient instance for the app.

## /styles

This is where all of your global styles or configurations will live.

## /types

This is where all of your shared types or interfaces will live.

## /utils

This is where all of your utility functions will live. I also have a directory for testing related utils for my custom render + renderHook functions that I use for testing. They automatically include the providers that I use throughout the application so I don't have to manually wrap my components with them in my tests.
