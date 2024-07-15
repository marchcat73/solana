/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useReactiveVar } from '@apollo/client';
import cn from 'classnames';
import { balanceVar, publicKeyVar, accountVar } from '@app/app/cache';
import { NavbarProps } from './Navbar.props';
import styles from './Navbar.module.css';

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const balance = useReactiveVar(balanceVar);
  const account = useReactiveVar(accountVar);
  const connection = new Connection('http://localhost:8899', 'confirmed');

  const checkIsConnected = async () => {
    try {
      // const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

      const slot = await connection.getSlot();

      if (slot) {
        const account = Keypair.generate();
        accountVar(account);
        publicKeyVar(account.publicKey.toBase58());
        if (account.publicKey) {
          const stakeBalance = await connection.getBalance(account.publicKey);
          balanceVar(stakeBalance / LAMPORTS_PER_SOL);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async () => {
    try {
      const slot = await connection.getSlot();

      if (slot) {
        if (account) {
          const stakeBalance = await connection.getBalance(account.publicKey);
          const balance = stakeBalance / LAMPORTS_PER_SOL;
          balanceVar(balance);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // setInterval(() => getBalance(), 1000);

  const ws = new WebSocket('ws://127.0.0.1:8900');

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'accountSubscribe',
        params: [
          account?.publicKey,
          {
            encoding: 'base64',
            commitment: 'finalized',
          },
        ],
      }),
    );
  };

  ws.onmessage = (event) => {
    try {
      const buffer = event.data;
      console.info(buffer);
    } catch (e) {
      console.error(e);
    }
  };

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
          <button onClick={() => checkIsConnected()}>Create Wallet</button>
        )}
      </div>
      <div className="text-white pr-3">Balance: {balance} SOL</div>
    </nav>
  );
}
