-- Add quorum_closes_at to tours table
-- Enables showing a real deadline in the CommitmentCard ("Quorum closes [date]")
-- without fabricating urgency. NULL = no deadline set.
ALTER TABLE tours ADD COLUMN IF NOT EXISTS quorum_closes_at timestamptz;
