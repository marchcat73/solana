'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import cn from 'classnames';
import { balanceVar } from '@app/app/cache';
import { NavbarProps } from './Navbar.props';
import styles from './Navbar.module.css';

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const balance = useReactiveVar(balanceVar);
  return (
    <nav
      className={cn(
        'bg-gray-800 flex items-center justify-between',
        styles.navbar,
        className,
      )}
    >
      <div className="text-white pl-3">
        {pathname !== '/' ? (
          <Link href="/">Home</Link>
        ) : (
          <button>Create Wallet</button>
        )}
      </div>
      <div className="text-white pr-3">Balance: {balance} SOL</div>
    </nav>
  );
}
