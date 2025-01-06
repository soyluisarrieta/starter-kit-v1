import { IoCloseOutline, IoNotificationsOutline, IoHelpBuoyOutline, IoNotifications } from 'react-icons/io5'
import { FaRegEyeSlash, FaRegEye, FaXTwitter, FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { TbHistoryToggle, TbLicense } from 'react-icons/tb'
import { BiLogoGoogle } from 'react-icons/bi'
import { BsFacebook, BsGithub } from 'react-icons/bs'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { PiCalendarBlank, PiCaretDoubleLeftBold, PiCaretLeft, PiMoonStarsDuotone, PiProjectorScreenChart, PiSunDimDuotone } from 'react-icons/pi'
import { LiaAsteriskSolid } from 'react-icons/lia'
import { FaUndo, FaUser } from 'react-icons/fa'
import { FiLogIn, FiLogOut, FiMoreVertical, FiSettings } from 'react-icons/fi'
import { type IconBaseProps, type IconType } from 'react-icons/lib'

export const icons = {
  // Commons
  Home: AiOutlineHome,
  User: AiOutlineUser,
  UserSolid: FaUser,
  Historical: TbHistoryToggle,
  Calendar: PiCalendarBlank,
  Settings: FiSettings,
  Asterisc: LiaAsteriskSolid,
  Help: IoHelpBuoyOutline,
  ChangeLog: TbLicense,
  DotsVertical: FiMoreVertical,
  DotsHorizontal: FiMoreVertical,

  // Actions
  Reset: FaUndo,
  Login: FiLogIn,
  Logout: FiLogOut,
  Close: IoCloseOutline,
  Back: PiCaretLeft,

  // Toggle
  Eye: { Open: FaRegEyeSlash, Close: FaRegEye },
  ThemeMode: { Dark: PiMoonStarsDuotone, Light: PiSunDimDuotone },
  ArrowTrend: { Up: FaArrowTrendUp, Down: FaArrowTrendDown },
  Notifications: { solid: IoNotifications, outline: IoNotificationsOutline },

  // Brands
  Google: BiLogoGoogle,
  Facebook: BsFacebook,
  Github: BsGithub,
  Twitter: FaXTwitter,

  // Others
  Caret: PiCaretLeft,
  CaretDouble: PiCaretDoubleLeftBold,
  AnaliticPanel: PiProjectorScreenChart
}

export interface IconProps extends IconBaseProps {
  element: IconType | { solid?: IconType, outline?: IconType }
  variant?: 'solid' | 'outline'
}

export const Icon = ({ element, variant, ...rest }: IconProps): JSX.Element | null => {
  const IconToRender = typeof element === 'object'
    ? element[variant ?? 'solid']
    : element
  return !IconToRender ? null : <IconToRender {...rest} />
}

export const SVGCustomIcon = ({ size, style, children, ...props }: IconBaseProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size ?? '1em'}
    height={size ?? '1em'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="currentColor"
    style={{ overflow: 'visible', ...style }}
    {...props}
  >
    {children}
  </svg>
)
