import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// 가짜 데이터를 만들기 편함..
async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        cloudflareId: "",
        cloudflareKey: "",
        cloudflareUrl: "",
        user: {
          connect: {
            id: 14,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
