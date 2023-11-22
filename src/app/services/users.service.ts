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
   * @description Evento que emite os usuários selecionados.
   * @returns {User[]} Lista de usuários.
  */
  @Output() usersSelected = new EventEmitter<User[]>();

  /**
   * @description Lista de usuários.
  */
  users = [] as User[];

  /**
   * @description Lista de usuários selecionados.
  */
  selectedUsers = [] as User[];

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
  filterUsers(tags: string[]) {
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

  /**
   * @description Usuários selecionados na tabela.
  */
  selectUsers(users: User[]) {
    this.selectedUsers = users;
    this.usersSelected.emit(this.selectedUsers);
    return this.selectedUsers;
  }

  /**
   * @description Atualiza os dados do usuário.
   * @param {User} user Usuário a ser atualizado.
  */
  async updateUser(user: User) {
    return await this.api.updateUser(user);
  }

  /**
   * @description Deleta o usuário.
   * @param {User} user Usuário a ser deletado.
  */
  async deleteUser(companyId: string, userId: string) {
    return await this.api.deleteUser(companyId, userId);
  }

  /**
   * @description Cria um novo usuário.
   * @param {User} user Usuário a ser criado.
  */
  async createUser(user: User) {
    return await this.api.createUser(user);
  }

  /**
   * @description Redefine a senha do usuário.
   * @param {User} user Usuário a ter a senha redefinida.
  */
  async updatePassword(user: User, token: string): Promise<boolean> {
    try {
      return await this.api.updatePassword(user, token).then((response: any) => {
        if (response) {
          return true;
        }
        return false;
      });
    } catch (error) {
      return false;
    }
  }
}
