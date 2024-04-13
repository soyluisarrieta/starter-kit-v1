import { IoCloseOutline, IoNotificationsOutline, IoTimeOutline, IoCameraOutline, IoHelpCircleOutline, IoGrid, IoGridOutline } from 'react-icons/io5'
import { FaRegEyeSlash, FaRegEye, FaXTwitter } from 'react-icons/fa6'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { BiLogoGoogle } from 'react-icons/bi'
import { BsFacebook, BsGithub, BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineLine } from 'react-icons/ai'
import { PiCalendarBlank, PiHandshakeDuotone } from 'react-icons/pi'
import { VscSettings } from 'react-icons/vsc'
import { LiaAsteriskSolid } from 'react-icons/lia'
import { FaUser } from 'react-icons/fa'
import { type IconBaseProps, type IconType } from 'react-icons/lib'

interface IconProps extends IconBaseProps {
  component: IconType | { solid?: IconType, outline?: IconType }
  variant?: 'solid' | 'outline'
}

export const Icon = ({ component, variant, ...rest }: IconProps): JSX.Element | null => {
  const IconToRender = typeof component === 'object'
    ? component[variant ?? 'solid']
    : component
  return !IconToRender ? null : <IconToRender {...rest} />
}

export const Icons = {
  // Commons
  Home: { solid: IoGrid, outline: IoGridOutline },
  User: AiOutlineUser,
  UserSolid: FaUser,
  Close: IoCloseOutline,
  Historical: IoTimeOutline,
  Notifications: IoNotificationsOutline,
  Calendar: PiCalendarBlank,
  Settings: VscSettings,
  Asterisc: LiaAsteriskSolid,
  Help: IoHelpCircleOutline,

  // Toggle
  Eye: { Open: FaRegEyeSlash, Close: FaRegEye },
  Sidebar: { Collapse: TbLayoutSidebarLeftCollapse, Expand: TbLayoutSidebarLeftExpand },
  ThemeMode: { Dark: MdOutlineDarkMode, Light: MdOutlineLightMode },

  // Brands
  Google: BiLogoGoogle,
  Facebook: BsFacebook,
  Github: BsGithub,
  Twitter: FaXTwitter,

  // Others
  Line: AiOutlineLine,
  Handshake: PiHandshakeDuotone,
  Camera: IoCameraOutline,
  ShieldAuthSolid: BsShieldLockFill
}
