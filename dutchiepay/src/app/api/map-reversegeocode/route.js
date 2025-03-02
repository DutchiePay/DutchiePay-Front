import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const coords = searchParams.get('coords');
  const output = searchParams.get('output') || 'json';

  if (!coords) {
    return NextResponse.json(
      { error: 'coords 파라미터가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&output=${output}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.MAP_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.MAP_CLIENT_SECRET,
        },
      }
    );

    if (!response.ok) {
      throw new Error('네이버 API 요청 실패');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: '네이버 API 요청 중 오류 발생' },
      { status: 500 }
    );
  }
}
