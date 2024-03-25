import { Router } from "express";
import { UserRouter } from "./user.route.js";
import { CategoryRouter } from "./categories.route.js";
import { PostRouter } from "./post.route.js";
import { AuthRouter } from "./auth.route.js";

const router = Router();

const routes = [
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/categories",
    router: CategoryRouter,
  },
  {
    path: "/posts",
    router: PostRouter,
  },

  {
    path: "/auth",
    router: AuthRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export { router as RootRouter };
