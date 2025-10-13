-- Supabase Database Setup Script
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
-- Enable RLS on all tables for security

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anon full access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow anon full access to employees" ON public.employees;
DROP POLICY IF EXISTS "Allow anon full access to events" ON public.events;
DROP POLICY IF EXISTS "Allow anon full access to income_records" ON public.income_records;
DROP POLICY IF EXISTS "Allow anon full access to expense_records" ON public.expense_records;
DROP POLICY IF EXISTS "Allow anon full access to profit_distributions" ON public.profit_distributions;
DROP POLICY IF EXISTS "Allow anon full access to receipts" ON public.receipts;

-- Enable RLS on all tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profit_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow anon users full access
-- This allows your admin portal to work with the anon key

-- Customers policies
CREATE POLICY "Allow anon full access to customers" ON public.customers
    FOR ALL USING (true) WITH CHECK (true);

-- Employees policies
CREATE POLICY "Allow anon full access to employees" ON public.employees
    FOR ALL USING (true) WITH CHECK (true);

-- Events policies
CREATE POLICY "Allow anon full access to events" ON public.events
    FOR ALL USING (true) WITH CHECK (true);

-- Income records policies
CREATE POLICY "Allow anon full access to income_records" ON public.income_records
    FOR ALL USING (true) WITH CHECK (true);

-- Expense records policies
CREATE POLICY "Allow anon full access to expense_records" ON public.expense_records
    FOR ALL USING (true) WITH CHECK (true);

-- Profit distributions policies
CREATE POLICY "Allow anon full access to profit_distributions" ON public.profit_distributions
    FOR ALL USING (true) WITH CHECK (true);

-- Receipts policies
CREATE POLICY "Allow anon full access to receipts" ON public.receipts
    FOR ALL USING (true) WITH CHECK (true);

-- Customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    address TEXT,
    notes TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    total_events INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    join_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Employees table
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    join_date DATE NOT NULL,
    address TEXT,
    emergency_contact TEXT,
    notes TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    events_handled INTEGER DEFAULT 0,
    performance TEXT DEFAULT 'good' CHECK (performance IN ('excellent', 'good', 'average', 'needs_improvement')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    location TEXT NOT NULL,
    event_date DATE NOT NULL,
    employee_name TEXT NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'in-progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Income records table
CREATE TABLE IF NOT EXISTS public.income_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    status TEXT DEFAULT 'received' CHECK (status IN ('received', 'pending', 'overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Expense records table
CREATE TABLE IF NOT EXISTS public.expense_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    vendor TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    date DATE NOT NULL,
    receipt_number TEXT,
    status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profit distributions table
CREATE TABLE IF NOT EXISTS public.profit_distributions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    total_profit DECIMAL(10,2) NOT NULL,
    partner1_percentage DECIMAL(5,2) NOT NULL,
    partner2_percentage DECIMAL(5,2) NOT NULL,
    partner1_share DECIMAL(10,2) NOT NULL,
    partner2_share DECIMAL(10,2) NOT NULL,
    distributed BOOLEAN DEFAULT FALSE,
    distribution_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Receipts table
CREATE TABLE IF NOT EXISTS public.receipts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    receipt_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    event_name TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    date DATE NOT NULL,
    status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(status);
CREATE INDEX IF NOT EXISTS idx_employees_email ON public.employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_status ON public.employees(status);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_income_date ON public.income_records(date);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expense_records(date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profit_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (allow all operations for authenticated users)
-- In production, you'd want more restrictive policies
CREATE POLICY "Enable all operations for authenticated users" ON public.customers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.employees
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.income_records
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.expense_records
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.profit_distributions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.receipts
    FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_employees_updated_at
    BEFORE UPDATE ON public.employees
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_income_records_updated_at
    BEFORE UPDATE ON public.income_records
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_expense_records_updated_at
    BEFORE UPDATE ON public.expense_records
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
