import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.scss'
})
export class ExamenComponent {

  sentences = [
    'El ____ es el órgano más grande del cuerpo humano.',
    'El ____ es el principal órgano de la respiración.',
    'La ____ es la base del sistema digestivo.'
  ];

  answers = ['hígado', 'pulmón', 'boca'];
  drop(event: CdkDragDrop<string[]>, sentenceIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.sentences[sentenceIndex] = this.sentences[sentenceIndex].replace('____', event.container.data[0]);
    }
  }

}
