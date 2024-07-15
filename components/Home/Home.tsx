'use client';
import { useReactiveVar } from '@apollo/client';
import { accountVar } from '@app/app/cache';

const Home = () => {
  const account = useReactiveVar(accountVar);

  return (
    <div>
      <div>publicKey: {account && <p>{account.publicKey.toBase58()}</p>}</div>
      <div>
        secretKey:{' '}
        {account && (
          <>
            <span>[</span>
            <p>
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
