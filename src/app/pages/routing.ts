import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('../modules/roles/roles.module').then((m) => m.RolesModule),
    // data: { layout: 'light-sidebar' }, // Agrega el tema light al módulo
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../modules/users/users.module').then((m) => m.UsersModule),
    // data: { layout: 'light-sidebar' }, // Agrega el tema light al módulo
  },
  {
    path: 'crypto-asset',
    loadChildren: () =>
      import('../modules/crypto-asset/crypto-asset.module').then((m) => m.CryptoAssetModule),
    // data: { layout: 'light-sidebar' }, // Agrega el tema light al módulo
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
