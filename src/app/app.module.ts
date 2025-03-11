import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentfulService } from './contentful.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ContentfulRichText } from './components/contentful-rich-text.component';

@NgModule({
  declarations: [AppComponent, ProductListComponent, ContentfulRichText],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ContentfulService],
  bootstrap: [AppComponent],
})
export class AppModule {}
