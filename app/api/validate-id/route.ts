// app/api/validate-id/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, playerId, zoneId } = body;
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
    }

    let validateCategory = '';
    if (gameId === 'free-fire') validateCategory = 'free_fire'; 
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

    // បង្ហាញទិន្នន័យទាំងអស់ដែល FazerCards ផ្ញើមក (ដើម្បី Debug)
    const debugInfo = JSON.stringify(data);

    return NextResponse.json({ 
      success: true, 
      // បង្ហាញទិន្នន័យទាំងអស់ ដើម្បីឱ្យយើងឃើញឈ្មោះវានៅឯណា
      nickname: `ទិន្នន័យពី API: ${debugInfo}` 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហា: ${error.message}` }, { status: 500 });
  }
}