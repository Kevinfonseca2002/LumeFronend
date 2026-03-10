import { Component } from '@angular/core';
import { Header } from '../../../shared/layout/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-interface',
  imports: [RouterOutlet, Header],
  templateUrl: './store-interface.html',
  styleUrl: './store-interface.scss',
})
export class StoreInterface {

}
