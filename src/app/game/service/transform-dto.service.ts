import { Injectable } from '@angular/core';
import { PlayerDTO } from '../models/player-dto.type';
import { User } from '../../shared/models/user.class';
import { UserDTO } from '../models/user-dto.type';

@Injectable({
  providedIn: 'root'
})
export class TransformDtoService {

  transformUserIntoPlayerDTO(user: UserDTO, colorPlayed: number): PlayerDTO {
    return {
      id: user.id,
      name: user.name,
      color: colorPlayed
    }
  }
}
