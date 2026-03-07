-- Chase list: users can save target species they want to see
create table if not exists chase_list (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  common_name text not null,
  scientific_name text,
  region text, -- Australian state abbreviation (NSW, VIC, QLD, etc.)
  created_at timestamptz not null default now(),
  unique(user_id, common_name)
);

-- Index for fast user lookups
create index idx_chase_list_user_id on chase_list(user_id);

-- RLS
alter table chase_list enable row level security;

-- Users can read their own chase list
create policy "Users can view own chase list"
  on chase_list for select
  using (auth.uid() = user_id);

-- Users can insert into their own chase list
create policy "Users can add to own chase list"
  on chase_list for insert
  with check (auth.uid() = user_id);

-- Users can delete from their own chase list
create policy "Users can remove from own chase list"
  on chase_list for delete
  using (auth.uid() = user_id);
