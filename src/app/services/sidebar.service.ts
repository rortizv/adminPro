import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Graphics', url: 'grafica1' },
        { titulo: 'Promises', url: 'promises' },
        { titulo: 'RXJS', url: 'rxjs' }
      ]
    }
  ];

  constructor() { }
}
