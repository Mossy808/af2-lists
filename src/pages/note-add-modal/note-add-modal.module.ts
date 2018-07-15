import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteAddModalPage } from './note-add-modal';

@NgModule({
  declarations: [
    NoteAddModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteAddModalPage),
  ],
})
export class NoteAddModalPageModule {}
