-- Debug script to check why jobs aren't showing for tradespeople
-- Run this in Supabase SQL editor to diagnose the issue

-- 1. Check all jobs and their current status
SELECT 
    id,
    trade,
    postcode,
    status,
    is_approved,
    is_completed,
    assigned_tradesperson_id,
    application_status,
    created_at,
    job_description
FROM jobs 
ORDER BY created_at DESC
LIMIT 10;

-- 2. Check specifically for approved jobs (what tradespeople should see)
SELECT 
    id,
    trade,
    postcode,
    status,
    is_approved,
    is_completed,
    assigned_tradesperson_id,
    'Available for tradespeople' as note
FROM jobs 
WHERE is_approved = true 
  AND status = 'approved'
  AND is_completed = false
  AND assigned_tradesperson_id IS NULL
ORDER BY created_at DESC;

-- 3. Count jobs by status
SELECT 
    status,
    is_approved,
    COUNT(*) as count
FROM jobs 
GROUP BY status, is_approved
ORDER BY count DESC;

-- 4. Check for any jobs that need to be approved
SELECT 
    id,
    trade,
    postcode,
    status,
    is_approved,
    'Needs approval' as note
FROM jobs 
WHERE is_approved = false 
  OR status != 'approved'
ORDER BY created_at DESC
LIMIT 5;

-- 5. Test trade matching (replace 'Plumber' with actual trade)
SELECT 
    id,
    trade,
    postcode,
    status,
    is_approved,
    'Matches trade filter' as note
FROM jobs 
WHERE is_approved = true 
  AND status = 'approved'
  AND is_completed = false
  AND assigned_tradesperson_id IS NULL
  AND (trade ILIKE '%Plumber%' OR trade = 'Plumber')
ORDER BY created_at DESC;

