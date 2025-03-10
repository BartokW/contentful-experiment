import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { ContentfulService } from '../contentful.service';
import { NodeRenderer, NodeRendererResolver } from 'ngx-contentful-rich-text';

@Component({
    template: `<img [src]="fields.file.url" [alt]="fields.title" />`,
    standalone: false
})
export class CustomEmbeddedEntryComponent
  extends NodeRenderer
  implements OnInit
{
  fields: any;

  ngOnInit() {
    const x = this.node.data as any;
    this.fields = x.target.fields;
  }
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})
export class ProductListComponent implements OnInit {
  blogEntries: Entry<any>[] = [];
  memberPages: Entry<any>[] = [];

  // Instructions for the renderer component, and setting up the custom renderers
  // https://github.com/kgajera/ngx-contentful-rich-text
  nodeRenderers: Record<string, NodeRendererResolver> = {
    [BLOCKS.EMBEDDED_ASSET]: (node) => CustomEmbeddedEntryComponent,
  };

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService
      .getBlogEntries()
      .then((products) => (this.blogEntries = products));
    this.contentfulService.getMemberPageEntries().then((pages) => {
      this.memberPages = pages;
    });
  }
}
