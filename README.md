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

## License

This is commercial software. The use of this template is subject to the purchase
of a commercial license. Unauthorized copying, modification, distribution, or use
of this software is strictly prohibited.

### License Terms
- One license per production website
- 12 months of updates and support
- Documentation access
- Private source code access

[Purchase a License](https://imzodev.com/purchase)
