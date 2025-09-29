import { NextRequest, NextResponse } from 'next/server';
import { validateLoginForm } from '@/lib/validation';
import { handleError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Here you would typically validate credentials against your auth system
    // For now, we'll return a success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Login successful',
        // In a real app, you'd return a JWT token or session info
      },
    });
  } catch (error) {
    const appError = handleError(error);
    return NextResponse.json(
      {
        success: false,
        error: appError.message,
        code: appError.code,
      },
      { status: 500 }
    );
  }
}
