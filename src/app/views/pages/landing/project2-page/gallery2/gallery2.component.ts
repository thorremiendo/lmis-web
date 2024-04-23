import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery2',
  templateUrl: './gallery2.component.html',
  styleUrls: ['./gallery2.component.scss']
})
export class Gallery2Component implements OnInit {
  images = [
    {
      src: '/assets/images/others/project2-gallery/train-gis-dost.jpg',
      alt: 'train-gis-dost',
      category: 't'
    },
    {
      src: '/assets/images/others/project2-gallery/train-asti-dost.jpg',
      alt: 'train-asti-dost',
      category: 't'
    },
    {
      src: '/assets/images/others/project2-gallery/fldwrk-kibungan.jpg',
      alt: 'fldwrk-kibungan',
      category: 'f'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-cdrrmo-bag.jpg',
      alt: 'mtng-cdrrmo-bag',
      category: 'm'
    },

  
    {
      src: '/assets/images/others/project2-gallery/moa-ltb.jpg',
      alt: 'moa-ltb',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/fldwrk-oi-bag.jpg',
      alt: 'fldwrk-oi-bag',
      category: 'f'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-sb-tublay.jpg',
      alt: 'mtng-sb-tublay',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/train-drone.jpg',
      alt: 'train-drone',
      category: 't'
    },
  

    {
      src: '/assets/images/others/project2-gallery/sites-itogon.jpg',
      alt: 'sites-itogon',
      category: 's'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-sablan.jpg',
      alt: 'sites-sablan',
      category: 's'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-tuba.jpg',
      alt: 'sites-tuba',
      category: 's'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-tublay.jpg',
      alt: 'sites-tublay',
      category: 's'
    },

  

    {
      src: '/assets/images/others/project2-gallery/fldwrk-itogon-sws.jpg',
      alt: 'fldwrk-itogon-sws',
      category: 'f'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-sablan-mayor.jpg',
      alt: 'sites-sablan-mayor',
      category: 's'
    },
    {
      src: '/assets/images/others/project2-gallery/sites-baguio.jpg',
      alt: 'sites-baguio',
      category: 's'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-fldwrk-ltb.jpg',
      alt: 'mtng-fldwrk-ltb',
      category: ['m', 'f']
    },


    {
      src: '/assets/images/others/project2-gallery/mtng-sablan.jpg',
      alt: 'mtng-sablan',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-fldwrk-rst.jpg',
      alt: 'mtng-fldwrk-rst',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-itogon.jpg',
      alt: 'mtng-itogon',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/mtng-tublay.jpg',
      alt: 'mtng-tublay',
      category: 'm'
    },
    {
      src: '/assets/images/others/project2-gallery/train-ipi.jpg',
      alt: 'train-ipi',
      category: 't'
    },

  



  ];

  filteredImages: any[] = [];
  filter: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.filteredImages = this.images;
    console.log('Filtered Images:', this.filteredImages);
  }

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
