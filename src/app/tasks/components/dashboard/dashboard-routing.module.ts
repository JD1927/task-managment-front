import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./../tasks/tasks.module').then(m => m.TasksModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/dashboard/tasks',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/dashboard/tasks',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
