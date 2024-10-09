import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { LoginService } from '../services/login/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
  ] 

})
export class LoginPage implements OnInit {
  email:any = null;
  password:any = null;

  constructor(
    private alertController: AlertController, 
    private _router: Router,
    private _loginService: LoginService,
  ) { } 

  ngOnInit() { }

  showAlert(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  async login() {
    
    if(!this.email || !this.password){
      await this.showAlert('Error', 'Debe ingresar un correo electrónico y una contraseña');
      return;
    }
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      await this.showAlert('Error', 'Debes ingresar un Correo Electrónico válido');
      return;
    }
    
    let UserData = {
      email: this.email,
      password: this.password

    };

    this._loginService.login(UserData).subscribe(
      async (response: any) => {
        if (!response.error) {
          //console.log(response.token);
          this._loginService.saveToken(response.token); // Guardar el token
          
          await this.showAlert('Notificación', response.message);
          //ruta aqui
            // verificar el tipo rol del usuario y mandarlo a su home
            // this.router.navigate(['/admin']);
          return;
        }
      },
      async (error: any) => {
        await this.showAlert('Error', error.error.message || 'Ocurrió un error inesperado');
      }
    )

  }


  //esto debe ir en pagina de perfil
  logout(){
    this._loginService.logout();
  }
}