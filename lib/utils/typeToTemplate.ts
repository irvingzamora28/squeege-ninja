/**
 * Utility functions to convert TypeScript types to template structures
 */
import {
  ProductSaaSLandingContent,
  YouTubeLandingContent,
  PageType,
  ServicesLandingContent,
} from '../../app/allset/landing-content/types'

/**
 * Creates a template object for a Product/SaaS landing page
 */
export const createProductTemplate = (): Partial<ProductSaaSLandingContent> => {
  return {
    pageType: 'product',
    seo: {
      title: 'Product Name - Product Description',
      description: 'SEO description for the product landing page',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
    },
    hero: {
      title: 'Main headline that captures attention',
      description: 'Compelling subheading that explains the value proposition',
      image: '/placeholder.jpg',
      imagePrompt: 'Describe the image for the generator here.',
      primaryCta: {
        text: 'Primary call-to-action button text',
        link: '#',
      },
      secondaryCta: {
        text: 'Secondary call-to-action button text',
        link: '#',
      },
    },
    mainFeatures: {
      title: 'Main Features',
      description: 'Main Features description',
      items: [
        {
          id: 1,
          icon: 'FaBolt',
          title: 'Feature 1 title',
          description: 'Feature 1 description',
          image: '/placeholder.jpg',
          imagePrompt: 'Describe the image for the generator here.',
        },
        {
          id: 2,
          icon: 'FaShieldAlt',
          title: 'Feature 2 title',
          description: 'Feature 2 description',
          image: '/placeholder.jpg',
          imagePrompt: 'Describe the image for the generator here.',
        },
      ],
    },
    features: {
      title: 'Features section title',
      description: 'Features section description',
      items: [
        {
          title: 'Feature 1 title',
          description: 'Feature 1 description',
          icon: 'FiUsers',
        },
        {
          title: 'Feature 2 title',
          description: 'Feature 2 description',
          icon: 'FiSmartphone',
        },
      ],
    },
    cta: {
      title: 'Call to action section title',
      description: 'Call to action section description',
      button: {
        text: 'Call to action button text',
        link: '#',
      },
      collectEmail: true,
    },
    faqs: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our product/service',
      questions: [
        {
          question: 'Question 1?',
          answer: 'Answer to question 1.',
        },
        {
          question: 'Question 2?',
          answer: 'Answer to question 2.',
        },
      ],
    },
    stats: {
      title: 'Stats section title',
      description: 'Stats section description',
      items: [
        {
          value: '98%',
          label: 'User Satisfaction',
        },
        {
          value: '50+',
          label: 'Items',
        },
        {
          value: '50K+',
          label: 'Active Users',
        },
        {
          value: '5M+',
          label: 'Item',
        },
      ],
    },
    pricing: {
      title: 'Pricing Plans',
      description: 'Choose the plan that fits your needs',
      plans: [
        {
          name: 'Basic',
          price: '$9/month',
          description: 'Perfect for individuals',
          features: [{ text: 'Feature 1' }, { text: 'Feature 2' }, { text: 'Feature 3' }],
          cta: {
            text: 'Get Started',
            link: '#',
          },
          highlighted: false,
        },
        {
          name: 'Pro',
          price: '$29/month',
          description: 'For small teams',
          features: [
            { text: 'Feature 1' },
            { text: 'Feature 2' },
            { text: 'Feature 3' },
            { text: 'Feature 4' },
            { text: 'Feature 5' },
          ],
          cta: {
            text: 'Start Free Trial',
            link: '#',
          },
          highlighted: true,
        },
      ],
    },
    contact: {
      title: 'Contact section title',
      description: 'Contact section description',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ],
      submitLabel: 'Submit button text',
      successMessage: 'Success message after form submission',
      contactInfo: {
        title: 'Contact Information',
        phone: { label: 'Phone', number: '', hours: '' },
        email: { label: 'Email', address: '', responseTime: '' },
        location: { label: 'Location', address: ['Address line 1', 'Address line 2'] },
      },
    },
    testimonials: {
      title: 'Testimonials section title',
      description: 'Testimonials section description',
      image: '/placeholder.jpg',
      testimonials: [
        {
          name: 'Client Name',
          title: 'Client Title',
          quote: 'Client testimonial quote.',
          image: '/placeholder.jpg',
          imagePrompt: 'Describe the image for the generator here.',
        },
      ],
    },
  }
}

/**
 * Creates a template object for a YouTube landing page
 */
export const createYouTubeTemplate = (): Partial<YouTubeLandingContent> => {
  return {
    pageType: 'youtube',
    seo: {
      title: 'Channel Name - YouTube Channel',
      description: 'Description of the YouTube channel for SEO purposes',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
    },
    channelInfo: {
      name: 'Channel Name',
      description: 'Detailed description of what the channel is about',
      subscriberCount: '100K',
      profileImage: '/placeholder.jpg',
      bannerImage: '/placeholder.jpg',
      joinDate: 'January 2020',
      totalViews: '5M+',
      links: [
        {
          platform: 'Twitter',
          url: 'https://twitter.com/channelname',
          icon: 'FaTwitter',
        },
        {
          platform: 'Instagram',
          url: 'https://instagram.com/channelname',
          icon: 'FaInstagram',
        },
      ],
    },
    featuredVideos: [
      {
        id: 'video1',
        title: 'Featured Video 1 Title',
        description: 'Description of featured video 1',
        thumbnail: '/placeholder.jpg',
        viewCount: '500K',
        duration: '10:30',
        publishedAt: '3 months ago',
        url: 'https://youtube.com/watch?v=video1',
      },
      {
        id: 'video2',
        title: 'Featured Video 2 Title',
        description: 'Description of featured video 2',
        thumbnail: '/placeholder.jpg',
        viewCount: '350K',
        duration: '15:45',
        publishedAt: '5 months ago',
        url: 'https://youtube.com/watch?v=video2',
      },
    ],
    playlists: [
      {
        id: 'playlist1',
        title: 'Playlist 1 Title',
        description: 'Description of playlist 1',
        videoCount: 15,
        thumbnail: '/placeholder.jpg',
        lastUpdated: '2 weeks ago',
      },
    ],
    cta: {
      subscribeText: 'Subscribe to Channel',
      subscribeLink: 'https://youtube.com/channel/channelid?sub_confirmation=1',
      joinText: 'Become a Member',
      joinLink: 'https://youtube.com/channel/channelid/join',
      socialLinks: [
        {
          platform: 'Patreon',
          url: 'https://patreon.com/channelname',
          icon: 'FaPatreon',
        },
      ],
    },
    about: {
      title: 'About the Channel',
      content: 'Detailed information about the channel, its mission, and the content creator',
      stats: [
        {
          label: 'Videos',
          value: '250+',
        },
        {
          label: 'Joined',
          value: 'January 2020',
        },
      ],
    },
    contact: {
      title: 'Contact section title',
      description: 'Contact section description',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ],
      submitLabel: 'Submit button text',
      successMessage: 'Success message after form submission',
      contactInfo: {
        title: 'Contact Information',
        phone: { label: 'Phone', number: '', hours: '' },
        email: { label: 'Email', address: '', responseTime: '' },
        location: { label: 'Location', address: ['Address line 1', 'Address line 2'] },
      },
    },
  }
}

/**
 * Creates a template object for a services landing page
 *
 **/
export const createServicesTemplate = (): Partial<ServicesLandingContent> => {
  return {
    pageType: 'services',
    hero: {
      title: 'Professional Services for Your Needs',
      description:
        'Expert solutions for dental clinics, mechanics, auto repair shops, and medical clinics.',
      image: '/placeholder.jpg',
      imagePrompt:
        'A modern, clean, and welcoming hero image representing a professional service business.',
      primaryCta: {
        text: 'Get Started',
        link: '#',
      },
      secondaryCta: {
        text: 'Learn More',
        link: '#',
      },
    },
    gallery: {
      title: 'Our Work Gallery',
      description: 'See examples of our recent projects and satisfied clients.',
      images: [
        {
          src: '/placeholder1.jpg',
          alt: 'Gallery image 1',
          caption: 'A bright, professional workspace or successful project outcome.',
          imagePrompt: 'A bright, professional workspace or successful project outcome.',
        },
        {
          src: '/placeholder2.jpg',
          alt: 'Gallery image 2',
          caption: 'Friendly staff assisting a customer in a clean environment.',
          imagePrompt: 'Friendly staff assisting a customer in a clean environment.',
        },
      ],
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive services tailored for your business.',
      items: [
        {
          title: 'Dental Care',
          description: 'Modern dental solutions for clinics.',
          icon: 'FaTooth',
          image: '/service-dental.jpg',
          imagePrompt: 'A dental clinic with modern equipment.',
        },
        {
          title: 'Auto Repair',
          description: 'Reliable repairs for all vehicle types.',
          icon: 'FaCar',
          image: '/service-auto.jpg',
          imagePrompt: 'A mechanic working on a car.',
        },
        {
          title: 'Medical Consulting',
          description: 'Professional support for medical clinics.',
          icon: 'FaStethoscope',
          image: '/service-medical.jpg',
          imagePrompt: 'A doctor consulting with a patient.',
        },
        {
          title: 'General Mechanics',
          description: 'Expert mechanical services for any need.',
          icon: 'FaWrench',
          image: '/service-mechanic.jpg',
          imagePrompt: 'A mechanic using tools in a workshop.',
        },
      ],
    },
    projects: {
      title: 'Recent Projects',
      description: 'Showcasing our successful collaborations.',
      items: [
        {
          title: 'Dental Clinic Revamp',
          description: 'Complete digital transformation for a dental clinic.',
          image: '/placeholder3.jpg',
          imagePrompt: 'A modern dental clinic interior with happy staff.',
          category: 'Dental',
          completionDate: '2024-01-15',
        },
        {
          title: 'Auto Shop Upgrade',
          description: 'Workflow optimization for a busy auto repair shop.',
          image: '/placeholder4.jpg',
          imagePrompt: 'A mechanic working on a car in a clean garage.',
          category: 'Auto Repair',
          completionDate: '2024-03-22',
        },
      ],
    },
    mainFeatures: {
      title: 'Why Choose Us',
      description: 'Key benefits of partnering with our service team.',
      items: [
        {
          id: 1,
          icon: 'FaCheckCircle',
          title: 'Certified Professionals',
          description: 'Our team is fully certified and highly experienced.',
          image: '/placeholder5.jpg',
          imagePrompt: 'A group of professionals with certificates.',
        },
        {
          id: 2,
          icon: 'FaSmile',
          title: 'Customer Satisfaction',
          description: 'We prioritize your satisfaction above all.',
          image: '/placeholder6.jpg',
          imagePrompt: 'A happy customer shaking hands with a service provider.',
        },
      ],
    },
    testimonials: {
      title: 'What Our Clients Say',
      description: 'Hear from our satisfied customers.',
      image: '/testimonials-section.jpg',
      imagePrompt: 'A collage of happy clients from different service industries.',
      testimonials: [
        {
          name: 'Jane Doe',
          quote: 'Outstanding service and support! Our clinic runs smoother than ever.',
          image: '/avatar1.jpg',
          title: 'Dental Clinic Owner',
          imagePrompt: 'A smiling dental clinic owner.',
        },
        {
          name: 'John Smith',
          quote: 'Professional, reliable, and effective solutions.',
          image: '/avatar2.jpg',
          title: 'Auto Repair Shop Manager',
          imagePrompt: 'A happy auto shop manager in a garage.',
        },
      ],
    },
    cta: {
      title: 'Ready to Transform Your Business?',
      description: 'Contact us today to get a personalized consultation.',
      button: {
        text: 'Contact Us',
        link: '#contact',
      },
      collectEmail: true,
    },
    faqs: {
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about our services.',
      questions: [
        {
          question: 'How do I get started?',
          answer: 'Simply contact us using the form below and we will reach out to you promptly.',
        },
        {
          question: 'Do you offer custom solutions?',
          answer: 'Yes, all our services can be tailored to your business needs.',
        },
      ],
    },
    contact: {
      title: 'Contact Us',
      description: 'We are here to help. Reach out for a free consultation.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
      ],
      submitLabel: 'Send Message',
      successMessage: 'Thank you for contacting us! We will get back to you soon.',
      contactInfo: {
        title: 'Contact Information',
        phone: { label: 'Phone', number: '', hours: '' },
        email: { label: 'Email', address: '', responseTime: '' },
        location: { label: 'Location', address: ['Address line 1', 'Address line 2'] },
      },
    },
  }
}

/**
 * Creates a template object for a given page type
 */
export const createTemplateForPageType = (pageType: PageType) => {
  switch (pageType) {
    case 'services':
      return createServicesTemplate()
    case 'youtube':
      return createYouTubeTemplate()
    case 'product':
    default:
      return createProductTemplate()
  }
}

/**
 * Converts a template object to a formatted JSON string with image prompt comments
 */
export const templateToString = (template: object): string => {
  // Add image prompt comments to the stringified JSON
  const jsonString = JSON.stringify(template, null, 2)

  // Add a comment about image prompts
  return jsonString.replace(
    /"imagePrompt": "([^"]*)"/g,
    '"imagePrompt": "$1" // This will be used to generate an AI image'
  )
}

/**
 * Gets a template string for a given page type
 */
export const getTemplateStringForPageType = (pageType: PageType): string => {
  const template = createTemplateForPageType(pageType)
  return templateToString(template)
}
