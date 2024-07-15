// Importaciones necesarias desde Angular y otros módulos
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Importa el servicio de usuario
import { ReportService } from '../../services/report/report-user.service'; // Importa el servio de generar el PDF de los usuario
import { UserInterface } from '../../interfaces/user.interfaces'; // Importa la interfaz de usuario
import { TableModule } from 'primeng/table'; // Importa el módulo de tabla de PrimeNG
import { CommonModule } from '@angular/common'; // Importa el módulo común de Angular
import { ButtonModule } from 'primeng/button';
import { error } from 'console';

// Decorador del componente que define el selector, si es independiente, las importaciones, el template y los estilos
@Component({
  selector: 'app-user',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, TableModule, ButtonModule], // Importa los módulos necesarios
  templateUrl: './user.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: ['./user.component.scss'] // Ruta al archivo de los estilos SCSS
})
export class UserComponent implements OnInit {
  // Define una propiedad para almacenar la lista de usuarios que implementa la interfaz UserInterface
  userList: UserInterface[] = [];

  // Inyecta el servicio UserService en el constructor del componente
  constructor(private userService: UserService, private reportService : ReportService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getUsers(); // Llama al método para obtener los usuarios
  }

  // Método para obtener la lista de usuarios del servicio
  getUsers(): void {
    // Llama al método getUsers del servicio y se suscribe al observable
    this.userService.getUsers().subscribe({
      // Si la solicitud es exitosa, asigna el resultado a userList
      next: (result) => {
        this.userList = result; // Directamente asigna el resultado a userList
      },
      // Si ocurre un error, lo imprime en la consola
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteUser(id: number): void {
    // Llama al método deleteUser del servicio UserService, pasando el ID del usuario a eliminar
    this.userService.deleteUser(id).subscribe({
      // Si la solicitud es exitosa, se ejecuta el siguiente bloque
      next: () => {
        // Filtra el usuario eliminado de la lista actualizando userList
        this.userList = this.userList.filter(user => user.id !== id);
      },
      // Si ocurre un error durante la solicitud, se ejecuta este bloque
      error: (err) => {
        // Imprime el error en la consola
        console.log(err);
      }
    });
  }


  downloadUserReport(): void {
    // Realiza una solicitud al servicio reportService para obtener el informe de usuario
    this.reportService.getUserReport().subscribe({
      // Si la solicitud es exitosa, se ejecuta el siguiente bloque
      next: (result) => {
        // Cuando se recibe la respuesta del servicio, se crea una URL del objeto Blob
        const url = window.URL.createObjectURL(result);
        
        // Se crea un elemento <a> en el documento
        const a = document.createElement('a');
        a.href = url; // Se asigna la URL al atributo href del elemento <a>
        //a.download = 'userReport.pdf'; // Se establece el nombre del archivo de descarga
        a.target = '_blank'; // Abre el enlace en una nueva pestaña o ventana

        // Se agrega el elemento <a> al cuerpo del documento
        document.body.appendChild(a);
        
        // Se simula un clic en el elemento <a> para iniciar la descarga del archivo
        a.click();
        
        // Una vez completada la descarga, se elimina el elemento <a> del documento
        document.body.removeChild(a);
        
        // Se revoca la URL del objeto Blob para liberar recursos
        window.URL.revokeObjectURL(url);
      },
      // Si ocurre un error durante la solicitud, se ejecuta este bloque
      error: (err) => {
        // Imprime el error en la consola
        console.log(err);
      }
    });
  }
  



}
