-- Make chase list case-insensitive for species matching
-- Drop the case-sensitive unique constraint and replace with case-insensitive

alter table chase_list drop constraint if exists chase_list_user_id_common_name_key;

create unique index if not exists idx_chase_list_user_species
  on chase_list(user_id, lower(common_name));

-- Index for case-insensitive species matching against tour highlights
create index if not exists idx_chase_list_common_name_lower
  on chase_list(lower(common_name));
