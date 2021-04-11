import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
