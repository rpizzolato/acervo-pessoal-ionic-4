import { ModalController, NavController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  livros: any[] = [];  
  subscription: any;
  constructor(private navController: NavController,
              private platform: Platform) {

    let livrosJson = localStorage.getItem('livrosDb');
    if (livrosJson != null) {
      this.livros = JSON.parse(livrosJson);
    }
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
}

ionViewWillLeave(){
    this.subscription.unsubscribe();
}

  ionViewWillEnter() {
    this.carregaBaseDeLivros();    
  }

  atualizaListaLivros(event) {
    
    this.carregaBaseDeLivros();

    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  editarLivro(id) {
    this.navController.navigateForward('/cadastro-livros/'+id);
  }

  async exibirCadastro(isCad) {
    this.navController.navigateForward('/cadastro-livros/'+isCad);
  }

  carregaBaseDeLivros() {
    let livrosJson = localStorage.getItem('livrosDb');
    if (livrosJson != null) {
      this.livros = JSON.parse(livrosJson);
    }
  }
}