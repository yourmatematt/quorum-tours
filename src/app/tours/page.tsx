import { createClient } from '@/lib/supabase/server';
import { ToursListClient } from './ToursListClient';
import type { Tour } from '@/lib/supabase/useTours';

async function getTours(): Promise<Tour[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tours')
    .select(`
      *,
      operator:operators(id, name, slug, base_location)
    `)
    .in('status', ['forming', 'payment_pending', 'confirmed'])
    .order('date_start', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }

  return (data || []).map(tour => ({
    ...tour,
    current_participants: tour.current_participant_count || 0,
  }));
}

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <ToursListClient initialTours={tours} />
    </main>
  );
}
