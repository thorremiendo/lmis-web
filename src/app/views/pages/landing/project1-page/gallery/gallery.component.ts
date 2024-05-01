import { Component, OnInit, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  filteredImages: any[] = [];
  filter: string = 'all';
  images = [
    {
      src: '/assets/images/others/project1-gallery/moa-ltb.jpg',
      alt: 'MOA signing with La Trinidad LGU',
      category: 'Partnership'
    },
    {
      src: '/assets/images/others/project1-gallery/moa-tublay.jpg',
      alt: 'MOA SIGNING OF MULAT-BLISTT PROGRAM AND LGU-TUBLAY ON MARCH 22, 2023. (PHOTO TAKEN BY MS. JANICE BAGNI, UP BAGUIO)',
      category: 'Partnership'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-loakan.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-sto.tomas.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },


    {
      src: '/assets/images/others/project1-gallery/fldw-cmp7.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-pico.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-lubas.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao1.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },


    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao2b.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-ampucao3b.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-sablan.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/fldw-tuba.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },


    {
      src: '/assets/images/others/project1-gallery/fldw-tublay.jpg',
      alt: 'CONDUCTED WITHIN BLISTT AREA BY UP-BAGUIO AND MGB-CAR',
      category: 'Fieldwork'
    },
    {
      src: '/assets/images/others/project1-gallery/train-1.jpg',
      alt: 'INTRODUCTION TO ARTIFICIAL INTELLIGENCE AND BASIC GIS AND REMOTE SENSING',
      category: 'Training'
    },
    {
      src: '/assets/images/others/project1-gallery/train-2.jpg',
      alt: 'INTRODUCTION TO ARTIFICIAL INTELLIGENCE AND BASIC GIS AND REMOTE SENSING',
      category: 'Training'
    },
    {
      src: '/assets/images/others/project1-gallery/train-2b.jpg',
      alt: 'INTRODUCTION TO ARTIFICIAL INTELLIGENCE AND BASIC GIS AND REMOTE SENSING',
      category: 'Training'
    },


    {
      src: '/assets/images/others/project1-gallery/ps-sablan.jpg',
      alt: 'MOA SIGNING WITH LGU-SABLAN ON DECEMBER 22, 2022.',
      category: 'Partnership'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-itogon.jpg',
      alt: 'MOA SIGNING WITH LGU-ITOGON ON JANUARY 5, 2023.',
      category: 'Partnership'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-tuba.jpg',
      alt: 'MOA SIGNING WITH LGU-TUBA, BENGUET ON MARCH 9, 2023.',
      category: 'Partnership'
    },
    {
      src: '/assets/images/others/project1-gallery/ps-baguio.jpg',
      alt: 'MOA SIGNING WITH LGU-BAGUIO CITY, BENGUET ON FEBRUARY 10, 2023.',
      category: 'Partnership'
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
    console.log(this.lightbox)
  }

  closeLightbox(): void {
    this.lightbox.close();
  }

  filterImages(category: string) {
    this.filter = category;
    if (category === 'all') {
      this.filteredImages = this.images;
    } else {
      this.filteredImages = this.images.filter(image => image.category === category);
    }
  }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.key === 'ArrowLeft') {
  //     this.lightbox.prev();
  //   } else if (event.key === 'ArrowRight') {
  //     this.lightbox.next();
  //   } else if (event.key === 'Escape') {
  //     this.closeLightbox();
  //   }
  // }
}