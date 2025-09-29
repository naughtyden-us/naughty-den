import { NextRequest, NextResponse } from 'next/server';
import { validateSignupForm } from '@/lib/validation';
import { handleError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, displayName, isCreator } = body;

    // Validate input
    const validation = validateSignupForm({ email, password, displayName, isCreator });
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

    // Here you would typically create the user account
    // For now, we'll return a success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Registration successful',
        user: {
          email,
          displayName,
          isCreator,
        },
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
