/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/_main'
import { Route as AuthImport } from './routes/_auth'
import { Route as MainIndexImport } from './routes/_main/index'
import { Route as MainStudentsImport } from './routes/_main/students'
import { Route as MainReportsImport } from './routes/_main/reports'
import { Route as MainLidsImport } from './routes/_main/lids'
import { Route as MainEmployeesImport } from './routes/_main/employees'
import { Route as MainGroupsIndexImport } from './routes/_main/groups/index'
import { Route as MainFinanceIndexImport } from './routes/_main/finance/index'
import { Route as MainSettingsMainImport } from './routes/_main/settings/_main'
import { Route as MainFinanceIncomeImport } from './routes/_main/finance/income'
import { Route as MainFinanceCostImport } from './routes/_main/finance/cost'
import { Route as MainAttendanceMainImport } from './routes/_main/attendance/_main'
import { Route as MainSettingsMainIndexImport } from './routes/_main/settings/_main/index'
import { Route as MainAttendanceMainIndexImport } from './routes/_main/attendance/_main/index'
import { Route as MainSettingsMainRoomsImport } from './routes/_main/settings/_main/rooms'
import { Route as MainSettingsMainRolesImport } from './routes/_main/settings/_main/roles'
import { Route as MainSettingsMainPaymentTypeImport } from './routes/_main/settings/_main/payment-type'
import { Route as MainSettingsMainHolidaysImport } from './routes/_main/settings/_main/holidays'
import { Route as MainSettingsMainCoursesImport } from './routes/_main/settings/_main/courses'
import { Route as MainSettingsMainBranchesImport } from './routes/_main/settings/_main/branches'
import { Route as MainGroupsIdMainImport } from './routes/_main/groups/$id/_main'
import { Route as MainAttendanceMainStudentsImport } from './routes/_main/attendance/_main/students'
import { Route as MainAttendanceMainEmployeesImport } from './routes/_main/attendance/_main/employees'
import { Route as MainGroupsIdMainIndexImport } from './routes/_main/groups/$id/_main/index'
import { Route as MainGroupsIdMainStudentsImport } from './routes/_main/groups/$id/_main/students'
import { Route as MainGroupsIdMainScoreImport } from './routes/_main/groups/$id/_main/score'
import { Route as MainGroupsIdMainSaleImport } from './routes/_main/groups/$id/_main/sale'
import { Route as MainGroupsIdMainNotesImport } from './routes/_main/groups/$id/_main/notes'
import { Route as MainGroupsIdMainExamsImport } from './routes/_main/groups/$id/_main/exams'
import { Route as MainGroupsIdMainAttendanceImport } from './routes/_main/groups/$id/_main/attendance'

// Create Virtual Routes

const MainSettingsImport = createFileRoute('/_main/settings')()
const MainAttendanceImport = createFileRoute('/_main/attendance')()
const AuthAuthLazyImport = createFileRoute('/_auth/auth')()
const MainGroupsIdImport = createFileRoute('/_main/groups/$id')()

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/_main',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const MainSettingsRoute = MainSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => MainRoute,
} as any)

const MainAttendanceRoute = MainAttendanceImport.update({
  id: '/attendance',
  path: '/attendance',
  getParentRoute: () => MainRoute,
} as any)

const MainIndexRoute = MainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainRoute,
} as any)

const AuthAuthLazyRoute = AuthAuthLazyImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/auth.lazy').then((d) => d.Route))

const MainStudentsRoute = MainStudentsImport.update({
  id: '/students',
  path: '/students',
  getParentRoute: () => MainRoute,
} as any)

const MainReportsRoute = MainReportsImport.update({
  id: '/reports',
  path: '/reports',
  getParentRoute: () => MainRoute,
} as any)

const MainLidsRoute = MainLidsImport.update({
  id: '/lids',
  path: '/lids',
  getParentRoute: () => MainRoute,
} as any)

const MainEmployeesRoute = MainEmployeesImport.update({
  id: '/employees',
  path: '/employees',
  getParentRoute: () => MainRoute,
} as any)

const MainGroupsIdRoute = MainGroupsIdImport.update({
  id: '/groups/$id',
  path: '/groups/$id',
  getParentRoute: () => MainRoute,
} as any)

const MainGroupsIndexRoute = MainGroupsIndexImport.update({
  id: '/groups/',
  path: '/groups/',
  getParentRoute: () => MainRoute,
} as any)

const MainFinanceIndexRoute = MainFinanceIndexImport.update({
  id: '/finance/',
  path: '/finance/',
  getParentRoute: () => MainRoute,
} as any)

const MainSettingsMainRoute = MainSettingsMainImport.update({
  id: '/_main',
  getParentRoute: () => MainSettingsRoute,
} as any)

const MainFinanceIncomeRoute = MainFinanceIncomeImport.update({
  id: '/finance/income',
  path: '/finance/income',
  getParentRoute: () => MainRoute,
} as any)

const MainFinanceCostRoute = MainFinanceCostImport.update({
  id: '/finance/cost',
  path: '/finance/cost',
  getParentRoute: () => MainRoute,
} as any)

const MainAttendanceMainRoute = MainAttendanceMainImport.update({
  id: '/_main',
  getParentRoute: () => MainAttendanceRoute,
} as any)

const MainSettingsMainIndexRoute = MainSettingsMainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainAttendanceMainIndexRoute = MainAttendanceMainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainAttendanceMainRoute,
} as any)

const MainSettingsMainRoomsRoute = MainSettingsMainRoomsImport.update({
  id: '/rooms',
  path: '/rooms',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainSettingsMainRolesRoute = MainSettingsMainRolesImport.update({
  id: '/roles',
  path: '/roles',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainSettingsMainPaymentTypeRoute =
  MainSettingsMainPaymentTypeImport.update({
    id: '/payment-type',
    path: '/payment-type',
    getParentRoute: () => MainSettingsMainRoute,
  } as any)

const MainSettingsMainHolidaysRoute = MainSettingsMainHolidaysImport.update({
  id: '/holidays',
  path: '/holidays',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainSettingsMainCoursesRoute = MainSettingsMainCoursesImport.update({
  id: '/courses',
  path: '/courses',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainSettingsMainBranchesRoute = MainSettingsMainBranchesImport.update({
  id: '/branches',
  path: '/branches',
  getParentRoute: () => MainSettingsMainRoute,
} as any)

const MainGroupsIdMainRoute = MainGroupsIdMainImport.update({
  id: '/_main',
  getParentRoute: () => MainGroupsIdRoute,
} as any)

const MainAttendanceMainStudentsRoute = MainAttendanceMainStudentsImport.update(
  {
    id: '/students',
    path: '/students',
    getParentRoute: () => MainAttendanceMainRoute,
  } as any,
)

const MainAttendanceMainEmployeesRoute =
  MainAttendanceMainEmployeesImport.update({
    id: '/employees',
    path: '/employees',
    getParentRoute: () => MainAttendanceMainRoute,
  } as any)

const MainGroupsIdMainIndexRoute = MainGroupsIdMainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainStudentsRoute = MainGroupsIdMainStudentsImport.update({
  id: '/students',
  path: '/students',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainScoreRoute = MainGroupsIdMainScoreImport.update({
  id: '/score',
  path: '/score',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainSaleRoute = MainGroupsIdMainSaleImport.update({
  id: '/sale',
  path: '/sale',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainNotesRoute = MainGroupsIdMainNotesImport.update({
  id: '/notes',
  path: '/notes',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainExamsRoute = MainGroupsIdMainExamsImport.update({
  id: '/exams',
  path: '/exams',
  getParentRoute: () => MainGroupsIdMainRoute,
} as any)

const MainGroupsIdMainAttendanceRoute = MainGroupsIdMainAttendanceImport.update(
  {
    id: '/attendance',
    path: '/attendance',
    getParentRoute: () => MainGroupsIdMainRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/_main/employees': {
      id: '/_main/employees'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof MainEmployeesImport
      parentRoute: typeof MainImport
    }
    '/_main/lids': {
      id: '/_main/lids'
      path: '/lids'
      fullPath: '/lids'
      preLoaderRoute: typeof MainLidsImport
      parentRoute: typeof MainImport
    }
    '/_main/reports': {
      id: '/_main/reports'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof MainReportsImport
      parentRoute: typeof MainImport
    }
    '/_main/students': {
      id: '/_main/students'
      path: '/students'
      fullPath: '/students'
      preLoaderRoute: typeof MainStudentsImport
      parentRoute: typeof MainImport
    }
    '/_auth/auth': {
      id: '/_auth/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthLazyImport
      parentRoute: typeof AuthImport
    }
    '/_main/': {
      id: '/_main/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainIndexImport
      parentRoute: typeof MainImport
    }
    '/_main/attendance': {
      id: '/_main/attendance'
      path: '/attendance'
      fullPath: '/attendance'
      preLoaderRoute: typeof MainAttendanceImport
      parentRoute: typeof MainImport
    }
    '/_main/attendance/_main': {
      id: '/_main/attendance/_main'
      path: '/attendance'
      fullPath: '/attendance'
      preLoaderRoute: typeof MainAttendanceMainImport
      parentRoute: typeof MainAttendanceRoute
    }
    '/_main/finance/cost': {
      id: '/_main/finance/cost'
      path: '/finance/cost'
      fullPath: '/finance/cost'
      preLoaderRoute: typeof MainFinanceCostImport
      parentRoute: typeof MainImport
    }
    '/_main/finance/income': {
      id: '/_main/finance/income'
      path: '/finance/income'
      fullPath: '/finance/income'
      preLoaderRoute: typeof MainFinanceIncomeImport
      parentRoute: typeof MainImport
    }
    '/_main/settings': {
      id: '/_main/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof MainSettingsImport
      parentRoute: typeof MainImport
    }
    '/_main/settings/_main': {
      id: '/_main/settings/_main'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof MainSettingsMainImport
      parentRoute: typeof MainSettingsRoute
    }
    '/_main/finance/': {
      id: '/_main/finance/'
      path: '/finance'
      fullPath: '/finance'
      preLoaderRoute: typeof MainFinanceIndexImport
      parentRoute: typeof MainImport
    }
    '/_main/groups/': {
      id: '/_main/groups/'
      path: '/groups'
      fullPath: '/groups'
      preLoaderRoute: typeof MainGroupsIndexImport
      parentRoute: typeof MainImport
    }
    '/_main/attendance/_main/employees': {
      id: '/_main/attendance/_main/employees'
      path: '/employees'
      fullPath: '/attendance/employees'
      preLoaderRoute: typeof MainAttendanceMainEmployeesImport
      parentRoute: typeof MainAttendanceMainImport
    }
    '/_main/attendance/_main/students': {
      id: '/_main/attendance/_main/students'
      path: '/students'
      fullPath: '/attendance/students'
      preLoaderRoute: typeof MainAttendanceMainStudentsImport
      parentRoute: typeof MainAttendanceMainImport
    }
    '/_main/groups/$id': {
      id: '/_main/groups/$id'
      path: '/groups/$id'
      fullPath: '/groups/$id'
      preLoaderRoute: typeof MainGroupsIdImport
      parentRoute: typeof MainImport
    }
    '/_main/groups/$id/_main': {
      id: '/_main/groups/$id/_main'
      path: '/groups/$id'
      fullPath: '/groups/$id'
      preLoaderRoute: typeof MainGroupsIdMainImport
      parentRoute: typeof MainGroupsIdRoute
    }
    '/_main/settings/_main/branches': {
      id: '/_main/settings/_main/branches'
      path: '/branches'
      fullPath: '/settings/branches'
      preLoaderRoute: typeof MainSettingsMainBranchesImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/settings/_main/courses': {
      id: '/_main/settings/_main/courses'
      path: '/courses'
      fullPath: '/settings/courses'
      preLoaderRoute: typeof MainSettingsMainCoursesImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/settings/_main/holidays': {
      id: '/_main/settings/_main/holidays'
      path: '/holidays'
      fullPath: '/settings/holidays'
      preLoaderRoute: typeof MainSettingsMainHolidaysImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/settings/_main/payment-type': {
      id: '/_main/settings/_main/payment-type'
      path: '/payment-type'
      fullPath: '/settings/payment-type'
      preLoaderRoute: typeof MainSettingsMainPaymentTypeImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/settings/_main/roles': {
      id: '/_main/settings/_main/roles'
      path: '/roles'
      fullPath: '/settings/roles'
      preLoaderRoute: typeof MainSettingsMainRolesImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/settings/_main/rooms': {
      id: '/_main/settings/_main/rooms'
      path: '/rooms'
      fullPath: '/settings/rooms'
      preLoaderRoute: typeof MainSettingsMainRoomsImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/attendance/_main/': {
      id: '/_main/attendance/_main/'
      path: '/'
      fullPath: '/attendance/'
      preLoaderRoute: typeof MainAttendanceMainIndexImport
      parentRoute: typeof MainAttendanceMainImport
    }
    '/_main/settings/_main/': {
      id: '/_main/settings/_main/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof MainSettingsMainIndexImport
      parentRoute: typeof MainSettingsMainImport
    }
    '/_main/groups/$id/_main/attendance': {
      id: '/_main/groups/$id/_main/attendance'
      path: '/attendance'
      fullPath: '/groups/$id/attendance'
      preLoaderRoute: typeof MainGroupsIdMainAttendanceImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/exams': {
      id: '/_main/groups/$id/_main/exams'
      path: '/exams'
      fullPath: '/groups/$id/exams'
      preLoaderRoute: typeof MainGroupsIdMainExamsImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/notes': {
      id: '/_main/groups/$id/_main/notes'
      path: '/notes'
      fullPath: '/groups/$id/notes'
      preLoaderRoute: typeof MainGroupsIdMainNotesImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/sale': {
      id: '/_main/groups/$id/_main/sale'
      path: '/sale'
      fullPath: '/groups/$id/sale'
      preLoaderRoute: typeof MainGroupsIdMainSaleImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/score': {
      id: '/_main/groups/$id/_main/score'
      path: '/score'
      fullPath: '/groups/$id/score'
      preLoaderRoute: typeof MainGroupsIdMainScoreImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/students': {
      id: '/_main/groups/$id/_main/students'
      path: '/students'
      fullPath: '/groups/$id/students'
      preLoaderRoute: typeof MainGroupsIdMainStudentsImport
      parentRoute: typeof MainGroupsIdMainImport
    }
    '/_main/groups/$id/_main/': {
      id: '/_main/groups/$id/_main/'
      path: '/'
      fullPath: '/groups/$id/'
      preLoaderRoute: typeof MainGroupsIdMainIndexImport
      parentRoute: typeof MainGroupsIdMainImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthAuthLazyRoute: typeof AuthAuthLazyRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthLazyRoute: AuthAuthLazyRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface MainAttendanceMainRouteChildren {
  MainAttendanceMainEmployeesRoute: typeof MainAttendanceMainEmployeesRoute
  MainAttendanceMainStudentsRoute: typeof MainAttendanceMainStudentsRoute
  MainAttendanceMainIndexRoute: typeof MainAttendanceMainIndexRoute
}

const MainAttendanceMainRouteChildren: MainAttendanceMainRouteChildren = {
  MainAttendanceMainEmployeesRoute: MainAttendanceMainEmployeesRoute,
  MainAttendanceMainStudentsRoute: MainAttendanceMainStudentsRoute,
  MainAttendanceMainIndexRoute: MainAttendanceMainIndexRoute,
}

const MainAttendanceMainRouteWithChildren =
  MainAttendanceMainRoute._addFileChildren(MainAttendanceMainRouteChildren)

interface MainAttendanceRouteChildren {
  MainAttendanceMainRoute: typeof MainAttendanceMainRouteWithChildren
}

const MainAttendanceRouteChildren: MainAttendanceRouteChildren = {
  MainAttendanceMainRoute: MainAttendanceMainRouteWithChildren,
}

const MainAttendanceRouteWithChildren = MainAttendanceRoute._addFileChildren(
  MainAttendanceRouteChildren,
)

interface MainSettingsMainRouteChildren {
  MainSettingsMainBranchesRoute: typeof MainSettingsMainBranchesRoute
  MainSettingsMainCoursesRoute: typeof MainSettingsMainCoursesRoute
  MainSettingsMainHolidaysRoute: typeof MainSettingsMainHolidaysRoute
  MainSettingsMainPaymentTypeRoute: typeof MainSettingsMainPaymentTypeRoute
  MainSettingsMainRolesRoute: typeof MainSettingsMainRolesRoute
  MainSettingsMainRoomsRoute: typeof MainSettingsMainRoomsRoute
  MainSettingsMainIndexRoute: typeof MainSettingsMainIndexRoute
}

const MainSettingsMainRouteChildren: MainSettingsMainRouteChildren = {
  MainSettingsMainBranchesRoute: MainSettingsMainBranchesRoute,
  MainSettingsMainCoursesRoute: MainSettingsMainCoursesRoute,
  MainSettingsMainHolidaysRoute: MainSettingsMainHolidaysRoute,
  MainSettingsMainPaymentTypeRoute: MainSettingsMainPaymentTypeRoute,
  MainSettingsMainRolesRoute: MainSettingsMainRolesRoute,
  MainSettingsMainRoomsRoute: MainSettingsMainRoomsRoute,
  MainSettingsMainIndexRoute: MainSettingsMainIndexRoute,
}

const MainSettingsMainRouteWithChildren =
  MainSettingsMainRoute._addFileChildren(MainSettingsMainRouteChildren)

interface MainSettingsRouteChildren {
  MainSettingsMainRoute: typeof MainSettingsMainRouteWithChildren
}

const MainSettingsRouteChildren: MainSettingsRouteChildren = {
  MainSettingsMainRoute: MainSettingsMainRouteWithChildren,
}

const MainSettingsRouteWithChildren = MainSettingsRoute._addFileChildren(
  MainSettingsRouteChildren,
)

interface MainGroupsIdMainRouteChildren {
  MainGroupsIdMainAttendanceRoute: typeof MainGroupsIdMainAttendanceRoute
  MainGroupsIdMainExamsRoute: typeof MainGroupsIdMainExamsRoute
  MainGroupsIdMainNotesRoute: typeof MainGroupsIdMainNotesRoute
  MainGroupsIdMainSaleRoute: typeof MainGroupsIdMainSaleRoute
  MainGroupsIdMainScoreRoute: typeof MainGroupsIdMainScoreRoute
  MainGroupsIdMainStudentsRoute: typeof MainGroupsIdMainStudentsRoute
  MainGroupsIdMainIndexRoute: typeof MainGroupsIdMainIndexRoute
}

const MainGroupsIdMainRouteChildren: MainGroupsIdMainRouteChildren = {
  MainGroupsIdMainAttendanceRoute: MainGroupsIdMainAttendanceRoute,
  MainGroupsIdMainExamsRoute: MainGroupsIdMainExamsRoute,
  MainGroupsIdMainNotesRoute: MainGroupsIdMainNotesRoute,
  MainGroupsIdMainSaleRoute: MainGroupsIdMainSaleRoute,
  MainGroupsIdMainScoreRoute: MainGroupsIdMainScoreRoute,
  MainGroupsIdMainStudentsRoute: MainGroupsIdMainStudentsRoute,
  MainGroupsIdMainIndexRoute: MainGroupsIdMainIndexRoute,
}

const MainGroupsIdMainRouteWithChildren =
  MainGroupsIdMainRoute._addFileChildren(MainGroupsIdMainRouteChildren)

interface MainGroupsIdRouteChildren {
  MainGroupsIdMainRoute: typeof MainGroupsIdMainRouteWithChildren
}

const MainGroupsIdRouteChildren: MainGroupsIdRouteChildren = {
  MainGroupsIdMainRoute: MainGroupsIdMainRouteWithChildren,
}

const MainGroupsIdRouteWithChildren = MainGroupsIdRoute._addFileChildren(
  MainGroupsIdRouteChildren,
)

interface MainRouteChildren {
  MainEmployeesRoute: typeof MainEmployeesRoute
  MainLidsRoute: typeof MainLidsRoute
  MainReportsRoute: typeof MainReportsRoute
  MainStudentsRoute: typeof MainStudentsRoute
  MainIndexRoute: typeof MainIndexRoute
  MainAttendanceRoute: typeof MainAttendanceRouteWithChildren
  MainFinanceCostRoute: typeof MainFinanceCostRoute
  MainFinanceIncomeRoute: typeof MainFinanceIncomeRoute
  MainSettingsRoute: typeof MainSettingsRouteWithChildren
  MainFinanceIndexRoute: typeof MainFinanceIndexRoute
  MainGroupsIndexRoute: typeof MainGroupsIndexRoute
  MainGroupsIdRoute: typeof MainGroupsIdRouteWithChildren
}

const MainRouteChildren: MainRouteChildren = {
  MainEmployeesRoute: MainEmployeesRoute,
  MainLidsRoute: MainLidsRoute,
  MainReportsRoute: MainReportsRoute,
  MainStudentsRoute: MainStudentsRoute,
  MainIndexRoute: MainIndexRoute,
  MainAttendanceRoute: MainAttendanceRouteWithChildren,
  MainFinanceCostRoute: MainFinanceCostRoute,
  MainFinanceIncomeRoute: MainFinanceIncomeRoute,
  MainSettingsRoute: MainSettingsRouteWithChildren,
  MainFinanceIndexRoute: MainFinanceIndexRoute,
  MainGroupsIndexRoute: MainGroupsIndexRoute,
  MainGroupsIdRoute: MainGroupsIdRouteWithChildren,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof MainRouteWithChildren
  '/employees': typeof MainEmployeesRoute
  '/lids': typeof MainLidsRoute
  '/reports': typeof MainReportsRoute
  '/students': typeof MainStudentsRoute
  '/auth': typeof AuthAuthLazyRoute
  '/': typeof MainIndexRoute
  '/attendance': typeof MainAttendanceMainRouteWithChildren
  '/finance/cost': typeof MainFinanceCostRoute
  '/finance/income': typeof MainFinanceIncomeRoute
  '/settings': typeof MainSettingsMainRouteWithChildren
  '/finance': typeof MainFinanceIndexRoute
  '/groups': typeof MainGroupsIndexRoute
  '/attendance/employees': typeof MainAttendanceMainEmployeesRoute
  '/attendance/students': typeof MainAttendanceMainStudentsRoute
  '/groups/$id': typeof MainGroupsIdMainRouteWithChildren
  '/settings/branches': typeof MainSettingsMainBranchesRoute
  '/settings/courses': typeof MainSettingsMainCoursesRoute
  '/settings/holidays': typeof MainSettingsMainHolidaysRoute
  '/settings/payment-type': typeof MainSettingsMainPaymentTypeRoute
  '/settings/roles': typeof MainSettingsMainRolesRoute
  '/settings/rooms': typeof MainSettingsMainRoomsRoute
  '/attendance/': typeof MainAttendanceMainIndexRoute
  '/settings/': typeof MainSettingsMainIndexRoute
  '/groups/$id/attendance': typeof MainGroupsIdMainAttendanceRoute
  '/groups/$id/exams': typeof MainGroupsIdMainExamsRoute
  '/groups/$id/notes': typeof MainGroupsIdMainNotesRoute
  '/groups/$id/sale': typeof MainGroupsIdMainSaleRoute
  '/groups/$id/score': typeof MainGroupsIdMainScoreRoute
  '/groups/$id/students': typeof MainGroupsIdMainStudentsRoute
  '/groups/$id/': typeof MainGroupsIdMainIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/employees': typeof MainEmployeesRoute
  '/lids': typeof MainLidsRoute
  '/reports': typeof MainReportsRoute
  '/students': typeof MainStudentsRoute
  '/auth': typeof AuthAuthLazyRoute
  '/': typeof MainIndexRoute
  '/attendance': typeof MainAttendanceMainIndexRoute
  '/finance/cost': typeof MainFinanceCostRoute
  '/finance/income': typeof MainFinanceIncomeRoute
  '/settings': typeof MainSettingsMainIndexRoute
  '/finance': typeof MainFinanceIndexRoute
  '/groups': typeof MainGroupsIndexRoute
  '/attendance/employees': typeof MainAttendanceMainEmployeesRoute
  '/attendance/students': typeof MainAttendanceMainStudentsRoute
  '/groups/$id': typeof MainGroupsIdMainIndexRoute
  '/settings/branches': typeof MainSettingsMainBranchesRoute
  '/settings/courses': typeof MainSettingsMainCoursesRoute
  '/settings/holidays': typeof MainSettingsMainHolidaysRoute
  '/settings/payment-type': typeof MainSettingsMainPaymentTypeRoute
  '/settings/roles': typeof MainSettingsMainRolesRoute
  '/settings/rooms': typeof MainSettingsMainRoomsRoute
  '/groups/$id/attendance': typeof MainGroupsIdMainAttendanceRoute
  '/groups/$id/exams': typeof MainGroupsIdMainExamsRoute
  '/groups/$id/notes': typeof MainGroupsIdMainNotesRoute
  '/groups/$id/sale': typeof MainGroupsIdMainSaleRoute
  '/groups/$id/score': typeof MainGroupsIdMainScoreRoute
  '/groups/$id/students': typeof MainGroupsIdMainStudentsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_main': typeof MainRouteWithChildren
  '/_main/employees': typeof MainEmployeesRoute
  '/_main/lids': typeof MainLidsRoute
  '/_main/reports': typeof MainReportsRoute
  '/_main/students': typeof MainStudentsRoute
  '/_auth/auth': typeof AuthAuthLazyRoute
  '/_main/': typeof MainIndexRoute
  '/_main/attendance': typeof MainAttendanceRouteWithChildren
  '/_main/attendance/_main': typeof MainAttendanceMainRouteWithChildren
  '/_main/finance/cost': typeof MainFinanceCostRoute
  '/_main/finance/income': typeof MainFinanceIncomeRoute
  '/_main/settings': typeof MainSettingsRouteWithChildren
  '/_main/settings/_main': typeof MainSettingsMainRouteWithChildren
  '/_main/finance/': typeof MainFinanceIndexRoute
  '/_main/groups/': typeof MainGroupsIndexRoute
  '/_main/attendance/_main/employees': typeof MainAttendanceMainEmployeesRoute
  '/_main/attendance/_main/students': typeof MainAttendanceMainStudentsRoute
  '/_main/groups/$id': typeof MainGroupsIdRouteWithChildren
  '/_main/groups/$id/_main': typeof MainGroupsIdMainRouteWithChildren
  '/_main/settings/_main/branches': typeof MainSettingsMainBranchesRoute
  '/_main/settings/_main/courses': typeof MainSettingsMainCoursesRoute
  '/_main/settings/_main/holidays': typeof MainSettingsMainHolidaysRoute
  '/_main/settings/_main/payment-type': typeof MainSettingsMainPaymentTypeRoute
  '/_main/settings/_main/roles': typeof MainSettingsMainRolesRoute
  '/_main/settings/_main/rooms': typeof MainSettingsMainRoomsRoute
  '/_main/attendance/_main/': typeof MainAttendanceMainIndexRoute
  '/_main/settings/_main/': typeof MainSettingsMainIndexRoute
  '/_main/groups/$id/_main/attendance': typeof MainGroupsIdMainAttendanceRoute
  '/_main/groups/$id/_main/exams': typeof MainGroupsIdMainExamsRoute
  '/_main/groups/$id/_main/notes': typeof MainGroupsIdMainNotesRoute
  '/_main/groups/$id/_main/sale': typeof MainGroupsIdMainSaleRoute
  '/_main/groups/$id/_main/score': typeof MainGroupsIdMainScoreRoute
  '/_main/groups/$id/_main/students': typeof MainGroupsIdMainStudentsRoute
  '/_main/groups/$id/_main/': typeof MainGroupsIdMainIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/employees'
    | '/lids'
    | '/reports'
    | '/students'
    | '/auth'
    | '/'
    | '/attendance'
    | '/finance/cost'
    | '/finance/income'
    | '/settings'
    | '/finance'
    | '/groups'
    | '/attendance/employees'
    | '/attendance/students'
    | '/groups/$id'
    | '/settings/branches'
    | '/settings/courses'
    | '/settings/holidays'
    | '/settings/payment-type'
    | '/settings/roles'
    | '/settings/rooms'
    | '/attendance/'
    | '/settings/'
    | '/groups/$id/attendance'
    | '/groups/$id/exams'
    | '/groups/$id/notes'
    | '/groups/$id/sale'
    | '/groups/$id/score'
    | '/groups/$id/students'
    | '/groups/$id/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/employees'
    | '/lids'
    | '/reports'
    | '/students'
    | '/auth'
    | '/'
    | '/attendance'
    | '/finance/cost'
    | '/finance/income'
    | '/settings'
    | '/finance'
    | '/groups'
    | '/attendance/employees'
    | '/attendance/students'
    | '/groups/$id'
    | '/settings/branches'
    | '/settings/courses'
    | '/settings/holidays'
    | '/settings/payment-type'
    | '/settings/roles'
    | '/settings/rooms'
    | '/groups/$id/attendance'
    | '/groups/$id/exams'
    | '/groups/$id/notes'
    | '/groups/$id/sale'
    | '/groups/$id/score'
    | '/groups/$id/students'
  id:
    | '__root__'
    | '/_auth'
    | '/_main'
    | '/_main/employees'
    | '/_main/lids'
    | '/_main/reports'
    | '/_main/students'
    | '/_auth/auth'
    | '/_main/'
    | '/_main/attendance'
    | '/_main/attendance/_main'
    | '/_main/finance/cost'
    | '/_main/finance/income'
    | '/_main/settings'
    | '/_main/settings/_main'
    | '/_main/finance/'
    | '/_main/groups/'
    | '/_main/attendance/_main/employees'
    | '/_main/attendance/_main/students'
    | '/_main/groups/$id'
    | '/_main/groups/$id/_main'
    | '/_main/settings/_main/branches'
    | '/_main/settings/_main/courses'
    | '/_main/settings/_main/holidays'
    | '/_main/settings/_main/payment-type'
    | '/_main/settings/_main/roles'
    | '/_main/settings/_main/rooms'
    | '/_main/attendance/_main/'
    | '/_main/settings/_main/'
    | '/_main/groups/$id/_main/attendance'
    | '/_main/groups/$id/_main/exams'
    | '/_main/groups/$id/_main/notes'
    | '/_main/groups/$id/_main/sale'
    | '/_main/groups/$id/_main/score'
    | '/_main/groups/$id/_main/students'
    | '/_main/groups/$id/_main/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  MainRoute: typeof MainRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  MainRoute: MainRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_main"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/auth"
      ]
    },
    "/_main": {
      "filePath": "_main.tsx",
      "children": [
        "/_main/employees",
        "/_main/lids",
        "/_main/reports",
        "/_main/students",
        "/_main/",
        "/_main/attendance",
        "/_main/finance/cost",
        "/_main/finance/income",
        "/_main/settings",
        "/_main/finance/",
        "/_main/groups/",
        "/_main/groups/$id"
      ]
    },
    "/_main/employees": {
      "filePath": "_main/employees.tsx",
      "parent": "/_main"
    },
    "/_main/lids": {
      "filePath": "_main/lids.tsx",
      "parent": "/_main"
    },
    "/_main/reports": {
      "filePath": "_main/reports.tsx",
      "parent": "/_main"
    },
    "/_main/students": {
      "filePath": "_main/students.tsx",
      "parent": "/_main"
    },
    "/_auth/auth": {
      "filePath": "_auth/auth.lazy.tsx",
      "parent": "/_auth"
    },
    "/_main/": {
      "filePath": "_main/index.tsx",
      "parent": "/_main"
    },
    "/_main/attendance": {
      "filePath": "_main/attendance",
      "parent": "/_main",
      "children": [
        "/_main/attendance/_main"
      ]
    },
    "/_main/attendance/_main": {
      "filePath": "_main/attendance/_main.tsx",
      "parent": "/_main/attendance",
      "children": [
        "/_main/attendance/_main/employees",
        "/_main/attendance/_main/students",
        "/_main/attendance/_main/"
      ]
    },
    "/_main/finance/cost": {
      "filePath": "_main/finance/cost.tsx",
      "parent": "/_main"
    },
    "/_main/finance/income": {
      "filePath": "_main/finance/income.tsx",
      "parent": "/_main"
    },
    "/_main/settings": {
      "filePath": "_main/settings",
      "parent": "/_main",
      "children": [
        "/_main/settings/_main"
      ]
    },
    "/_main/settings/_main": {
      "filePath": "_main/settings/_main.tsx",
      "parent": "/_main/settings",
      "children": [
        "/_main/settings/_main/branches",
        "/_main/settings/_main/courses",
        "/_main/settings/_main/holidays",
        "/_main/settings/_main/payment-type",
        "/_main/settings/_main/roles",
        "/_main/settings/_main/rooms",
        "/_main/settings/_main/"
      ]
    },
    "/_main/finance/": {
      "filePath": "_main/finance/index.tsx",
      "parent": "/_main"
    },
    "/_main/groups/": {
      "filePath": "_main/groups/index.tsx",
      "parent": "/_main"
    },
    "/_main/attendance/_main/employees": {
      "filePath": "_main/attendance/_main/employees.tsx",
      "parent": "/_main/attendance/_main"
    },
    "/_main/attendance/_main/students": {
      "filePath": "_main/attendance/_main/students.tsx",
      "parent": "/_main/attendance/_main"
    },
    "/_main/groups/$id": {
      "filePath": "_main/groups/$id",
      "parent": "/_main",
      "children": [
        "/_main/groups/$id/_main"
      ]
    },
    "/_main/groups/$id/_main": {
      "filePath": "_main/groups/$id/_main.tsx",
      "parent": "/_main/groups/$id",
      "children": [
        "/_main/groups/$id/_main/attendance",
        "/_main/groups/$id/_main/exams",
        "/_main/groups/$id/_main/notes",
        "/_main/groups/$id/_main/sale",
        "/_main/groups/$id/_main/score",
        "/_main/groups/$id/_main/students",
        "/_main/groups/$id/_main/"
      ]
    },
    "/_main/settings/_main/branches": {
      "filePath": "_main/settings/_main/branches.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/settings/_main/courses": {
      "filePath": "_main/settings/_main/courses.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/settings/_main/holidays": {
      "filePath": "_main/settings/_main/holidays.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/settings/_main/payment-type": {
      "filePath": "_main/settings/_main/payment-type.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/settings/_main/roles": {
      "filePath": "_main/settings/_main/roles.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/settings/_main/rooms": {
      "filePath": "_main/settings/_main/rooms.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/attendance/_main/": {
      "filePath": "_main/attendance/_main/index.tsx",
      "parent": "/_main/attendance/_main"
    },
    "/_main/settings/_main/": {
      "filePath": "_main/settings/_main/index.tsx",
      "parent": "/_main/settings/_main"
    },
    "/_main/groups/$id/_main/attendance": {
      "filePath": "_main/groups/$id/_main/attendance.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/exams": {
      "filePath": "_main/groups/$id/_main/exams.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/notes": {
      "filePath": "_main/groups/$id/_main/notes.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/sale": {
      "filePath": "_main/groups/$id/_main/sale.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/score": {
      "filePath": "_main/groups/$id/_main/score.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/students": {
      "filePath": "_main/groups/$id/_main/students.tsx",
      "parent": "/_main/groups/$id/_main"
    },
    "/_main/groups/$id/_main/": {
      "filePath": "_main/groups/$id/_main/index.tsx",
      "parent": "/_main/groups/$id/_main"
    }
  }
}
ROUTE_MANIFEST_END */
