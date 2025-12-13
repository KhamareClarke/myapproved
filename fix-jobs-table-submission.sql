-- Fix jobs table to support job submissions from homepage
-- This adds the missing columns needed for the job submission workflow

-- Add missing columns for job submissions
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS urgency VARCHAR(20) DEFAULT 'normal', -- 'emergency', 'urgent', 'normal'
ADD COLUMN IF NOT EXISTS availability VARCHAR(50) DEFAULT 'Flexible',
ADD COLUMN IF NOT EXISTS client_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS client_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS client_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending_approval', -- 'pending_approval', 'approved', 'rejected', 'completed'
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS approved_by UUID,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Update existing jobs to have proper status
UPDATE jobs SET 
  status = 'pending_approval',
  is_approved = FALSE,
  urgency = 'normal',
  availability = 'Flexible'
WHERE status IS NULL OR status = 'open';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_urgency ON jobs(urgency);
CREATE INDEX IF NOT EXISTS idx_jobs_client_email ON jobs(client_email);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_is_approved ON jobs(is_approved);

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'jobs' 
ORDER BY ordinal_position;


