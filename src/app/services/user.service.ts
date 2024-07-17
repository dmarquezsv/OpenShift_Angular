// Importaciones necesarias desde Angular y otros módulos
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP
import { Injectable } from '@angular/core'; // Importa Injectable para marcar la clase como inyectable
import { Observable } from 'rxjs'; // Importa Observable para trabajar con flujos de datos asíncronos
import { UserInterface } from '../interfaces/user.interfaces'; // Importa la interfaz de usuario

// Marca la clase como inyectable y especifica que debe estar disponible en el nivel raíz de la aplicación
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Define la URL base de la API para los usuarios
  API_URL: string = 'http://localhost:8080/api/v1/users';

  // Inyecta HttpClient en el constructor para poder usarlo en los métodos del servicio
  constructor(private httpClient: HttpClient) {}

  // Método para obtener la lista de usuarios
  // Retorna un Observable que emite un array de objetos UserInterface
  getUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(this.API_URL);
  }

  // Método para eliminar un usuario por su ID
  // Retorna un Observable que emite void cuando la eliminación es exitosa
  deleteUser(id: number): Observable<void> {
    // Utiliza la interpolación de cadenas para construir la URL de eliminación con el ID del usuario
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
