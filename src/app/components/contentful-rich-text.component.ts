import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';

@Component({
  selector: 'app-contentful-rich-text',
  //template: `<div></div>`,
  template: `<div [innerHTML]="toHtml(document)"></div>`,
  standalone: false,
})
export class ContentfulRichText {
  @Input() document: Partial<Document> | undefined;
  jsonPipe: JsonPipe = new JsonPipe();

  // Instructions for adjusting the renderNodes here
  // https://www.npmjs.com/package/@contentful/rich-text-html-renderer

  options: Partial<Options> = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data['target'].fields;
        const mimeType = file.contentType;
        const mimeGroup = mimeType.split('/')[0];
        return '<img src="' + file.url + '" alt="' + title + '" />';
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        return (
          'Block Embedded Entry <pre>' +
          //       this.jsonPipe.transform(node.data['target']) +
          '</pre>'
        );
      },
      [INLINES.ASSET_HYPERLINK]: (node) => {
        const { title, file } = node.data['target'].fields;
        return '<a href= "' + file.url + '" target="_blank">' + title + '</a>';
      },
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        return (
          'Entry Hyperlink <pre>' +
          //     this.jsonPipe.transform(node.data['target']) +
          '</pre>'
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        return (
          'Inline Embedded Entry <pre>' +
          //   this.jsonPipe.transform(node.data['target']) +
          '</pre>'
        );
      },
    },
  };

  toHtml(document: Partial<Document> | undefined): string {
    if (document === undefined) {
      return '';
    }

    return documentToHtmlString(document as Document, this.options);
  }
}
