import { path } from ".";
import { restHandlerFactory } from "../fetcher/mock";
import type { Post, PostData, PostInput, PostsData } from "./type";

export const postFactory = (id: number) => ({
  id: `${id}`,
  title: `Lorem Ipsum ${id}`,
  author: "takepepe",
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper mi imperdiet neque porta iaculis. Nulla fermentum, mi in bibendum interdum, est sapien mattis est, tempus pharetra enim orci et magna. Praesent porta finibus porttitor. Curabitur pharetra nibh quis orci varius, ac finibus tortor vulputate. Integer sit amet magna ex. Vivamus sed lorem rutrum, gravida ipsum at, pulvinar dui. Nam non augue vehicula, sodales metus et, congue augue. Sed vel tellus cursus, aliquam justo eget, egestas lacus. Nulla nec turpis viverra sapien vestibulum placerat eget non risus. Etiam varius malesuada blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo est.

  Donec finibus aliquam porttitor. Vestibulum varius orci et dignissim commodo. Morbi in mollis mi. In et leo ut diam semper elementum. Quisque eu ex lorem. Proin ullamcorper sapien eu augue ultrices, dignissim laoreet tortor ornare. Donec ut risus pulvinar, accumsan ante ac, finibus mauris. Duis convallis lectus diam, eu efficitur augue commodo in. Morbi ac ligula orci. Mauris eleifend sed orci eget tempus. Fusce nisi arcu, eleifend a ipsum pretium, aliquet interdum sem. Nam id nunc sed odio bibendum luctus. Sed et vestibulum dolor, ut rutrum risus. Cras sit amet dolor at massa imperdiet luctus vel sed elit.
  
  In iaculis mauris felis, vel auctor nunc placerat sed. Phasellus volutpat ultrices nulla ultrices sollicitudin. Quisque ut turpis id dolor iaculis egestas. Ut suscipit erat viverra mauris facilisis, sit amet blandit libero venenatis. Duis faucibus sem elit, volutpat mollis tellus dictum sit amet. Sed gravida velit in magna hendrerit auctor. Duis id facilisis diam.
  
  Morbi tempus metus vel pulvinar consequat. Quisque convallis libero ante, non mattis dui pellentesque a. Donec pulvinar dapibus purus eu mollis. Duis convallis libero mauris. Nulla facilisi. Praesent sapien erat, pulvinar sed cursus quis, porta vel nibh. In eu elit viverra, auctor massa quis, condimentum tortor. Cras eu purus interdum, ornare lacus sit amet, consectetur quam.
  
  Vestibulum bibendum, massa in mattis dictum, arcu ipsum auctor nisi, nec ultricies dui leo non orci. Aenean interdum congue lectus, sed laoreet metus volutpat sit amet. Quisque vitae tempor arcu, at pulvinar erat. Ut velit elit, pretium vel mollis a, accumsan a ex. Proin quis nisi erat. Sed feugiat mauris eu erat rhoncus cursus. Nullam quis eleifend augue. Nunc sit amet ligula lorem. Suspendisse potenti. Suspendisse eget auctor enim. Curabitur facilisis ipsum nisl, in gravida ipsum tristique non. Curabitur dictum gravida suscipit.`,
  published: true,
  publishedAt: "2022-06-23T13:30:07.942Z",
});

export const postsFactory = (length: number): Post[] =>
  Array.from({ length }).map((_, id) => postFactory(id));

export const postsFixture = { posts: postsFactory(10) };

export const getPostsHandler = restHandlerFactory<{}, {}, PostsData>(
  "get",
  path(),
  (_, res, ctx) => res(ctx.json(postsFixture))
);

export const createPostHandler = restHandlerFactory<PostInput, {}, PostData>(
  "post",
  path(),
  (_, res, ctx) => res(ctx.status(201), ctx.json({ post: postFactory(0) }))
);
