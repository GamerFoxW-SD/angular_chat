// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomNamePipe } from '../pipes/room-name.pipe'; // útvonalat igazítsd a projektedhez



@NgModule({
    imports: [
        RoomNamePipe,
      

      ]
})
export class SharedModule { }
