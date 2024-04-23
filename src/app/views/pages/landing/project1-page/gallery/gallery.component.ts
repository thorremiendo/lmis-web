import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images = [
    {
      src: '/assets/images/others/project1-gallery/moa-ltb.jpg',
      alt: 'moaltb',
      category: 'p'
    },
    {
      src: '/assets/images/others/project1-gallery/moa-tublay.jpg',
      alt: 'moa-tublay',
      category: 'p'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-loakan.jpg',
      alt: 'fldw-loakan',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-sto.tomas.jpg',
      alt: 'fldw-sto.tomas',
      category: 'f'
    },

    
    {
      src: '/assets/images/others/project1-gallery/fldw-cmp7.jpg',
      alt: 'fldw-cmp7',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-pico.jpg',
      alt: 'fldw-pico',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-lubas.jpg',
      alt: 'fldw-lubas',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao1.jpg',
      alt: 'fldw-ampucao1',
      category: 'f'
    },


    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao2b.jpg',
      alt: 'fldw-ampucao2b',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao3b.jpg',
      alt: 'fldw-ampucao3b',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-sablan.jpg',
      alt: 'fldw-sablan',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-tuba.jpg',
      alt: 'fldw-tuba.jpg',
      category: 'f'
    },


    {
      src: '/assets/images/others/project1-gallery/fldw-tublay.jpg',
      alt: 'fldw-tublay',
      category: 'f'
    },
    {
      src: '/assets/images/others/project1-gallery/train-1.jpg',
      alt: 'train-1',
      category: 't'
    },
    {
      src: '/assets/images/others/project1-gallery/train-2.jpg',
      alt: 'train-2',
      category: 't'
    },
    {
      src: '/assets/images/others/project1-gallery/train-2b.jpg',
      alt: 'train-2b',
      category: 't'
    },


    {
      src: '/assets/images/others/project1-gallery/ps-sablan.jpg',
      alt: 'ps-sablan',
      category: 'p'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-itogon.jpg',
      alt: 'ps-itogon',
      category: 'p'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-tuba.jpg',
      alt: 'ps-tuba',
      category: 'p'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-baguio.jpg',
      alt: 'ps-baguio',
      category: 'p'
    },




  ];

  filteredImages: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredImages = this.images;
    console.log('Filtered Images:', this.filteredImages);
  }

  filterImages(category: string) {
    console.log('Filter Category:', category);
    if (category === 'all') {
      this.filteredImages = this.images; 
    } else {
      this.filteredImages = this.images.filter(image => image.category === category);
    }
    console.log('Filtered Images:', this.filteredImages);
  }
}
