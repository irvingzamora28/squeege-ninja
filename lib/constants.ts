// Centralized constants for database configuration

export const SQLITE_DB_NAME = 'allset.sqlite'
export const SQLITE_DB_DIR = 'database'
export const SQLITE_DB_PATH = `${SQLITE_DB_DIR}/${SQLITE_DB_NAME}`
export const SQLITE_SCHEMA_FILE = `${SQLITE_DB_DIR}/schema.sql`

export const ALLSET_EMAILS_TABLE = 'allset_emails'
export const CONTACT_SUBMISSIONS_TABLE = 'allset_contact_submissions'
export const ALLSET_EMAIL_TEMPLATE_DATA_TABLE = 'allset_email_template_data'
export const ALLSET_CTA_CONFIG_TABLE = 'allset_cta_config'
export const LANDING_CONTENT_PROMPT = `
You are a professional landing page content creator. Your task is to create content for a landing page based on the user's description of their business or SaaS product.

Generate a complete JSON object that follows this structure:
// IMPORTANT: For every object in the JSON that contains an "image" field, also include an "imagePrompt" field with a detailed description of what the image should depict. This description will be used as a prompt for an AI image generator.
{
  "hero": {
    "title": "Main headline that captures attention",
    "image": "/placeholder.jpg",
    "imagePrompt": "Describe the image for the generator here.",
    "description": "Compelling subheading that explains the value proposition",
    "primaryCta": {
      "text": "Primary call-to-action button text",
      "link": "#"
    },
    "secondaryCta": {
      "text": "Secondary call-to-action button text",
      "link": "#"
    }
  },
  "services": {
    "title": "Services section title",
    "description": "Services section description",
    "items": [
    {
      "title": "Service 1 title",
      "description": "Service 1 description",
      "icon": "FaIndustry",
      "image": "/placeholder.jpg",
      "imagePrompt": "Describe the image for the generator here."
    },
    {
      "title": "Service 2 title",
      "description": "Service 2 description",
      "icon": "FaTools",
      "image": "/placeholder.jpg",
      "imagePrompt": "Describe the image for the generator here."
    }
  ] },
  "projects": {
    "title": "Projects section title",
    "description": "Projects section description",
    "items": [
      {
        "title": "Project 1 title",
        "description": "Project 1 description",
        "image": "/placeholder.jpg",
        "imagePrompt": "Describe the image for the generator here.",
        "category": "Category",
        "completionDate": "Month Year"
      }
    ]
  },
  "mainFeatures": {
    "title": "Main Features",
    "description": "Main Features description",
    "items": [
    {
      "id": 1,
      "icon": "FaBolt",
      "title": "Feature 1 title",
      "description": "Feature 1 description",
      "image": "/placeholder.jpg",
      "imagePrompt": "Describe the image for the generator here."
    },
    {
      "id": 2,
      "icon": "FaShieldAlt",
      "title": "Feature 2 title",
      "description": "Feature 2 description",
      "image": "/placeholder.jpg",
      "imagePrompt": "Describe the image for the generator here."
    },
    {
      "id": 3,
      "icon": "FaClock",
      "title": "Feature 3 title",
      "description": "Feature 3 description",
      "image": "/placeholder.jpg",
      "imagePrompt": "Describe the image for the generator here."
    }
  ]},
  "features": {
    "title": "Features section title",
    "description": "Features section description",
    "items": [
      {
        "title": "Feature 1 title",
        "description": "Feature 1 description",
        "icon": "FiUsers"
      },
      {
        "title": "Feature 2 title",
        "description": "Feature 2 description",
        "icon": "FiSmartphone"
      }
    ]
  },
  "cta": {
    "title": "Call to action section title",
    "description": "Call to action section description",
    "button": {
      "text": "Call to action button text",
      "link": "#"
    },
    "collectEmail": true
  },
  "stats": {
    "title": "Stats section title",
    "description": "Stats section description",
    "items": [
      {
        "value": "98%",
        "label": "User Satisfaction"
      },
      {
        "value": "50+",
        "label": "Items"
      },
      {
        "value": "50K+",
        "label": "Active Users"
      },
      {
        "value": "5M+",
        "label": "Item"
      }
    ]
  },
  "faqs": {
    "title": "Frequently Asked Questions",
    "description": "Common questions about our product",
    "questions": [
      {
        "question": "Question 1",
        "answer": "Answer 1"
      },
      {
        "question": "Question 2",
        "answer": "Answer 2"
      },
      {
        "question": "Question 3",
        "answer": "Answer 3"
      },
      {
        "question": "Question 4",
        "answer": "Answer 4"
      },
      {
        "question": "Question 5",
        "answer": "Answer 5"
      }
    ]
  },
  "gallery": {
    "title": "Gallery section title",
    "description": "Gallery section description",
    "images": [
      {
        "src": "/placeholder.jpg",
        "imagePrompt": "Describe the image for the generator here.",
        "alt": "Image alt text",
        "caption": "Image caption"
      }
    ]
  },
  "pricing": {
    "title": "Pricing Plans",
    "description": "Choose the plan that fits your needs",
    "plans": [
      {
        "name": "Basic",
        "price": "$9/month",
        "description": "Perfect for individuals",
        "features": [
          { "text": "Feature 1" },
          { "text": "Feature 2" },
          { "text": "Feature 3" }
        ],
        "cta": {
          "text": "Get Started",
          "link": "#"
        }
      },
      {
        "name": "Pro",
        "price": "$29/month",
        "description": "Ideal for small teams",
        "features": [
          { "text": "All Basic features" },
          { "text": "Feature 4" },
          { "text": "Feature 5" },
          { "text": "Feature 6" }
        ],
        "cta": {
          "text": "Get Started",
          "link": "#"
        },
        "highlighted": true
      },
      {
        "name": "Enterprise",
        "price": "Contact us",
        "description": "For large organizations",
        "features": [
          { "text": "All Pro features" },
          { "text": "Feature 7" },
          { "text": "Feature 8" },
          { "text": "Feature 9" }
        ],
        "cta": {
          "text": "Contact Sales",
          "link": "#"
        }
      }
    ]
  },
  "contact": {
    "title": "Contact section title",
    "description": "Contact section description",
    "fields": [
      { "name": "name", "label": "Name", "type": "text", "required": true },
      { "name": "email", "label": "Email", "type": "email", "required": true }
    ],
    "submitLabel": "Submit button text",
    "successMessage": "Success message after form submission",
    "contactInfo": {
      "title": "Contact Information",
      "phone": { "label": "Phone", "number": "", "hours": "" },
      "email": { "label": "Email", "address": "", "responseTime": "" },
      "location": { "label": "Location", "address": ["Address line 1", "Address line 2"] }
    }
  },
  "testimonials": {
    "title": "Testimonials section title",
    "description": "Testimonials section description",
    "image": "/placeholder.jpg",
    "testimonials": [
      {
        "name": "Client Name",
        "title": "Client Title",
        "quote": "Client testimonial quote."
      }
    ]
  }
}

Based on the user's description, create a compelling and relevant landing page content. Make sure to:
1. Use the business name in the hero title
2. Highlight the main value proposition in the hero description
3. Create relevant feature titles and descriptions
4. Generate realistic FAQs that potential customers might ask
5. Adjust pricing plans to match the business model
6. Use appropriate icons (use react-icons names like FiUsers, FiLayers, etc.)

Return ONLY the JSON object without any additional text or explanation.

User's business description:
`

// Prompt for generating SEO blog titles
export const BLOG_TITLES_PROMPT = `
You are an expert SEO content strategist. Your task is to generate 5 blog post titles that would attract traffic to a website based on the provided landing page content.

The titles should:
1. Be SEO-optimized with relevant keywords
2. Be compelling and clickable
3. Address pain points or interests of the target audience
4. Be relevant to the business/product described in the landing page
5. Include a mix of how-to guides, listicles, and problem-solving content

For each blog post, also generate 3-5 relevant tags that would help with SEO and content organization. Tags should be single words or short phrases that accurately categorize the content.

Return the results as a JSON array with the following structure:
[
  {
    "title": "Blog Post Title 1",
    "description": "Brief 1-2 sentence description of what this blog post would cover",
    "tags": ["tag1", "tag2", "tag3", "tag4"]
  },
  {...}
]

Landing page content:
`
export const BLOG_CONTENT_PROMPT = `
You are an expert SEO content writer. Your task is to create a comprehensive, engaging, and SEO-optimized blog post based on the provided title and description.

The blog post should:
1. Be well-structured with clear headings and subheadings (using Markdown # for h1, ## for h2, ### for h3)
2. Include an engaging introduction that hooks the reader
3. Provide valuable, actionable information throughout the content
4. Use a mix of paragraphs, bullet points, and numbered lists for better readability
5. Include at least one table where appropriate (using Markdown table syntax)
6. Reference at least 2-3 other blog posts from the site for internal linking (I'll provide some existing posts)
7. Include suggestions for 2-3 external resources or references
8. Have a clear conclusion with a call to action
9. Be optimized for SEO with appropriate keyword usage
10. Be between 1000-1500 words in length
11. Use a conversational yet professional tone

Existing blog posts for internal linking:
{{existingPosts}}

IMPORTANT: Return a JSON object with the following fields:
- "content": The full Markdown blog post as a string (do NOT wrap it in another object or add extra fields)
- "coverImagePrompt": A detailed, vivid description for a hero image that would visually represent the blog post. The prompt should be creative, relevant to the blog title and description, and suitable for AI image generation (e.g., "A modern digital illustration of a robot writing a blog post on a laptop, vibrant colors, futuristic office, digital art").
- "inlineImagePrompts": An array of 2-3 objects. Each object should have:
    - "prompt": A vivid, relevant image description for a section of the blog.
    - "section": The exact heading (or a short excerpt of the paragraph) where the image should be inserted. Use the actual markdown heading or a unique phrase from the blog content.

Example output:
{
  "content": "# Blog Title\n\n## AI for Landing Pages\n...\n## Results\n...",
  "coverImagePrompt": "A modern digital illustration of...",
  "inlineImagePrompts": [
    {
      "prompt": "A close-up of a person designing a landing page on a tablet, digital art, bright colors.",
      "section": "## AI for Landing Pages"
    },
    {
      "prompt": "A graph showing increased conversions after using AI, digital art, blue and green palette.",
      "section": "## Results"
    }
  ]
}

Title: {{title}}
Description: {{description}}
`
