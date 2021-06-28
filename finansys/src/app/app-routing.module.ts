import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'reports'
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('src/app/pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      )
  },
  {
    path:'entries',
    loadChildren: () => import('src/app/pages/entries/entries.module').then(
      (m) => m.EntriesModule
    )
  },
  {
    path: 'reports',
    loadChildren: () => import('src/app/pages/reports/reports.module').then(
      (m) => m.ReportsModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
