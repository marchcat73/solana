This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Установка локального кластера Solana: [https://solana.com/ru/developers/guides/getstarted/setup-local-development](https://solana.com/ru/developers/guides/getstarted/setup-local-development)

В отдельном окне терминала запускаем кластер

```bash
solana-test-validator
```

Устанавливаем зависимости проекта

```bash
npm i
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Для продакшен:

```bash
npm run build
npm run start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

На главной странице кошелька в верхнем левом углу по кнопке, создаем кошелек.
Копируем publicKey - это и есть адрес вашего кошелька.
secretKey предназначен для импорта кошелька в Phantom, либо для сохранения в файловый кошелек в файле .json

Пополняем кошелек через терминал:

```bash
solana airdrop 5 <publicKey> --url localhost

```

Через минуту в правом верхнем углу можно увидеть изменение баланса.

Через терминал создаем еще один тестовый кошелек

```bash
solana-keygen new
```

Сохраняем его publicKey где нибуть в текстовом файле.
