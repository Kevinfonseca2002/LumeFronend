import { Component } from '@angular/core';
import { Feed } from '../../../shared/children/users/feed/feed';
import { Profile } from '../../../shared/children/users/profile/profile';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Header } from '../../../shared/layout/header/header';

@Component({
  selector: 'app-person-interface',
  imports: [RouterOutlet, RouterLinkWithHref, Header],
  templateUrl: './person-interface.html',
  styleUrl: './person-interface.scss',
})
export class PersonInterface {

}
