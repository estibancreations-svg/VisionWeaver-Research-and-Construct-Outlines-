Original name: MOTIVE NEXT Database Schema (PostgreSQL:Supabase) database_schema.sql
Drive ID: 1iMXmKUEVkgZ5X2ZxmBlgwErqurS1F36T
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:35:19.000Z

-- MOTIVE NEXT Database Schema (PostgreSQL/Supabase)
-- Complete database structure for transportation management

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    user_type VARCHAR(50) CHECK (user_type IN ('driver', 'dispatcher', 'fleet_manager', 'c_suite')),
    application VARCHAR(50) CHECK (application IN ('trucking', 'driveaway')),
    subscription_plan VARCHAR(50) CHECK (subscription_plan IN ('basic', 'professional', 'enterprise')),
    subscription_status VARCHAR(50) DEFAULT 'active',
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Vehicle Information
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vin VARCHAR(17) UNIQUE NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    vehicle_type VARCHAR(100),
    license_plate VARCHAR(20),
    insurance_provider VARCHAR(100),
    insurance_policy VARCHAR(100),
    insurance_expiry DATE,
    last_maintenance DATE,
    odometer INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Hours of Service Tracking
CREATE TABLE hos_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    status VARCHAR(50) CHECK (status IN ('off_duty', 'sleeper', 'driving', 'on_duty')),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_address TEXT,
    odometer_start INTEGER,
    odometer_end INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Daily HOS Summary
CREATE TABLE hos_daily_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    drive_time_minutes INTEGER DEFAULT 0,
    on_duty_time_minutes INTEGER DEFAULT 0,
    off_duty_time_minutes INTEGER DEFAULT 0,
    sleeper_time_minutes INTEGER DEFAULT 0,
    violations TEXT[],
    eld_compliant BOOLEAN DEFAULT true,
    certified BOOLEAN DEFAULT false,
    certified_at TIMESTAMP,
    UNIQUE(user_id, log_date)
);

-- 8-Day Cycle Tracking
CREATE TABLE hos_cycle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cycle_start DATE NOT NULL,
    cycle_end DATE NOT NULL,
    total_minutes INTEGER DEFAULT 0,
    remaining_minutes INTEGER DEFAULT 4200,
    UNIQUE(user_id, cycle_start)
);

-- Insurance Monitoring
CREATE TABLE insurance_monitoring (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    provider VARCHAR(100) CHECK (provider IN ('allstate', 'progressive', 'other')),
    policy_number VARCHAR(100),
    driving_score INTEGER,
    discount_percentage DECIMAL(5, 2),
    last_sync TIMESTAMP,
    telemetry_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Trips (Driveaway)
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    vehicle_id UUID REFERENCES vehicles(id),
    trip_type VARCHAR(50) CHECK (trip_type IN ('driveaway', 'freight', 'local')),
    status VARCHAR(50) CHECK (status IN ('available', 'accepted', 'in_progress', 'completed', 'cancelled')),
    origin_address TEXT,
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),
    destination_address TEXT,
    destination_lat DECIMAL(10, 8),
    destination_lng DECIMAL(11, 8),
    distance_miles DECIMAL(10, 2),
    estimated_duration_minutes INTEGER,
    price_cents INTEGER,
    acceptance_window_end TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Emergency SOS Events
CREATE TABLE emergency_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    location_address TEXT,
    contacts_notified TEXT[],
    emergency_services_contacted BOOLEAN DEFAULT false,
    status VARCHAR(50) CHECK (status IN ('active', 'responding', 'resolved', 'false_alarm')),
    resolution_notes TEXT,
    activated_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

-- PTT Communication Logs
CREATE TABLE ptt_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    contact_type VARCHAR(50) CHECK (contact_type IN ('dispatch', 'emergency', 'fleet')),
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(20),
    session_start TIMESTAMP NOT NULL,
    session_end TIMESTAMP,
    duration_seconds INTEGER,
    recording_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    trip_id UUID REFERENCES trips(id),
    expense_type VARCHAR(50) CHECK (expense_type IN ('fuel', 'maintenance', 'tolls', 'lodging', 'meals', 'other')),
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    vendor VARCHAR(255),
    receipt_url TEXT,
    expense_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments/Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_type VARCHAR(50) CHECK (invoice_type IN ('subscription', 'daily_billing', 'one_time')),
    amount_cents INTEGER NOT NULL,
    status VARCHAR(50) CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled')),
    stripe_invoice_id VARCHAR(255),
    due_date DATE,
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance Records
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    maintenance_type VARCHAR(100),
    description TEXT,
    cost_cents INTEGER,
    odometer INTEGER,
    service_date DATE NOT NULL,
    next_service_date DATE,
    vendor VARCHAR(255),
    receipt_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- DOT Inspections
CREATE TABLE dot_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    inspection_level INTEGER CHECK (inspection_level BETWEEN 1 AND 6),
    overall_status VARCHAR(20) CHECK (overall_status IN ('PASS', 'FAIL', 'CONDITIONAL')),
    vin_detected VARCHAR(17),
    inspector_name VARCHAR(255),
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    dot_reported BOOLEAN DEFAULT false,
    insurance_notified BOOLEAN DEFAULT false,
    pdf_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- DOT Inspection Steps
CREATE TABLE dot_inspection_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES dot_inspections(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    component VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('PASS', 'FAIL', 'NOT_APPLICABLE')),
    photo_url TEXT,
    ai_confidence DECIMAL(5, 4),
    issues TEXT[],
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Video Recordings
CREATE TABLE video_recordings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    trip_id UUID REFERENCES trips(id),
    recording_type VARCHAR(50) CHECK (recording_type IN ('interior', 'exterior', 'inspection', 'incident')),
    video_url TEXT NOT NULL,
    duration_seconds INTEGER,
    file_size_mb DECIMAL(10, 2),
    thumbnail_url TEXT,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_hos_logs_user_date ON hos_logs(user_id, log_date);
CREATE INDEX idx_trips_user_status ON trips(user_id, status);
CREATE INDEX idx_emergency_events_status ON emergency_events(status);
CREATE INDEX idx_expenses_user_date ON expenses(user_id, expense_date);
CREATE INDEX idx_invoices_user_status ON invoices(user_id, status);
CREATE INDEX idx_ptt_sessions_user ON ptt_sessions(user_id, session_start);
CREATE INDEX idx_insurance_monitoring_user ON insurance_monitoring(user_id, last_sync);
CREATE INDEX idx_dot_inspections_vehicle ON dot_inspections(vehicle_id, created_at);
CREATE INDEX idx_dot_inspections_status ON dot_inspections(overall_status, created_at);
CREATE INDEX idx_video_recordings_type ON video_recordings(recording_type, started_at);

-- Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hos_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own vehicles" ON vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vehicles" ON vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own HOS logs" ON hos_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own HOS logs" ON hos_logs FOR INSERT WITH CHECK (auth.uid() = user_id);