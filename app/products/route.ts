// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
  }

  // កំណត់ category_id ឱ្យត្រូវទៅនឹងតំបន់ដែលអ្នកចង់លក់
  let categoryId = '';
  if (gameId === 'free-fire') categoryId = 'free_fire_cis'; // សូមផ្ទៀងផ្ទាត់ឈ្មោះនេះពី API របស់ FazerCards
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
      return NextResponse.json({ success: false, error: 'មានបញ្ហាក្នុងការទាញទិន្នន័យ', details: data }, { status: response.status });
    }

    // ពិនិត្យមើលថាតើ FazerCards តបទិន្នន័យមកក្នុងទម្រង់ណា
    const offers = data.data || data.offers || data;

    return NextResponse.json({ success: true, offers: offers });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}