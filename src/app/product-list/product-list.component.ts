import { Component, OnInit, resource } from '@angular/core';
import { Entry } from 'contentful';
import {
  BlogEntrySkeleton,
  ContentfulService,
  MemberPageSkeleton,
} from '../contentful.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false,
})
export class ProductListComponent implements OnInit {
  blogEntries: Entry<BlogEntrySkeleton>[] = [];
  memberPages: Entry<MemberPageSkeleton>[] = [];

  singleEntry: Entry<BlogEntrySkeleton> | null = null;

  blogEntriesResource = resource({
    defaultValue: [] as Entry<BlogEntrySkeleton>[],
    loader: () => this.contentfulService.getBlogEntries(),
    //request: () => this.contentfulService.getBlogEntries(),
  });

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getOne('6HlOhoEukyA1FcXnlLzzD3').then((entry) => {
      this.singleEntry = entry;
    });

    // this.contentfulService
    //   .getBlogEntries()
    //   .then((products) => (this.blogEntries = products));
    this.contentfulService.getMemberPageEntries().then((pages) => {
      this.memberPages = pages;
    });
  }
}
