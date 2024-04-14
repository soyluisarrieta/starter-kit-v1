import { IoCloseOutline, IoNotificationsOutline, IoCameraOutline, IoHelpBuoyOutline, IoNotifications } from 'react-icons/io5'
import { FaRegEyeSlash, FaRegEye, FaXTwitter } from 'react-icons/fa6'
import { TbHistoryToggle, TbLicense } from 'react-icons/tb'
import { BiLogoGoogle } from 'react-icons/bi'
import { BsFacebook, BsGithub, BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineLine } from 'react-icons/ai'
import { PiCalendarBlank, PiCaretDoubleLeftBold, PiHandshakeDuotone, PiMoonStarsDuotone, PiProjectorScreenChart, PiSunDimDuotone } from 'react-icons/pi'
import { LiaAsteriskSolid } from 'react-icons/lia'
import { FaUser } from 'react-icons/fa'
import { GridCustomIcon } from '@/components/icons/Sidebar'
import { FiLogIn, FiLogOut, FiSettings } from 'react-icons/fi'
import { type IconBaseProps, type IconType } from 'react-icons/lib'

export const icons = {
  // Commons
  Home: { ...GridCustomIcon },
  User: AiOutlineUser,
  UserSolid: FaUser,
  Close: IoCloseOutline,
  Historical: TbHistoryToggle,
  Notifications: { solid: IoNotifications, outline: IoNotificationsOutline },
  Calendar: PiCalendarBlank,
  Settings: FiSettings,
  Asterisc: LiaAsteriskSolid,
  Help: IoHelpBuoyOutline,
  ChangeLog: TbLicense,
  Login: FiLogIn,
  Logout: FiLogOut,

  // Toggle
  Eye: { Open: FaRegEyeSlash, Close: FaRegEye },
  ThemeMode: { Dark: PiMoonStarsDuotone, Light: PiSunDimDuotone },

  // Brands
  Google: BiLogoGoogle,
  Facebook: BsFacebook,
  Github: BsGithub,
  Twitter: FaXTwitter,

  // Others
  Line: AiOutlineLine,
  Handshake: PiHandshakeDuotone,
  Camera: IoCameraOutline,
  ShieldAuthSolid: BsShieldLockFill,
  CaretDouble: PiCaretDoubleLeftBold,
  AnaliticPanel: PiProjectorScreenChart
}

interface IconProps extends IconBaseProps {
  element: IconType | { solid?: IconType, outline?: IconType }
  variant?: 'solid' | 'outline'
}

export const Icon = ({ element, variant, ...rest }: IconProps): JSX.Element | null => {
  const IconToRender = typeof element === 'object'
    ? element[variant ?? 'solid']
    : element
  return !IconToRender ? null : <IconToRender {...rest} />
}

export const SVGCustomIcon = ({ size, color, style, children, ...props }: IconBaseProps): JSX.Element => (
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
