// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('game');
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'រកមិនឃើញ API Key' }, { status: 500 });
  }

  try {
    // ១. ទាញយកបញ្ជីហ្គេមទាំងអស់ពី FazerCards ដើម្បីមើលឈ្មោះ Category ID ពិតប្រាកដ
    const categoriesRes = await fetch('https://api.fzr.cards/api/v2/topups', {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json',
      },
    });
    const categoriesData = await categoriesRes.json();
    
    // បញ្ជីឈ្មោះហ្គេមដែលអាចទៅរួច
    let possibleCategories: string[] = [];
    
    // ស្វែងរកឈ្មោះដែលមានពាក្យ "free" ក្នុងនោះ
    if (gameId === 'free-fire') {
      possibleCategories = ['free_fire_sg', 'free_fire_global', 'free_fire_cis', 'free_fire'];
    } else if (gameId === 'mobile-legends') {
      possibleCategories = ['mobile_legends', 'mobile_legends_global'];
    }

    let finalOffers: any[] | null = null;
    let lastError = '';

    // ២. រត់រកមើលឈ្មោះទាំងអស់ រហូតឃើញកញ្ចប់
    for (const categoryId of possibleCategories) {
      const response = await fetch(`https://api.fzr.cards/api/v2/topups/offers?category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Accept': 'application/json',
        },
        cache: 'no-store' 
      });

      const data = await response.json();

      if (response.ok && data && (data.offers || data.data)) {
        const offersList = data.offers || data.data;
        if (offersList.length > 0) {
          finalOffers = offersList;
          break; 
        }
      } else {
        lastError = data.message || JSON.stringify(data);
      }
    }

    if (finalOffers) {
      return NextResponse.json({ success: true, offers: finalOffers });
    } else {
      // ប្រសិនបើរកមិនឃើញកញ្ចប់ទាល់តែសោះ បង្ហាញបញ្ជី Category ទាំងអស់ដែលមានក្នុងគណនីអ្នក
      return NextResponse.json({ 
        success: false, 
        error: `រកមិនឃើញកញ្ចប់ទេ។ សូមពិនិត្យ Category ID។`,
        // បង្ហាញបញ្ជីហ្គេមទាំងអស់ដែលអ្នកមាន
        debug_categories: categoriesData.data || categoriesData
      }, { status: 404 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `បញ្ហាបណ្តាញ: ${error.message}` }, { status: 500 });
  }
}