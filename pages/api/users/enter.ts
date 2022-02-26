import mail from "@sendgrid/mail";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

mail.setApiKey(process.env.EMAIL_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// 토큰정보 생성. SMS 또는 Email
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
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
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.PHONE_NUMBER!, // 실제로는 입력받은 phone넘버 입력, 뒤에 ! 이 표시는 반드시 있다는 의미
    //   body: `Your login token is ${payload}`,
    // });
  } else if (email) {
    // const email = await mail.send({
    //   from: "eniows@naver.com",
    //   to: "eniows@naver.com", // 실제로는 입력받은 email로 보내서 인증하도록 한다.
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
  }
  console.log("login token : ", payload);
  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
