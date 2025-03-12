// ./src/app/contentful.service.ts
import { Injectable } from '@angular/core';
// import Contentful createClient and type for `Entry`
import {
  createClient,
  EntriesQueries,
  Entry,
  EntryFieldTypes,
} from 'contentful';

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

export interface BlogEntrySkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: EntryFieldTypes.Text;
    publishDate: EntryFieldTypes.Date;
    overview: EntryFieldTypes.Text;
    entryContext: EntryFieldTypes.RichText;
  };
}

export interface MemberPageSkeleton {
  contentTypeId: 'memberArea';
  fields: {
    pageTitle: EntryFieldTypes.Text;
    pageContent: EntryFieldTypes.RichText;
  };
}

@Injectable()
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
    environment: 'master',
  });

  constructor() {}

  getBlogEntries(query?: object): Promise<Entry<BlogEntrySkeleton>[]> {
    let x = this.cdaClient
      .getEntries<BlogEntrySkeleton>(query)
      .then((res) => res.items);

    return x;
  }

  getOne(id: string) {
    return this.cdaClient.getEntry<BlogEntrySkeleton>(id);
  }

  getMemberPageEntries(query?: object): Promise<Entry<MemberPageSkeleton>[]> {
    return this.cdaClient
      .getEntries<MemberPageSkeleton>(query)
      .then((res) => res.items);
  }

  getMemberPageMenus(query?: object): Promise<Entry<MemberPageSkeleton>[]> {
    return this.cdaClient
      .getEntries<MemberPageSkeleton>(
        Object.assign(
          {
            'metadata.tags.sys.id[all]': ['menu'],
          },
          query
        )
      )
      .then((res) => res.items);
  }
}
