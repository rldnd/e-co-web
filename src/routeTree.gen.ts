/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthRouteImport } from './routes/auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthIndexImport } from './routes/auth/index'

// Create/Update Routes

const AuthRouteRoute = AuthRouteImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRouteRoute: AuthRouteRoute.addChildren({ AuthIndexRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/"
      ]
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "parent": "/auth"
    }
  }
}
ROUTE_MANIFEST_END */