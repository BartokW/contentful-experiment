// ./src/app/contentful.service.ts
import { Injectable } from '@angular/core';
// import Contentful createClient and type for `Entry`
import { createClient, Entry } from 'contentful';

// configure the service with tokens and content type ids
// SET YOU OWN CONFIG here
const CONFIG = {
  space: 'hj4b9t39v9vm',
  accessToken: 'GJ-aJFpiysmIrJ_usWlWSMh4aMUlGP1tLiRbXG2rMgk',

  contentTypeIds: {
    blogEntry: 'blogPost',
    memberPage: 'memberArea',
    page: 'page',
  },
};

@Injectable()
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
    environment: 'master',
  });

  constructor() {}

  getBlogEntries(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.blogEntry,
          },
          query
        )
      )
      .then((res) => res.items);
  }

  getOne() {
    //this.cdaClient.getEntry('5AIc9NRxmMRaznDPbpsSgi')
  }

  getMemberPageEntries(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.memberPage,
          },
          query
        )
      )
      .then((res) => res.items);
  }

  getMemberPageMenus(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.memberPage,
            'metadata.tags.sys.id[all]': 'menu',
          },
          query
        )
      )
      .then((res) => res.items);
  }
}
