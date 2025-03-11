import { Component, Input } from '@angular/core';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-contentful-rich-text',
  template: `<div [innerHTML]="toHtml(document)"></div>`,
  standalone: false,
})
export class ContentfulRichText {
  @Input() document: Document | null = null;

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
    },
  };

  toHtml(document: Document | null): string {
    if (document === null) {
      return '';
    }
    return documentToHtmlString(document, this.options);
  }
}
