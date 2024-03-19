export type Database = {
  users: { [key: string]: User };
  posts: Post[];
  categories: { [key: string]: Category };
  comments: { [key: string]: Comment[] };
};
export type User = {
  name: string;
  password: string;
  profile_pic: string;
};
export type Post = {
  title: string;
  author: string;
  id: string;
  body: string;
  category: string;
};
export type Category = { name: string; description: string };
export type Comment = {
  id: string;
  body: string;
  author: string;
};

//Example db
// const db: Database = {
//   users: {
//     luna: {
//       name: "Luna Berg",
//       password: "123",
//       profile_pic: "image.jpg",
//     },
//   },
//   posts: [
//     {
//       id: "2sksks",
//       author: "luna",
//       title: "How to fish in a toilet",
//       body: "You shouldn't, thats nasty!",
//       category: "Anime",
//     },
//   ],
//   categories: {
//     anime: {
//       name: "Anime",
//       description:
//         "Explore the world of Japanese animation, discussing everything from classic series to the latest releases.",
//     },
//     meme: {
//       name: "Memes",
//       description:
//         "Dive into the realm of internet culture, sharing and discussing the most viral and hilarious memes.",
//     },
//     datorit: {
//       name: "Dator/IT",
//       description:
//         "Engage in discussions about the latest in technology, troubleshooting, and advancements in computers and information technology.",
//     },
//   },
//   comments: {
//     "2sksks": [
//       {
//         id: "2sksks:1",
//         author: "luna",
//         body: "Nice post babe",
//       },
//     ],
//   },
// };
