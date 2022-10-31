import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from '../contentful.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  blogEntries: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService
      .getBlogEntries()
      .then((products) => (this.blogEntries = products));
  }
}
