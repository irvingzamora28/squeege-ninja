// Centralized icon map for use throughout the project
import { SVGProps } from 'react'
import {
  HiOutlineBolt,
  HiOutlineMagnifyingGlass,
  HiOutlineDevicePhoneMobile,
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2'
import { FaMagic, FaBars } from 'react-icons/fa'
import {
  FiUsers,
  FiSmartphone,
  FiLock,
  FiTrendingUp,
  FiList,
  FiClock,
  FiBarChart2,
  FiSearch,
  FiTag,
  FiCompass,
  FiPercent,
  FiMapPin,
  FiCpu,
  FiLayout,
  FiCalendar,
  FiHeadphones,
  FiMonitor,
  FiEdit,
} from 'react-icons/fi'

export const iconMap: Record<string, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  HiOutlineBolt,
  HiOutlineMagnifyingGlass,
  HiOutlineDevicePhoneMobile,
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineRocketLaunch,
  FiUsers,
  FiSmartphone,
  FiLock,
  FiTrendingUp,
  FiList,
  FiClock,
  FiBarChart2,
  FiSearch,
  FiTag,
  FiCompass,
  FiPercent,
  FiMapPin,
  FiCpu,
  FiLayout,
  FiCalendar,
  FiHeadphones,
  FiMonitor,
  FiEdit,
  FaMagic,
  FaBars,
}

export function getIconComponent(icon: string) {
  return iconMap[icon]
}
