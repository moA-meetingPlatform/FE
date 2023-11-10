import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // TODO: 이걸로 url 얻어서 서버로 요청해도 될듯
  // console.log(request.nextUrl)

  // NextResponse.next()  //통과
  // NextResponse.redirect()  //다른페이지 이동
  // NextResponse.rewrite()  //다른페이지 이동


  const session = await getToken({req : request})
  // logout -> null 출력
  // console.log(session)

  // meeting 페이지 접근시 로그인 안되어있으면 로그인 페이지로 이동
  if ( request.nextUrl.pathname.startsWith('/asdads') )
    if (session === null){
      // TODO : host 바꾸기
      return NextResponse.redirect(new URL('http://localhost:3000/login'), request.url)
    }


  // 접속로그 저장
  if ( request.nextUrl.pathname === '/'){
    //request.nextUrl.pathname.startsWith

    // 접속 시간
    // console.log(new Date().toLocaleString())
    // 접속 os
    // console.log(request.headers.get('sec-ch-ua-platform'))
    // 접속 ip -> 안됨
    // const clientIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
    // console.log(clientIp);

    return NextResponse.next()
  }


  
} 