import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cadastro-livros',
  templateUrl: './cadastro-livros.page.html',
  styleUrls: ['./cadastro-livros.page.scss'],
})
export class CadastroLivrosPage implements OnInit {
  livrosObj: any;
  livrosArray: any[] = [];
  nomeLivro: String = '';
  isbn: String = null;
  paginasTotal: String = null;
  paginasLidas: String = null;
  id: any;
  isCad: boolean = true;
  foto: any;

  constructor(private alertController: AlertController,
              private navController: NavController,
              private route: ActivatedRoute,
              private camera: Camera,
              private toastController: ToastController
              ) {

    let livrosJson = localStorage.getItem('livrosDb');
    if (livrosJson != null) {
      this.livrosArray = JSON.parse(livrosJson);

      this.isCad = this.route.snapshot.paramMap.get('id')=='true' ? true : false;
      this.id = this.route.snapshot.paramMap.get('id');      
      
      if(this.id != null && this.isCad == false) {
        this.carregaLivroParaAtualizar(this.id);
      }
    }
  }

  ngOnInit() {
  }

  cadastrarLivro() {
    if (this.nomeLivro.trim().length < 1 || this.nomeLivro == null) {
      this.toastPadrao('Nome Livro');
      return;
    } else if (this.isbn == null) {
      this.toastPadrao('ISBN');    
      return;  
    } else if (this.paginasTotal == null) {
      this.toastPadrao('Total de Páginas');  
      return;    
    } else if (this.paginasLidas == null) {
      this.toastPadrao('Páginas Lidas');
      return;
    } else if (this.paginasLidas > this.paginasTotal) {
      this.toastSimples('O número de páginas lidas não pode ser maior que o total');
      return;
    }
    
    this.livrosObj = {
      nomeLivro: this.nomeLivro,
      isbn: this.isbn,
      fotoCapa: this.foto ? this.foto : null,
      paginasTotal: this.paginasTotal,
      paginasLidas: this.paginasLidas
    };
    this.livrosArray.push(this.livrosObj);
    console.table(this.livrosArray);
    this.updateLocalStorage();
    this.alertas('Cadastro efetuado com sucesso!');
  }

  async toastPadrao(descCampo: String) {
    const toast = await this.toastController.create({
      message: 'O campo '+ descCampo+ ' não pode estar vazio',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async toastSimples(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  atualizarLivro() {
    if (this.nomeLivro.trim().length < 1 || this.nomeLivro == null) {
      this.toastPadrao('Nome Livro');
      return;
    } else if (this.isbn == null) {
      this.toastPadrao('ISBN');    
      return;  
    } else if (this.paginasTotal == null) {
      this.toastPadrao('Total de Páginas');  
      return;    
    } else if (this.paginasLidas == null) {
      this.toastPadrao('Páginas Lidas');
      return;
    }

    this.livrosArray[this.id] = {
      nomeLivro: this.nomeLivro,
      isbn: this.isbn,
      fotoCapa: this.foto ? this.foto : null,
      paginasTotal: this.paginasTotal,
      paginasLidas: this.paginasLidas
    }    
    console.log(this.livrosArray[this.id]);
    this.updateLocalStorage();
    this.alertas('Informações atualizadas com sucesso!');
  }

  async excluiLivro() {
    //console.log(isbn);
    const alerta = await this.alertController.create({
      header: 'Exclusão de Livro',
      subHeader: 'Deseja realmente excluir o livro?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secundary',  
        },
        {
          text: 'Confirmar',
          cssClass: 'secundary',
          handler: ()=>{
            this.livrosArray = this.livrosArray.filter(array => this.livrosArray[this.id] != array);
            this.navController.navigateBack('/home');
            this.updateLocalStorage();
          }
        }
      ]
    });
    alerta.present();
  }

  carregaLivroParaAtualizar(id) {
    
    this.livrosObj = this.livrosArray[id];
    this.nomeLivro = this.livrosObj.nomeLivro;
    this.isbn = this.livrosObj.isbn;
    this.foto = this.livrosObj.fotoCapa;
    this.paginasTotal = this.livrosObj.paginasTotal;
    this.paginasLidas = this.livrosObj.paginasLidas;
  }

  async alertas(mensagem) {
    const alerta = await this.alertController.create({
      header: 'Cadastro de Livros',
      message: mensagem,
      buttons: [
        {
          text: 'Ok',
          handler: ()=>{
            this.navController.navigateBack('/home');
          }
        }
      ]
    });
    alerta.present();
  }

  async alertasConfirmacao(header, subHeader) {
    const alerta = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secundary',
          handler: ()=>{
            this.navController.navigateBack('/home');
          }
  
        },
      
        {
          text: 'Confirmar',
          cssClass: 'secundary',
          handler: ()=>{
            this.limparCamposCadastro();
          }
        }
      ]
    });
    alerta.present();
  }

  adicionarFotoCapa() {
    this.foto = '';
    const options: CameraOptions = {
      quality: 60,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options)
    .then((ImageData)=>{
      let base64Image = 'data:image/jpeg;base64,' + ImageData;
      this.foto = base64Image;
    }, (err)=>{
      alert(err);
    });
  }

  limparCamposCadastro() {
    this.nomeLivro = '';
    this.isbn = '';
    this.foto = null;
    this.paginasTotal = '';
    this.paginasLidas = '';
  }

  cancelaCadastro() {
    this.navController.navigateBack('/home');
  }

  updateLocalStorage() {
    localStorage.setItem('livrosDb', JSON.stringify(this.livrosArray));
  }
}