// app/api/validate-id/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, playerId, zoneId } = body;
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'រកមិនឃើញ API Key' }, { status: 500 });
    }

    // កំណត់ category_id សម្រាប់ការផ្ទៀងផ្ទាត់ (Validation Namespace)
    // យោងតាមឯកសារ FazerCards ឈ្មោះសម្រាប់ការផ្ទៀងផ្ទាត់គឺខុសពីការលក់
    let validateCategory = '';
    if (gameId === 'free-fire') validateCategory = 'free_fire';
    if (gameId === 'mobile-legends') validateCategory = 'mobile_legends';

    // រៀបចំ fields តាមហ្គេម
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
      return NextResponse.json({ error: 'ID មិនត្រឹមត្រូវ ឬមានបញ្ហា', details: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, nickname: data.nickname || data.name || data.data?.nickname });
  } catch (error) {
    return NextResponse.json({ error: 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់' }, { status: 500 });
  }
}