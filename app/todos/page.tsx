import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

type Todo = Database['public']['Tables']['todos']['Row'];

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: false }) as { data: Todo[] | null };

  return (
    <ul className="p-4">
      {todos?.map((todo) => (
        <li key={todo.id} className="py-2">
          {todo.task}
        </li>
      ))}
    </ul>
  );
}

