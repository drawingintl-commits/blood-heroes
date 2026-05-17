insert into storage.buckets (id, name, public)
values ('donation-photos', 'donation-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view donation photos"
  on storage.objects for select
  using (bucket_id = 'donation-photos');

create policy "Users can upload own donation photos"
  on storage.objects for insert
  with check (
    bucket_id = 'donation-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update own donation photos"
  on storage.objects for update
  using (
    bucket_id = 'donation-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete own donation photos"
  on storage.objects for delete
  using (
    bucket_id = 'donation-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
