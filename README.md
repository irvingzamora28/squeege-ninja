# AI-Powered Landing Page Generator

A Next.js-based landing page generator that uses AI to create compelling content for your business or product. Generate landing pages and SEO-optimized blog posts with minimal effort.

## Features

### Landing Page Generation

- 2-3 pre-designed, professional templates
- AI-powered content generation based on your business description
- Customizable color schemes and font presets
- Dynamic content rendering from JSON structure
- Mobile-responsive designs

### Blog Generation

- AI-generated SEO-optimized blog posts
- Basic CMS functionality (draft/publish, delete)
- MDX file format for manual editing
- Automated meta tags for SEO

### Admin Panel

- User-friendly interface for content generation
- Template selection and customization
- Blog post management
- Analytics integration

### AI Integration

Supported LLM Providers:

- OpenAI (and compatible: Deepseek, Ollama)
- Google Gemini

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- MDX for blog content
- Content Layer for MDX processing

## Getting Started

### Prerequisites

- Node.js 18+
- NPM package manager o Bun package manager
- API keys for chosen LLM provider

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/project-name.git
```

2. Install dependencies:

```bash
npm install
```

```bash
bun install
```

3. Copy the example environment file:

```bash
cp .env.example .env.local
```

4. Configure your environment variables:

```env
# OpenAI and Compatible Providers
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# Google Gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-pro

# Other Configuration
NEXT_PUBLIC_SITE_URL=your_site_url
```

5. Start the development server:

```bash
npm run dev
```

```bash
bun run dev
```

### Configuration

#### Database Table Prefix (Multi-Client Support)

You can configure the prefix used for all database table names by setting the `TABLE_PREFIX` environment variable in your `.env.local` file. This allows each client or deployment to have its own set of tables (e.g., `allset_`, `my_page_`, `youtube_channel_`).

- **Default:** If `TABLE_PREFIX` is not set, it defaults to `allset_`.
- **How to use:**
  - For the default (allset):
    ```env
    # .env.local
    TABLE_PREFIX=allset_
    ```
  - For a client named "my_page":
    ```env
    # .env.local
    TABLE_PREFIX=my_page_
    ```
  - For a client named "youtube_channel":
    ```env
    # .env.local
    TABLE_PREFIX=youtube_channel_
    ```

All table names in the database will use this prefix (e.g., `youtube_channel_emails`, `youtube_channel_contact_submissions`).

#### LLM Providers

Configure your preferred LLM provider in `.env.local`. The system supports:

- OpenAI (and compatible):
  - OpenAI
  - Deepseek
  - Ollama
- Google Gemini

#### Analytics

Analytics configuration can be modified in `data/siteMetadata.js`. Supported providers:

- Umami Analytics
- Plausible
- Simple Analytics
- PostHog
- Google Analytics

## Usage

1. Access the admin panel at `/admin`
2. Input your business/product description
3. Choose a template
4. Generate landing page content
5. Customize colors and fonts
6. Generate complementary blog posts
7. Publish your content

## Directory Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
├── data/               # MDX blog posts and site metadata
├── public/             # Static assets
├── styles/            # Tailwind CSS styles
├── lib/               # Utility functions and LLM interfaces
└── admin/             # Admin panel pages
```

---

## Managing Client Sites from the Template

This project includes a script to help you create and manage independent client sites based on your main template repository, while allowing you to manually sync updates from the main repo to each client repo as needed.

### Creating a New Client Site

Use the provided `create-client-site.sh` script to set up a new client site repository:

```bash
./create-client-site.sh <client-repo-url> <client-folder>
```

**Example:**

```bash
./create-client-site.sh https://github.com/your-org/client-site.git client-site
```

- `<client-repo-url>`: The URL of the new client site repository (must already exist and be empty on GitHub).
- `<client-folder>`: The name of the local folder to create for the client site.

This will:

- Clone the main repo into the specified folder
- Set the main repo as the `upstream` remote
- Set the client repo as the `origin` remote
- Push the initial code to the client repo

### Updating a Client Site with Main Repo Changes

When you want to sync updates from the main repo to a client site:

```bash
cd <client-folder>
git fetch upstream
git merge upstream/main
# Resolve any merge conflicts, then:
git push origin main
```

This workflow gives you full control over when and how updates are applied to each client site, and allows for customizations in each client repo.

See `create-client-site.sh` for more details.

---

## License

This is commercial software. The use of this template is subject to the purchase
of a commercial license. Unauthorized copying, modification, distribution, or use
of this software is strictly prohibited.

### License Terms

- One license per production website
- 12 months of updates and support
- Documentation access
- Private source code access

# Supabase Setup

If you want to use Supabase as your database backend, follow these steps:

## 1. Set Environment Variables

In your `.env.local` file, set:

```
DB_PROVIDER=supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## 2. Supabase Database Setup

### Create the Emails Table in Supabase

You can do this via the Supabase web UI, or run the following SQL in the Supabase SQL Editor:

```sql
create table if not exists allset_emails (
  id bigint generated by default as identity primary key,
  email text unique not null,
  created_at timestamp with time zone default now()
);
```

### Create the Email Template Data Table in Supabase

To store dynamic email template data, create the following table (via the Supabase SQL Editor or web UI):

```sql
create table if not exists allset_email_template_data (
  id bigint generated by default as identity primary key,
  template text not null,
  data text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

- `id`: Primary key
- `template`: Name of the template (required)
- `data`: JSON stringified template data (required)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Create the CTA Configuration Table in Supabase

To store the CTA (Call To Action) configuration for the signup flow, run the following SQL in the Supabase SQL Editor or web UI:

```sql
create table if not exists allset_cta_config (
  id bigint generated by default as identity primary key,
  cta_type text not null, -- 'ebook-delivery', 'newsletter', or 'welcome'
  template_data_id bigint not null references allset_email_template_data(id),
  newsletter_frequency text, -- 'daily', 'weekly', 'monthly' (nullable)
  updated_at timestamp with time zone default now()
);
```

- `id`: Primary key
- `cta_type`: Type of CTA: 'ebook-delivery', 'newsletter', or 'welcome' (required)
- `template_data_id`: Foreign key to `allset_email_template_data(id)` (required)
- `newsletter_frequency`: Frequency for newsletter: 'daily', 'weekly', 'monthly' (nullable/optional)
- `updated_at`: Timestamp when config was last updated

### Create the Contact Submissions Table in Supabase

To store contact form submissions, create the following table (via the Supabase SQL Editor or web UI):

```sql
create table if not exists allset_contact_submissions (
  id bigint generated by default as identity primary key,
  name text,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);
```

- `id`: Primary key
- `name`: Name of the user (optional)
- `email`: Email address (required)
- `message`: Message from the user (required)
- `created_at`: Timestamp of submission

### (Optional) Add RLS Policy for Emails and Contact Submissions

To allow unrestricted access for development, run:

```sql
-- Enable RLS
alter table allset_emails enable row level security;
-- Allow all (development only)
create policy "Allow all" on allset_emails for all using (true);
```

```sql
-- Enable RLS
alter table allset_contact_submissions enable row level security;
-- Allow all (development only)
create policy "Allow all" on allset_contact_submissions for all using (true);
```

For production, restrict access as needed.

---

**Now your project will use Supabase for all email operations!**

If you add more tables, follow this pattern for each new table.

[Purchase a License](https://imzodev.com/purchase)
