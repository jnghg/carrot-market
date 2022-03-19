import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // api 요청시에도 호출함
  // console.log(req.ua); // ua 브라우저 기본정보.
  if (req.ua?.isBot) {
    return new Response("Please don't be a bot. Be human.", { status: 403 });
  }

  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
      return NextResponse.redirect("/enter");
    }
  }

  // return NextResponse.json({ ok: true });
}
