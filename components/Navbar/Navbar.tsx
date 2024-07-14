/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { NavbarProps } from './Navbar.props';
import styles from './Navbar.module.css';

export default function Navbar({ className }: NavbarProps) {
  return <nav className={cn('bg-gray-800', styles.navbar, className)}>1</nav>;
}
