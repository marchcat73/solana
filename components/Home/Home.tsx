'use client';
import cn from 'classnames';
import { useReactiveVar } from '@apollo/client';
import { accountVar } from '@app/app/cache';
import styles from './Home.module.css';

const Home = () => {
  const account = useReactiveVar(accountVar);

  return (
    <div className={cn(styles.home)}>
      <div className="my-2">
        publicKey:{' '}
        {account && (
          <p className={styles.secret}>{account.publicKey.toBase58()}</p>
        )}
      </div>
      <div className="my-2">
        secretKey:{' '}
        {account && (
          <>
            <span>[</span>
            <p className={styles.secret}>
              {Array.from(account.secretKey).map((el, index, array) => {
                if (index === array.length - 1) {
                  return <span key={`${el}-${index}`}>{el}</span>;
                } else {
                  return <span key={`${el}-${index}`}>{el},</span>;
                }
              })}
            </p>
            <span>]</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
