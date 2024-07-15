'use client';
import { useReactiveVar } from '@apollo/client';
import { accountVar } from '@app/app/cache';

const Home = () => {
  const account = useReactiveVar(accountVar);
  return (
    <div>
      <div>publicKey: {account && <p>{account.publicKey.toBase58()}</p>}</div>
      <div>secretKey: {account && <p>{account.secretKey}</p>}</div>
    </div>
  );
};

export default Home;
