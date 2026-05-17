create extension if not exists "uuid-ossp";

create type blood_type as enum ('A', 'B', 'O', 'AB', 'unknown');
create type donation_type as enum ('whole_blood_200', 'whole_blood_400', 'plasma', 'platelet');
create type photo_visibility as enum ('count_only', 'hands', 'back', 'face_ok');
create type report_status as enum ('open', 'reviewing', 'resolved', 'rejected');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 40),
  instagram_id text,
  region text not null,
  blood_type blood_type,
  avatar_url text,
  total_donations integer not null default 0 check (total_donations >= 0),
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  threshold integer not null unique check (threshold > 0),
  title text not null,
  description text not null,
  color text not null default 'red',
  created_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  count integer not null check (count > 0),
  donated_on date not null,
  donation_type donation_type not null,
  location text not null,
  region text not null,
  comment text not null default '' check (char_length(comment) <= 500),
  photo_url text,
  photo_visibility photo_visibility not null default 'count_only',
  is_first_donation boolean not null default false,
  next_available_on date not null,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.likes (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (donation_id, user_id)
);

create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 300),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  reporter_id uuid not null references public.users(id) on delete cascade,
  reason text not null check (char_length(reason) between 1 and 500),
  status report_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

insert into public.badges (threshold, title, description, color) values
  (1, 'はじめてヒーロー', 'はじめての一歩に、心からありがとう。', 'rose'),
  (5, 'いのちの応援者', '継続するやさしさが誰かの支えに。', 'red'),
  (10, '赤のヒーロー', '献血文化を広げる頼れる存在。', 'red'),
  (30, '金の献血者', '地域にあたたかい循環を作る人。', 'gold'),
  (50, '伝説の献血者', '長く続ける善意は、ひとつの文化です。', 'black'),
  (100, '献血マスター', '称賛と感謝を込めて、最高位のヒーローへ。', 'purple')
on conflict (threshold) do nothing;

alter table public.users enable row level security;
alter table public.badges enable row level security;
alter table public.donations enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.reports enable row level security;

create policy "Users can read public profiles"
  on public.users for select using (true);

create policy "Users can upsert own profile"
  on public.users for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Anyone can read badges"
  on public.badges for select using (true);

create policy "Anyone can read visible donations"
  on public.donations for select using (is_deleted = false);

create policy "Users can create own donations"
  on public.donations for insert with check (auth.uid() = user_id);

create policy "Users can update own donations"
  on public.donations for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Admins can moderate donations"
  on public.donations for update using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

create policy "Users can read likes"
  on public.likes for select using (true);

create policy "Users can like as themselves"
  on public.likes for insert with check (auth.uid() = user_id);

create policy "Users can remove own likes"
  on public.likes for delete using (auth.uid() = user_id);

create policy "Users can read visible comments"
  on public.comments for select using (is_deleted = false);

create policy "Users can create own comments"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "Users can soft-delete own comments"
  on public.comments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can create reports"
  on public.reports for insert with check (auth.uid() = reporter_id);

create policy "Admins can read reports"
  on public.reports for select using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update reports"
  on public.reports for update using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

create or replace function public.sync_user_total_donations()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.users
    set total_donations = greatest(total_donations, new.count),
        updated_at = now()
    where id = new.user_id;
  return new;
end;
$$;

create trigger on_donation_count_update
after insert or update of count on public.donations
for each row execute procedure public.sync_user_total_donations();
