import { NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await getEnquiries();

  const headers = [
    'Enquiry ID',
    'Full Name',
    'Company Name',
    'Business Email',
    'Phone Number',
    'Service Required',
    'Budget Range',
    'Expected Timeline',
    'Status',
    'Follow-up Date',
    'Referral Source',
    'Lead Source',
    'Project Brief',
    'Internal Notes',
    'Created At'
  ];

  const rows = enquiries.map(e => [
    escapeCsvField(e.id),
    escapeCsvField(e.fullName),
    escapeCsvField(e.companyName),
    escapeCsvField(e.businessEmail),
    escapeCsvField(e.phoneNumber),
    escapeCsvField(e.serviceRequired),
    escapeCsvField(e.budgetRange),
    escapeCsvField(e.expectedTimeline),
    escapeCsvField(e.status),
    escapeCsvField(e.followUpDate || ''),
    escapeCsvField(e.referralSource || ''),
    escapeCsvField(e.leadSource || ''),
    escapeCsvField(e.projectDescription),
    escapeCsvField(e.internalNotes || ''),
    escapeCsvField(e.createdAt)
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="lets-think-studio-enquiries-${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}
