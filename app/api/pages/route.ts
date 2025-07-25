import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Page from '@/lib/models/Page';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    
    let query: any = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (slug) {
      query.slug = slug;
    }
    
    const pages = await Page.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const data = await req.json();
    const page = new Page(data);
    await page.save();
    
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}