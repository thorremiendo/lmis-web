import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = 'A';
  searchQuery: string = '';
  allWords: any[] = [];
  filteredWords: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadWords()
  }

  loadWords() {
    this.getGlossaryData().subscribe(data => {
      this.allWords = data[this.selectedLetter] || [];
      this.filterWords();
    })
  }

  selectLetter(letter: string): void {
    this.selectedLetter = letter;
    this.loadWords();
  }

  filterWords(): void {
    console.log(this.allWords)
    if (!this.searchQuery) {
      this.filteredWords = this.allWords;
    } else {
      this.filteredWords = this.allWords.filter(word =>
        word.term.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  getGlossaryData(): Observable<any> {
    return this.http.get('../../../../../assets/data/glossary.json');
  }

}
