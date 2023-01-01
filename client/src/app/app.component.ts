import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { REQUESTS_URLS } from './env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';

  loading: boolean = false;
  showExpandedDetails: boolean = false;
  dataSource: MatTableDataSource<any>;
  data: Array<any>;
  pageSize: number = 10;
  totalSize: number = 0;
  currentPage: number = 0;
  pageSizeOptions = [5, 10, 25, 100];

  displayedColumns: string[] = [
    'item'
  ];


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private http: HttpService) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.data = [];
  }


  ngOnInit() {

  }

  // handle  pagination
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnDestroy() {

  }

  // handle paging calculation
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.data.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
  }

  // handle paging
  handlePage(event$: any) {
    this.currentPage = event$.pageIndex;
    this.pageSize = event$.pageSize;
    this.iterator();
  }

  // handle filter
  async applyFilter(event: Event) {
    this.showExpandedDetails = false;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    try {
      this.loading = true;
      const results: any = await this.http.get(REQUESTS_URLS.FILMS + this.dataSource.filter);
      this.loading = false;
      this.dataSource = new MatTableDataSource(results);
      this.data = results;
      this.totalSize = results.length;
      this.handlePage({
        pageIndex: 0,
        pageSize: this.pageSize
      });
    } catch (titlesError) {
      console.log('titlesError ', titlesError);
    }
  }

  async selectFilm(index: number) {
    try {
      if (this.showExpandedDetails) {
      return;
      }

      this.showExpandedDetails = true;
      this.loading = true;
      const filmDetails: any = await this.http.get(REQUESTS_URLS.DETAILS + `/${index + 1}?expand=characters`);
      const characters = filmDetails.film.characters;
      this.loading = false;
      this.dataSource = new MatTableDataSource(characters);
      this.data = characters;
      this.totalSize = characters.length;
      this.handlePage({
        pageIndex: 0,
        pageSize: this.pageSize
      });
    } catch (expandError) {
      console.log('expandError ', expandError);
    }
  }
}