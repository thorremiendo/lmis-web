import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-project1-team',
  templateUrl: './project1-team.component.html',
  styleUrls: ['./project1-team.component.scss']
})
export class Project1TeamComponent implements OnInit {
  team: TeamMember[] = [
    {
      name: 'Dr. Dymphna Javier',
      role: 'Project 1 Leader',
      affiliation: 'University of the Philippines - Baguio',
      image: '/assets/images/others/team/team1.jpg',
      alt: 'Dr. Dymphna Javier portrait'
    },
    {
      name: 'R.D. Fay Apil',
      role: 'Regional Director / Project Staff Level III',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/fa.webp',
      alt: 'R.D. Fay Apil portrait'
    },
    {
      name: 'Benigno Cesar L. Espejo',
      role: 'Chief Geologist / Project Staff Level II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/benigno.jpg',
      alt: 'Benigno Cesar L. Espejo portrait'
    },
    {
      name: 'Kelvin Carlo S. Gaerlan',
      role: 'Supervising Geologist / Project Staff Level II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/kelvin.jpg',
      alt: 'Kelvin Carlo S. Gaerlan portrait'
    },
    {
      name: 'Jethro C. Panganiban',
      role: 'Geologist II / Project Staff Level II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/jethro.jpg',
      alt: 'Jethro C. Panganiban portrait'
    },
    {
      name: 'Grail A. Baldas',
      role: 'Science Research Specialist II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/grail.jpg',
      alt: 'Grail A. Baldas portrait'
    },
    {
      name: 'Frenz Aivereen A. Flores',
      role: 'Science Research Specialist I',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/frenz.jpg',
      alt: 'Frenz Aivereen A. Flores portrait'
    },
    {
      name: 'Vince Paolo F. Obille',
      role: 'Project Technical Assistant II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/vince.jpg',
      alt: 'Vince Paolo F. Obille portrait'
    },
    {
      name: 'Claire G. Ramirez',
      role: 'Project Technical Assistant II',
      affiliation: 'MGB-CAR',
      image: '/assets/images/others/team/project1/claire.jpg',
      alt: 'Claire G. Ramirez portrait'
    }
  ];

  constructor() { }

  ngOnInit(): void {}
}
