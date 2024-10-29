import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit } from '@/lib/rate-limit';
import { db } from '@/lib/db';
import { validateUserData } from '@/lib/validations';
import { sanitizeInput } from '@/lib/security';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function GET(
  req: Request,
  { params }: { params: { address: string } }
) {
  try {
    await limiter.check(req, 10); // 10 requests per minute

    const token = await getToken({ req });
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const address = sanitizeInput(params.address);
    const user = await db.user.findUnique({
      where: { address: address.toLowerCase() },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { address: string } }
) {
  try {
    await limiter.check(req, 5); // 5 requests per minute

    const token = await getToken({ req });
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const address = sanitizeInput(params.address);
    const data = await req.json();
    
    // Validate input data
    const validatedData = validateUserData(data);
    if (!validatedData.success) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { address: address.toLowerCase() },
      data: validatedData.data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}