// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
  }

  // បន្ថែម : string[] ដើម្បីកំណត់ប្រភេទទិន្នន័យឱ្យ TypeScript ដឹង
  let possibleCategories: string[] = [];
  
  if (gameId === 'free-fire') {
    possibleCategories = ['free_fire_sg', 'free_fire_global', 'free_fire'];
  } else if (gameId === 'mobile-legends') {
    possibleCategories = ['mobile_legends', 'mobile_legends_global'];
  }

  let finalOffers: any[] | null = null; // កំណត់ប្រភេទទិន្នន័យសម្រាប់ finalOffers
  let lastError = '';

  // រត់រកមើលគ្រប់ឈ្មោះ រហូតឃើញកញ្ចប់
  for (const categoryId of possibleCategories) {
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

      // ប្រសិនបើ API ឆ្លើយតបជោគជ័យ និងមានកញ្ចប់
      if (response.ok && data && (data.offers || data.data)) {
        const offersList = data.offers || data.data;
        if (offersList.length > 0) {
          finalOffers = offersList;
          break; // ឈប់រកបន្ត ព្រោះឃើញហើយ
        }
      } else {
        lastError = data.message || JSON.stringify(data);
      }
    } catch (e: any) {
      lastError = 'បញ្ហាបណ្តាញ';
    }
  }

  if (finalOffers) {
    return NextResponse.json({ success: true, offers: finalOffers });
  } else {
    return NextResponse.json({ 
      success: false, 
      error: `រកមិនឃើញកញ្ចប់ទេ។ មូលហេតុ: ${lastError}` 
    }, { status: 404 });
  }
}