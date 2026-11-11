// app/api/validate-id/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, playerId, zoneId } = body;
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key ក្នុង Vercel' }, { status: 500 });
    }

    // កំណត់ Category សម្រាប់ការផ្ទៀងផ្ទាត់
    let validateCategory = 'free_fire';
    if (gameId === 'mobile-legends') validateCategory = 'mobile_legends';

    const fields: Record<string, string> = { player_id: playerId };
    if (gameId === 'mobile-legends' && zoneId) fields.zone_id = zoneId;

    const response = await fetch('https://api.fzr.cards/api/v2/topups/validate-id', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        category_id: validateCategory,
        fields: fields,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.ok === false) {
      return NextResponse.json({ 
        success: false, 
        error: data.message || 'ID មិនត្រឹមត្រូវ ឬមានបញ្ហា' 
      }, { status: 400 });
    }

    // ទាញយកឈ្មោះតាម Key ដែលយើងបានឃើញពី Debug មុននេះ
    return NextResponse.json({ 
      success: true, 
      nickname: data.nickname || 'រកឃើញ ID ត្រឹមត្រូវ' 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ` }, { status: 500 });
  }
}