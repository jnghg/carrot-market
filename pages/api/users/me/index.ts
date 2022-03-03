import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

// session정보 확인
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });

    res.json({
      ok: true,
      profile,
    });
  }

  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;

    const currntUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (email && email !== currntUser?.email) {
      const alreadyExists = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Email already taken.",
        });
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
      }
    }

    if (phone && phone !== currntUser?.phone) {
      const alreadyExists = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      });

      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Phone already taken.",
        });
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
          },
        });
      }
    }

    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }

    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }

    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
