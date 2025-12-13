-- Test script to verify the flagging system is working
-- Run this after applying the main migration

-- Check if all required columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'jobs' 
  AND column_name IN ('is_flagged', 'flag_reason', 'flagged_at', 'flagged_by', 'flagged_by_type', 'admin_notes', 'unflagged_at', 'unflagged_by')
ORDER BY column_name;

-- Check if the trigger function exists
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'update_flagged_at_column';

-- Check if the trigger exists
SELECT trigger_name, event_manipulation, action_timing 
FROM information_schema.triggers 
WHERE trigger_name = 'update_jobs_flagged_at';

-- Show sample of jobs table structure
SELECT * FROM jobs LIMIT 1;

