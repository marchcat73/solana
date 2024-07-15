'use client';
import React, { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import cn from 'classnames';
import {
  Connection,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { balanceVar, publicKeyVar, accountVar } from '@app/app/cache';
import styles from './Transaction.module.css';

const schema = z.object({
  cost: z.string().min(1),
  address: z.string().min(44).max(44),
});

const TransactionForm = () => {
  const [costError, setCostError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const balance = useReactiveVar(balanceVar);
  const publicKey = useReactiveVar(publicKeyVar);
  const account = useReactiveVar(accountVar);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<any>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const connection = new Connection('http://localhost:8899', 'finalized');

  const onSubmit = async (data: { cost: string; address: string }) => {
    setIsLoading(true);
    const { cost, address } = data;
    const resiveValue = Number(cost);
    if (Number.isNaN(resiveValue)) {
      setCostError('Cost not Number');
      return;
    } else if (resiveValue > balance) {
      setCostError('Insufficient balance');
      return;
    } else if (publicKey === address) {
      setCostError('You are trying to send money to yourself');
      return;
    } else {
      setCostError(null);
    }

    const publicKeyTo = new PublicKey(address);

    if (account) {
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: account.publicKey,
        toPubkey: publicKeyTo,
        lamports: resiveValue * LAMPORTS_PER_SOL, // Convert transferAmount to lamports
      });

      const transaction = new Transaction().add(transferInstruction);
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [account],
      );

      setSignature(signature);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(styles.transaction)}>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="cost"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cost
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">SOL</span>
            </div>
            <input
              type="text"
              {...register('cost')}
              id="cost"
              className="block w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>SOL</option>
              </select>
            </div>
          </div>
          {errors && (
            <p className={styles.errorMessage}>
              {(errors.cost && errors.cost.message)?.toString()}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              {...register('address')}
              id="address"
              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="address"
            />
          </div>
          {errors && (
            <p className={styles.errorMessage}>
              {(errors.address && errors.address.message)?.toString()}
            </p>
          )}
        </div>
        {isLoading ? (
          <p className={cn('mt-6')}>Loading...</p>
        ) : (
          <button
            type="submit"
            className={cn(
              'block rounded-md p-1.5 mt-6 ring-1 ring-inset ring-gray-300 text-sm font-medium',
            )}
            disabled={isLoading}
          >
            Submit
          </button>
        )}
      </form>
      <div>
        {costError && <p className={styles.errorMessage}>{costError}</p>}
      </div>
      <div className="mt-4">
        {signature && (
          <p className={styles.signature}>Transaction signature: {signature}</p>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
