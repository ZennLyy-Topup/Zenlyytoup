// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
  }

  // សាកល្បងជាមួយឈ្មោះ Category ផ្សេងៗគ្នា
  let categoryId = '';
  if (gameId === 'free-fire') categoryId = 'free_fire_cis'; // ឬ free_fire_global
  if (gameId === 'mobile-legends') categoryId = 'mobile_legends';

  try {
    const response = await fetch(`https://api.fzr.cards/api/v2/topups/offers?category_id=${categoryId}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json',
      },
      cache: 'no-store' 
    });

    const data = await response.json();

    if (!response.ok) {
      // បង្ហាញ Error ពី FazerCards ឱ្យបានច្បាស់
      return NextResponse.json({ 
        success: false, 
        error: `FazerCards បដិសេធ: ${data.message || JSON.stringify(data)}` 
      }, { status: response.status });
    }

    return NextResponse.json({ success: true, offers: data.data || data.offers || data });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}