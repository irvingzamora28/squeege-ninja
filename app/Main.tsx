import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-16 md:py-24">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            AI-Powered Landing Pages{' '}
            <span className="text-primary-500">in Minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Generate compelling content and SEO-optimized landing pages with minimal effort. 
            Powered by advanced AI to help you stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-8"
            >
              Try Demo
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-300 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-8"
            >
              Documentation
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="relative">
            <div className="w-full rounded-lg shadow-xl overflow-hidden">
              <img
                src="/static/images/landing-demo.png"
                alt="AI Landing Page Generator Demo"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Launch Fast
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Latest Updates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{summary}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary-500 dark:hover:border-primary-500"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-gray-800/50 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Landing Page?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of businesses using our AI-powered platform to create compelling content.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <div className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Get the latest updates and tips for creating better landing pages.
            </p>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const features = [
  {
    title: 'AI Content Generation',
    description: 'Generate compelling copy and content tailored to your business with advanced AI.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'SEO Optimization',
    description: 'Automatically optimize your content for search engines to improve visibility.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
  },
  {
    title: 'Responsive Design',
    description: 'Beautiful, mobile-first designs that look great on any device.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Custom Templates',
    description: 'Choose from professionally designed templates or create your own.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Analytics Integration',
    description: 'Track performance with built-in analytics and optimization tools.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Fast Deployment',
    description: 'Deploy your landing page instantly with our cloud infrastructure.',
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]
