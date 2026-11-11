// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // ទាញយក gameId ពី URL (ឧទាហរណ៍៖ ?game=free-fire)
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');

  // កំណត់ API Key ពី Environment Variable
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'រកមិនឃើញ API Key ក្នុងប្រព័ន្ធទេ' }, { status: 500 });
  }

  // កំណត់ category_id តាមហ្គេម (អ្នកត្រូវរក ID ពិតពី FazerCards)
  // ចំណាំ៖ ខាងក្រោមនេះជាឈ្មោះក្លែងក្លាយ អ្នកត្រូវប្តូរវានៅពេលមាន ID ពិត
  let categoryId = '';
  if (gameId === 'free-fire') categoryId = 'free_fire_auto'; 
  if (gameId === 'mobile-legends') categoryId = 'mobile_legends_auto';

  try {
    // ហៅទៅកាន់ FazerCards API ដើម្បីទាញយក Offers
    const response = await fetch(`https://api.fzr.cards/api/v2/topups/offers?category_id=${categoryId}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json',
      },
      // បិទ Cache ដើម្បីឱ្យវាទាញទិន្នន័យថ្មីរាល់ពេល
      cache: 'no-store' 
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'មានបញ្ហាក្នុងការទាញទិន្នន័យពី FazerCards', details: data }, { status: response.status });
    }

    // បញ្ជូនទិន្នន័យត្រឡប់ទៅ Frontend
    return NextResponse.json({ success: true, offers: data.data || data });

  } catch (error) {
    return NextResponse.json({ error: 'មានបញ្ហាបណ្តាញ មិនអាចភ្ជាប់ទៅ FazerCards បានទេ' }, { status: 500 });
  }
}