This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database seeding

There has been created a seeding file in the ``_lib/prisma`` folder named ``seed.db`` and has been configured in the package.json file. However, in order to be compliant with the task specifications, a ``seed.sh`` file including the installation of the dependencies, creation of the database and migration has been included in the root path of this project. It can be executed as follows:

```bash
sh seed.sh
```

## API endpoints

- `/api/posts`
    - **GET** returns the information of all the posts from the database


- `/api/posts/[id]`
    - **GET** returns the information of the post with id [id]
    - **DELETE** removes the post with id [id] (not soft delete)

- `/api/user/[id]/posts`
    - **GET** returns all the posts of the user with id [id]
