import { Injectable } from '@angular/core';
import { ApiServices } from './api-services.service';

/**
 * @description Serviço responsável por gerenciar as requisições de imagens.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private readonly apiServices:ApiServices) { }

  /**
   * @description Retorna a imagem de perfil do usuário.
   * @param user_id Identificador único do usuário
  */
  public async getProfilePicture(): Promise<Blob> {
    return await this.apiServices.getProfilePicture();
  }

  /**
   * @description Atualiza a imagem de perfil do usuário.
  */
  public async updateProfilePicture(user_id: string, profile_picture: Blob): Promise<any> {
    return await this.apiServices.updateProfilePicture(user_id, profile_picture);
  }
}
