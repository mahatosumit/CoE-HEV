import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  type: 'registration' | 'contact';
  data: {
    name: string;
    email: string;
    course?: string;
    phone?: string;
    institution?: string;
    message?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();
    console.log('Processing notification:', type, data);

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not configured. Email not sent.');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email service not configured' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    let adminEmailContent = '';
    let userEmailContent = '';
    let adminSubject = '';
    let userSubject = '';

    if (type === 'registration') {
      adminSubject = `New Course Registration: ${data.course}`;
      adminEmailContent = `
        <h1>New Course Registration</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Course:</strong> ${data.course}</p>
        <p><strong>Institution:</strong> ${data.institution || 'Not provided'}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      `;
      
      userSubject = 'Registration Confirmation - EV Club';
      userEmailContent = `
        <h1>Thank you for registering, ${data.name}!</h1>
        <p>We have received your registration for <strong>${data.course}</strong>.</p>
        <p>Our team will review your application and get back to you within 2-3 business days.</p>
        <p>Best regards,<br>The EV Club Team</p>
      `;
    } else if (type === 'contact') {
      adminSubject = `New Contact Message from ${data.name}`;
      adminEmailContent = `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `;
      
      userSubject = 'We received your message - EV Club';
      userEmailContent = `
        <h1>Thank you for contacting us, ${data.name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>The EV Club Team</p>
      `;
    }

    // Send notification to admin
    try {
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'EV Club <onboarding@resend.dev>',
          to: ['mahatosumit0913@gmail.com'],
          subject: adminSubject,
          html: adminEmailContent,
        }),
      });
      console.log("Admin notification sent, status:", adminRes.status);
    } catch (adminError) {
      console.error("Error sending admin notification:", adminError);
    }

    // Send confirmation to user
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'EV Club <onboarding@resend.dev>',
        to: [data.email],
        subject: userSubject,
        html: userEmailContent,
      }),
    });

    if (!userRes.ok) {
      const errorData = await userRes.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    console.log("User confirmation sent successfully, status:", userRes.status);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
