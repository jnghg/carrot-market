import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

// session정보 확인
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }

  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      // 페이징처리
      take: 10, // 보여줄 페이지 수 1페이지 : page - 1
      skip: 0, // 건너뛸 페이지. 페이지 * 보여줄페이지 수
    });

    res.json({ ok: true, streams });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
