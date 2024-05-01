import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery2',
  templateUrl: './gallery2.component.html',
  styleUrls: ['./gallery2.component.scss']
})
export class Gallery2Component implements OnInit {
  images = [
    {
      src: '/assets/images/others/project2-gallery/train-gis-dost.jpg',
      alt: 'GIS TRAINING',
      category: 'Training'
    },
    {
      src: '/assets/images/others/project2-gallery/train-asti-dost.jpg',
      alt: 'DOST-ASTI TRAINING',
      category: 'Training'
    },
    {
      src: '/assets/images/others/project2-gallery/fldwrk-kibungan.jpg',
      alt: 'LITTLE KIBUNGAN SURVEY',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-cdrrmo-bag.jpg',
      alt: 'MEETING WITH BAGUIO CITY-CDRRMO',
      category: 'Meeting'
    },

  
    {
      src: '/assets/images/others/project2-gallery/moa-ltb.jpg',
      alt: 'MOA SIGNING WITH LTB LGU',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/fldwrk-oi-bag.jpg',
      alt: 'OCCULAR INSPECTION IN BAGUIO CITY',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-sb-tublay.jpg',
      alt: 'TUBLAY SB MEETING',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/train-drone.jpg',
      alt: 'DRONE OPERATION TRAINING',
      category: 'Training'
    },
  

    {
      src: '/assets/images/others/project2-gallery/sites-itogon.jpg',
      alt: 'ITOGON SITE',
      category: 'Site'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-sablan.jpg',
      alt: 'SABLAN SITE',
      category: 'Site'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-tuba.jpg',
      alt: 'TUBA SITE',
      category: 'Site'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-tublay.jpg',
      alt: 'TUBLAY SITE',
      category: 'Site'
    },

  

    {
      src: '/assets/images/others/project2-gallery/fldwrk-itogon-sws.jpg',
      alt: 'ITOGON SWS',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-sablan-mayor.jpg',
      alt: 'SABLAN SITE WITH MAYOR',
      category: 'Site'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-baguio.jpg',
      alt: 'BAGUIO SITE',
      category: 'Site'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-fldwrk-ltb.jpg',
      alt: 'MEETING AND FIELDWORK IN LA TRINIDAD, BENGUET',
      category: ['Meeting', 'f']
    },


    {
      src: '/assets/images/others/project2-gallery/mtng-sablan.jpg',
      alt: 'MEETING WITH SABLAN',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-fldwrk-rst.jpg',
      alt: 'COORDINATION MEETING AND RST',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-itogon.jpg',
      alt: 'COORDINATION MEETING WITH ITOGON LGU',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-tublay.jpg',
      alt: 'COORDINATION MEETING WITH TUBLAY LGUS',
      category: 'Meeting'
    },
    {
      src: '/assets/images/others/project2-gallery/train-ipi.jpg',
      alt: 'TRAINING AND TESTING OF IPI',
      category: 'Training'
    },

  
  ];

  
  constructor(private lightbox: Lightbox) { }

  ngOnInit(): void {
    this.filteredImages = this.images;
  }

  openLightbox(index: number): void {
    this.lightbox.open(this.filteredImages.map(image => ({
      src: image.src,
      caption: image.alt,
      thumb: image.src,
      fadeDuration: 0.7,
      showImagNumberLaber: true
    })), index);
    console.log(this.lightbox )
  }

  closeLightbox(): void {
    this.lightbox.close();
  }
  filteredImages: any[] = [];
  filter: string = 'all';


  filterImages(category: string) {
    this.filter = category
    if (category === 'all') {
      this.filteredImages = this.images; 
    } else {
      this.filteredImages = this.images.filter(image => image.category.includes(category)); 
    }
    console.log('Filtered Images:', this.filteredImages);
  }
}
