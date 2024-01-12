import { ClassValue } from 'clsx';
import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

//IconFlat Btn
export interface IconFlatButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: IconType | LucideIcon;
  iconClassName?: ClassValue;
}
