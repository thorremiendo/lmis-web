import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-project2-team',
  templateUrl: './project2-team.component.html',
  styleUrls: ['./project2-team.component.scss']
})
export class Project2TeamComponent implements OnInit {
  team: TeamMember[] = [
    {
      name: 'Engr. Nathaniel Vincent A. Lubrica',
      role: 'Project 1 Leader',
      affiliation: 'University of the Philippines - Baguio',
      image: '/assets/images/others/team/project2/nvl.webp',
      alt: 'Engr. Nathaniel Vincent A. Lubrica portrait'
    },
    {
      name: 'Engr. Rolette R. Almuete',
      role: 'Project Technical Specialist I',
      affiliation: 'University of the Cordilleras',
      image: '/assets/images/others/team/project2/Almuete.jpg',
      alt: 'Engr. Rolette R. Almuete portrait'
    },
    {
      name: 'Christian Robert M. Sandoval',
      role: 'Project Technical Assistant IV',
      affiliation: 'University of the Cordilleras',
      image: '/assets/images/others/profile.png/',
      alt: 'Christian Robert M. Sandoval portrait'
    },
    {
      name: 'Megan R. Nabua',
      role: 'Project Staff I',
      affiliation: 'University of the Cordilleras',
      image: '/assets/images/others/team/project2/Megan.jpg',
      alt: 'Megan R. Nabua portrait'
    },
    {
      name: 'Engr. John Russel E. Torchangon',
      role: 'Project Technical Assistant II',
      affiliation: 'University of the Cordilleras',
      image: '/assets/images/others/team/project2/JR.jpg',
      alt: 'Engr. John Russel E. Torchangon portrait'
    },
    {
      name: 'Brandon E. Esican',
      role: 'Project Technical Assistant II',
      affiliation: 'University of the Cordilleras',
      image: '/assets/images/others/team/project2/Esican.jpg',
      alt: 'Brandon E. Esican portrait'
    }
  ];

  constructor() { }

  ngOnInit(): void {}
}
