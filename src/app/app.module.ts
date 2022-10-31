import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentfulService } from './contentful.service';
import {
  CustomEmbeddedEntryComponent,
  ProductListComponent,
} from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CustomEmbeddedEntryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgxContentfulRichTextModule],
  providers: [ContentfulService],
  bootstrap: [AppComponent],
})
export class AppModule {}
