import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

// 토큰입력 확인
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;

  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: {
    //   user: true,
    // },
  });

  if (!foundToken) {
    res.status(404).end();
  } else {
    req.session.user = {
      id: foundToken?.userId,
    };
  }

  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken?.userId,
    },
  });
  console.log("token : ", foundToken);
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
