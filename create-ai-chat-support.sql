-- Enhanced chat system with AI assistant and support tickets
-- Run this script in your Supabase SQL editor

-- Create support_tickets table for escalations
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('client', 'tradesperson')),
    chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    original_message TEXT NOT NULL,
    ai_response TEXT,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'resolved', 'closed')),
    assigned_to VARCHAR(100),
    admin_notes TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Add sender_type support for AI assistant in chat_messages
ALTER TABLE chat_messages 
DROP CONSTRAINT IF EXISTS chat_messages_sender_type_check;

ALTER TABLE chat_messages 
ADD CONSTRAINT chat_messages_sender_type_check 
CHECK (sender_type IN ('client', 'tradesperson', 'support', 'ai'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_type ON chat_messages(sender_type);

-- Create automatic timestamp update function
CREATE OR REPLACE FUNCTION update_support_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.status = 'resolved' OR NEW.status = 'closed' THEN
        NEW.resolved_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON support_tickets;
CREATE TRIGGER update_support_tickets_updated_at
    BEFORE UPDATE ON support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_support_ticket_updated_at();

-- Create AI assistant support room for general queries
-- Using a fixed UUID for the AI support room
INSERT INTO chat_rooms (id, job_id, client_id, tradesperson_id, created_at, updated_at, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    NULL,
    NULL,
    NULL,
    NOW(),
    NOW(),
    true
) ON CONFLICT DO NOTHING;

-- Create initial AI welcome message
INSERT INTO chat_messages (chat_room_id, sender_id, sender_type, message_text, created_at)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    '00000000-0000-0000-0000-000000000002'::uuid,
    'support',
    'Hello! 👋 I''m the MyApproved AI Assistant. I''m here to help you with:\n\n• Job posting and applications\n• Payment and dispute resolution\n• Account and verification issues\n• Platform navigation\n\nHow can I assist you today? Type your question and I''ll provide instant help!',
    NOW()
) ON CONFLICT DO NOTHING;

-- Sample support responses (you can add more)
COMMENT ON TABLE support_tickets IS 'Support ticket system for escalated chat queries';
COMMENT ON TABLE chat_messages IS 'Enhanced to support AI assistant responses';
