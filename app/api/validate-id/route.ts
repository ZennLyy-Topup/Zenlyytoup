// app/api/validate-id/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, playerId, zoneId } = body;
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key ក្នុងប្រព័ន្ធ' }, { status: 500 });
    }

    let validateCategory = '';
    if (gameId === 'free-fire') validateCategory = 'free_fire'; 
    if (gameId === 'mobile-legends') validateCategory = 'mobile_legends';

    const fields: Record<string, string> = { player_id: playerId };
    if (gameId === 'mobile-legends' && zoneId) {
      fields.zone_id = zoneId;
    }

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

    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        error: `FazerCards បដិសេធ: ${data.message || data.error || 'ID មិនត្រឹមត្រូវ ឬតំបន់មិនគាំទ្រ'}`,
        details: data 
      }, { status: response.status });
    }

    // ស្វែងរកឈ្មោះពីគ្រប់ទម្រង់ដែលអាចមាន
    const nickname = 
      data.nickname || 
      data.username || 
      data.ign || 
      data.data?.nickname || 
      data.data?.username || 
      data.data?.ign ||
      data.result?.nickname;

    // ប្រសិនបើរកមិនឃើញឈ្មោះទេ បង្ហាញពាក្យថា "រកឃើញ ID (គ្មានឈ្មោះ)"
    return NextResponse.json({ 
      success: true, 
      nickname: nickname || 'រកឃើញ ID (គ្មានឈ្មោះបង្ហាញ)' 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}