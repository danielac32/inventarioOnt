import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // Definimos un Subject que enviará los mensajes
  private messageSubject = new Subject<any>();

  // Observable para que los componentes se suscriban y reciban mensajes
  message$ = this.messageSubject.asObservable();

  constructor() { }

  // Método para enviar un mensaje
  sendMessage(message: any) {
    this.messageSubject.next(message);
  }
}
