import { Component } from '@angular/core';
import { Feed } from '../../../shared/children/users/feed/feed';
import { Profile } from '../../../shared/children/users/profile/profile';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-person-interface',
  imports: [Feed, RouterOutlet, RouterLinkWithHref, Profile],
  templateUrl: './person-interface.html',
  styleUrl: './person-interface.scss',
})
export class PersonInterface {

}
