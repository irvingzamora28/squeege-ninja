CREATE TABLE IF NOT EXISTS allset_emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS allset_contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Email Template Data Table
CREATE TABLE IF NOT EXISTS allset_email_template_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template TEXT NOT NULL,
  data TEXT NOT NULL, -- JSON stringified data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CTA Configuration Table
CREATE TABLE IF NOT EXISTS allset_cta_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cta_type TEXT NOT NULL, -- 'ebook-delivery', 'newsletter', or 'welcome'
  template_data_id INTEGER NOT NULL, -- FK to allset_email_template_data(id)
  newsletter_frequency TEXT, -- 'daily', 'weekly', 'monthly' (nullable)
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_data_id) REFERENCES allset_email_template_data(id)
);

-- Site Settings (single row, explicit fields for consistency)
CREATE TABLE IF NOT EXISTS allset_site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- enforce single row
  -- WhatsApp settings
  whatsapp_enabled INTEGER NOT NULL DEFAULT 0, -- 0=false, 1=true
  whatsapp_phone TEXT NOT NULL DEFAULT '', -- E.164 or digits
  whatsapp_message TEXT NOT NULL DEFAULT '',
  whatsapp_position TEXT NOT NULL DEFAULT 'bottom-right' CHECK (whatsapp_position IN ('bottom-right','bottom-left')),
  -- Assistant settings
  assistant_enabled INTEGER NOT NULL DEFAULT 0, -- mirrors data/agent-config.json enabled
  -- Booking widget visibility (global)
  booking_widget_enabled INTEGER NOT NULL DEFAULT 1, -- 0=false, 1=true
  -- i18n site language (e.g., 'en-us', 'es-mx')
  site_language TEXT NOT NULL DEFAULT 'en-us',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed default single row (id=1) if not present
INSERT OR IGNORE INTO allset_site_settings (
  id,
  whatsapp_enabled, whatsapp_phone, whatsapp_message, whatsapp_position,
  assistant_enabled, booking_widget_enabled, site_language
) VALUES (
  1,
  1, '+521234567890', 'Hello, I am interested in your services!', 'bottom-right',
  0, 1, 'es-mx'
);

-- ==========================================
-- Booking System Tables
-- ==========================================

-- Services (single business)
-- Services (single business)
CREATE TABLE IF NOT EXISTS allset_services (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recurring weekly availability rules
CREATE TABLE IF NOT EXISTS allset_service_availability_rules (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES allset_services(id) ON DELETE CASCADE,
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time_local TEXT NOT NULL,
  end_time_local TEXT NOT NULL,
  timezone TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_avail_rules_service_id
  ON allset_service_availability_rules(service_id);
CREATE INDEX IF NOT EXISTS idx_avail_rules_weekday
  ON allset_service_availability_rules(weekday);

-- Bookings for a specific service (single business)
CREATE TABLE IF NOT EXISTS allset_bookings (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES allset_services(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','canceled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_service_id
  ON allset_bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_start_time
  ON allset_bookings(start_time);

-- Holidays (date exceptions)
CREATE TABLE IF NOT EXISTS allset_holidays (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES allset_services(id) ON DELETE CASCADE,
  holiday_date DATE NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_holidays_service_id
  ON allset_holidays(service_id);
CREATE INDEX IF NOT EXISTS idx_holidays_date
  ON allset_holidays(holiday_date);