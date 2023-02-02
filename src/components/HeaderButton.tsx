import React from 'react'

type HeaderButtonProps = {
  text: string
  icon: string
  href: string
  className: string
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ text, icon, href, className }) => {
  return (
    <a href={href} className={`flex items-center text-xl font-bold ${className}`}>
      <img src={icon} alt="text" className="h-8 pr-1" />
      {text}
    </a>
  )
}

export default HeaderButton
