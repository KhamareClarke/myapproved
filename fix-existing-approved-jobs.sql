-- Fix existing approved jobs to have application_status = 'open'
-- This allows them to be visible to tradespeople

-- Update approved jobs that don't have application_status set
UPDATE jobs 
SET application_status = 'open'
WHERE is_approved = true 
  AND status = 'approved'
  AND is_completed = false
  AND assigned_tradesperson_id IS NULL
  AND (application_status IS NULL OR application_status = '');

-- Show the jobs that were updated
SELECT 
    id,
    trade,
    postcode,
    status,
    is_approved,
    application_status,
    'Updated to be visible to tradespeople' as note
FROM jobs 
WHERE is_approved = true 
  AND status = 'approved'
  AND application_status = 'open'
  AND assigned_tradesperson_id IS NULL
ORDER BY created_at DESC;

