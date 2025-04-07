import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import landingDemoImage from '../public/static/images/landing-demo.jpeg'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col-reverse items-center justify-between py-16 md:py-24 lg:flex-row">
        <div className="space-y-6 lg:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 md:text-6xl dark:text-slate-200">
            AI-Powered Landing Pages <span className="text-primary-500">in Minutes</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl dark:text-gray-400">
            Generate compelling content and SEO-optimized landing pages with minimal effort. Powered
            by advanced AI to help you stand out.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg"
            >
              Try Demo
            </Link>
            <Link
              href="/docs"
              className="text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-300 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium md:px-8 md:py-4 md:text-lg dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Documentation
            </Link>
          </div>
        </div>
        <div className="mb-10 lg:mb-0 lg:w-1/2">
          <div className="relative">
            <div className="w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src={landingDemoImage}
                alt="AI Landing Page Generator Demo"
                width={1024}
                height={576}
                className="h-auto w-full"
              />
            </div>
            <div className="bg-primary-500/10 absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-2xl" />
            <div className="bg-primary-500/10 absolute -top-4 -left-4 h-24 w-24 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Everything You Need to Launch Fast</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg dark:border-gray-700"
            >
              <div className="bg-primary-100 mb-4 flex h-10 w-10 items-center justify-center rounded-full dark:bg-gray-800">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Latest Updates</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg dark:border-gray-700"
              >
                <div className="flex-1 p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <h2 className="mb-2 text-xl font-bold">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-slate-800 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">{summary}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/blog"
              className="hover:border-primary-500 dark:hover:border-primary-500 inline-flex items-center rounded-md border border-gray-200 px-6 py-3 dark:border-gray-700"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 rounded-2xl px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-800/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Create Your Landing Page?</h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Join thousands of businesses using our AI-powered platform to create compelling content.
          </p>
          <Link
            href="/signup"
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center rounded-md border border-transparent px-8 py-4 text-base font-medium text-white"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <div className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
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
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'SEO Optimization',
    description: 'Automatically optimize your content for search engines to improve visibility.',
    icon: (
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    ),
  },
  {
    title: 'Responsive Design',
    description: 'Beautiful, mobile-first designs that look great on any device.',
    icon: (
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Custom Templates',
    description: 'Choose from professionally designed templates or create your own.',
    icon: (
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: 'Analytics Integration',
    description: 'Track performance with built-in analytics and optimization tools.',
    icon: (
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: 'Fast Deployment',
    description: 'Deploy your landing page instantly with our cloud infrastructure.',
    icon: (
      <svg
        className="text-primary-500 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
]
