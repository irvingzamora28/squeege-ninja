// No need to import blog data as Main/Main2 handle their own data fetching
import Main from './Main'
import Main2 from './Main2'
import Main3 from './Main3'
import { getSiteConfig } from '../lib/config'

export default async function Page() {
  // We don't need to pass posts to Main/Main2 as they handle their own data fetching

  // Get the active template from config
  const config = await getSiteConfig()
  const activeTemplate = config.activeTemplate

  // Return the appropriate template based on the active template
  if (activeTemplate === 'Main2') {
    return <Main2 />
  }

  if (activeTemplate === 'Main3') {
    return <Main3 />
  }

  // Default to Main
  return <Main />
}
