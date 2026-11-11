// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
  }

  // សាកល្បងឈ្មោះផ្សេងៗគ្នាសម្រាប់ Free Fire (ដោយសារតំបន់ SG)
  let categoryId = '';
  if (gameId === 'free-fire') categoryId = 'free_fire_sg'; // អាចជា free_fire_sg ឬ free_fire
  if (gameId === 'mobile-legends') categoryId = 'mobile_legends';

  try {
    // ហៅ API ទាញយក Offers
    const response = await fetch(`https://api.fzr.cards/api/v2/topups/offers?category_id=${categoryId}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json',
      },
      cache: 'no-store' 
    });

    const data = await response.json();

    // ប្រសិនបើ FazerCards បដិសេធ (ខ្វះកញ្ចប់ ឬឈ្មោះខុស)
    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        error: `បញ្ហា API: ${data.message || 'សូមពិនិត្យ Category ID'}` 
      }, { status: response.status });
    }

    // ពិនិត្យមើលថាតើកញ្ចប់ស្ថិតនៅក្នុង Key ណា (offers ឬ data)
    const offersList = data.offers || data.data || data;
    
    return NextResponse.json({ success: true, offers: offersList });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}