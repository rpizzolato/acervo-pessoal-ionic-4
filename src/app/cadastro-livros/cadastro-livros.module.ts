import { Camera } from '@ionic-native/camera/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroLivrosPage } from './cadastro-livros.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroLivrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Camera
  ],
  declarations: [CadastroLivrosPage]
})
export class CadastroLivrosPageModule {}
