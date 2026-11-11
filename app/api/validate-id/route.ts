// app/api/validate-id/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, playerId, zoneId } = body;
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key ក្នុង Vercel Environment Variables' }, { status: 500 });
    }

    let validateCategory = '';
    if (gameId === 'free-fire') validateCategory = 'free_fire'; // ឬ free_fire_cis អាស្រ័យលើតំបន់
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

    // បង្ហាញ Error ឱ្យច្បាស់ពី FazerCards
    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        error: `FazerCards Error: ${data.message || data.error || 'ID មិនត្រឹមត្រូវ ឬមិនគាំទ្រតំបន់នេះ'}`,
        details: data 
      }, { status: response.status });
    }

    // ព្យាយាមយកឈ្មោះពីទម្រង់ផ្សេងៗគ្នាដែល FazerCards អាចតបមក
    const nickname = data.nickname || data.name || data.data?.nickname || data.data?.name;

    return NextResponse.json({ success: true, nickname: nickname || 'រកឃើញ ID ត្រឹមត្រូវ' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}