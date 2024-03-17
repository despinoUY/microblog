import { PrismaClient } from '@prisma/client'

interface User {
    id:         number
    username:   string
    name:       string
}

interface Post {
    id:         number
    userId:     number
    title:      string
    body:       string
}

const prisma = new PrismaClient();

async function main() {
    const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users')
    const users: User[] = await responseUsers.json() as User[]
    const responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await responsePosts.json() as Post[]

    for (const user of users) {
        const prismaUser = await prisma.user.create({
          data: {
            id:         user.id,
            username:   user.username,
            name:       user.name,
          },
        })

        const userPosts = posts.filter(post => post.userId === prismaUser.id)

        for (const post of userPosts) {
          await prisma.post.create({
            data: {
              title:  post.title,
              body:   post.body,
              user: {
                connect: {
                  id: prismaUser.id,
                },
              },
            },
          })
        }
    }

    console.log("Information loaded correctly.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })