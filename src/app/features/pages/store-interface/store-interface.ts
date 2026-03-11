import { Component } from '@angular/core';
import { Header } from '../../../shared/layout/header/header';
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-store-interface',
  imports: [RouterOutlet, Header, RouterLink],
  templateUrl: './store-interface.html',
  styleUrl: './store-interface.scss',
})
export class StoreInterface {

}
