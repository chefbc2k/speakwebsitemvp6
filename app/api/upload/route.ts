import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Web3Storage } from 'web3.storage';
import { rateLimit } from '@/lib/rate-limit';

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100,
});

export async function POST(req: Request) {
  try {
    await limiter.check(req, 3); // 3 uploads per minute

    const token = await getToken({ req });
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      return new NextResponse('Invalid file type', { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return new NextResponse('File too large', { status: 400 });
    }

    // Upload to IPFS
    const cid = await client.put([file]);
    const url = `https://${cid}.ipfs.dweb.link/${file.name}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}