export interface HeaderNavigationConfig {
  includeTitles?: string[]
  excludeTitles?: string[]
}

export interface NavigationConfig {
  header?: HeaderNavigationConfig
}

export interface TemplateDescriptor {
  id: string
  name: string
  description: string
  image: string
  elements?: string[]
  animations?: string[]
  colors: string
}

export interface SiteConfig {
  activeTemplate: string
  availableTemplates: TemplateDescriptor[]
  navigation?: NavigationConfig
}
