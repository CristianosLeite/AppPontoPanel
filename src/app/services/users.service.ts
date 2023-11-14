import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ApiServices } from './api-services.service';

/**
 * @description Serviço responsável por gerenciar os usuários.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly api: ApiServices) { }
  /**
   * @description Evento que emite os usuários carregados.
   * @returns {User[]} Lista de usuários.
  */
  @Output() usersLoaded = new EventEmitter<User[]>();

  /**
   * @description Lista de usuários.
  */
  users = [] as User[];

  /**
   * @description Busca todos os usuários e emite um evento com os usuários carregados.
   * @returns {User[]} Lista de usuários.
  */
  async getUsers() {
    await this.api.getAllUsers().then((users: User[]) => {
      this.users = users;
      this.usersLoaded.emit(this.users);
    });
    return this.users;
  }

  /**
   * @description Filtra os usuários de acordo com os parâmetros passados.
   * @param {string[]} tags Lista de tags para filtrar os usuários.
  */
  filterUser(tags: string[]) {
    if (tags.length === 0) {
      this.usersLoaded.emit(this.users);
      return this.users;
    }
    // Converte todas as tags para letras minúsculas.
    const userNameList = tags.map(tag => tag.toLowerCase());
    // Filtra os usuários de acordo com as tags passadas.
    const filteredValues = this.users.filter((user: User) => {
      // Verifica se o nome, sobrenome ou nome completo do usuário está na lista de tags.
      return userNameList.some(name =>
        name === user.first_name.toLowerCase() ||
        name === user.last_name.toLowerCase() ||
        name === user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase()
      );
    });
    // Emite um evento com os usuários filtrados.
    this.usersLoaded.emit(filteredValues);
    return filteredValues;
  }
}
