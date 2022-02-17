import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (!user) {
    return res.status(400).json({ ok: false });
  }

  const token = await client.token.create({
    data: {
      payload,
      user: {
        // user가 있는 경우에는 token에 연결, user가 없으면 create 후 token 연결
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE_NUMBER!, // 실제로는 입력받은 phone넘버 입력, 뒤에 ! 이 표시는 반드시 있다는 의미
      body: `Your login token is ${payload}`,
    });

    console.log(message);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
