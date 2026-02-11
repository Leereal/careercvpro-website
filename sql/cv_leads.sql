-- CV Leads Table for tracking CV service orders
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS cv_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  service_price TEXT NOT NULL,
  template TEXT,
  file_url TEXT,
  file_name TEXT,
  source TEXT DEFAULT 'cv-revamp-page',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  has_existing_cv BOOLEAN,
  cv_details JSONB, -- Stores detailed CV info for users without CV
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'paid', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cv_leads_created_at ON cv_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_leads_status ON cv_leads(status);
CREATE INDEX IF NOT EXISTS idx_cv_leads_source ON cv_leads(source);
CREATE INDEX IF NOT EXISTS idx_cv_leads_has_existing_cv ON cv_leads(has_existing_cv);

-- Enable Row Level Security
ALTER TABLE cv_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from authenticated and anonymous users (for public form)
CREATE POLICY "Allow public insert" ON cv_leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only allow authenticated users to read/update
CREATE POLICY "Allow authenticated read" ON cv_leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON cv_leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cv_leads_updated_at
  BEFORE UPDATE ON cv_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Migration: Add columns to existing table if needed
-- ALTER TABLE cv_leads ADD COLUMN IF NOT EXISTS has_existing_cv BOOLEAN;
-- ALTER TABLE cv_leads ADD COLUMN IF NOT EXISTS cv_details JSONB;
