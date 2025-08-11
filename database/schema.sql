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
  -- i18n site language (e.g., 'en-us', 'es-mx')
  site_language TEXT NOT NULL DEFAULT 'en-us',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed default single row (id=1) if not present
INSERT OR IGNORE INTO allset_site_settings (
  id,
  whatsapp_enabled, whatsapp_phone, whatsapp_message, whatsapp_position,
  assistant_enabled, site_language
) VALUES (
  1,
  1, '+521234567890', 'Hello, I am interested in your services!', 'bottom-right',
  0, 'es-mx'
);
