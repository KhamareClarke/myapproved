-- Add dispute resolution / job flagging system
-- This script adds the necessary columns for clients to flag jobs with reasons
-- and for admin to manage flagged jobs

-- Add flagging columns to jobs table
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS flag_reason TEXT,
ADD COLUMN IF NOT EXISTS flagged_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS flagged_by UUID, -- User ID who flagged (can be client, tradesperson, etc.)
ADD COLUMN IF NOT EXISTS flagged_by_type VARCHAR(20), -- 'client', 'tradesperson', 'admin', etc.
ADD COLUMN IF NOT EXISTS admin_notes TEXT, -- For admin to add notes when reviewing flags
ADD COLUMN IF NOT EXISTS unflagged_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS unflagged_by VARCHAR(50); -- Admin username/id who unflagged

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_is_flagged ON jobs(is_flagged);
CREATE INDEX IF NOT EXISTS idx_jobs_flagged_at ON jobs(flagged_at);
CREATE INDEX IF NOT EXISTS idx_jobs_flagged_by ON jobs(flagged_by);

-- Create a trigger to automatically update flagged_at when is_flagged is set to true
CREATE OR REPLACE FUNCTION update_flagged_at_column()
RETURNS TRIGGER AS $$
BEGIN
    -- If is_flagged is being set to true and it wasn't true before
    IF NEW.is_flagged = TRUE AND OLD.is_flagged = FALSE THEN
        NEW.flagged_at = NOW();
    END IF;
    
    -- If is_flagged is being set to false and it was true before
    IF NEW.is_flagged = FALSE AND OLD.is_flagged = TRUE THEN
        NEW.unflagged_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update flagged_at
DROP TRIGGER IF EXISTS update_jobs_flagged_at ON jobs;
CREATE TRIGGER update_jobs_flagged_at 
    BEFORE UPDATE ON jobs
    FOR EACH ROW 
    EXECUTE FUNCTION update_flagged_at_column();

-- Add some sample flag reasons for reference (you can customize these)
COMMENT ON COLUMN jobs.flag_reason IS 'Common reasons: Poor communication, Quality issues, Pricing disputes, No-show, Safety concerns, Unprofessional behavior, Other';

-- Show current flagged jobs (if any)
SELECT 
    j.id,
    j.trade,
    j.job_description,
    j.is_flagged,
    j.flag_reason,
    j.flagged_at,
    c.first_name || ' ' || c.last_name as client_name
FROM jobs j
LEFT JOIN clients c ON j.client_id = c.id
WHERE j.is_flagged = TRUE
ORDER BY j.flagged_at DESC;
