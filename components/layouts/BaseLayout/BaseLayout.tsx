import cn from 'classnames';
import { Navbar } from '@app/components';
import { BaseLayoutProps } from './BaseLayout.props';
import styles from './BaseLayout.module.css';

const BaseLayout = ({
  children,
  className,
  ...props
}: BaseLayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.baseLayout, className)} {...props}>
      <Navbar className={styles.header} />
      <main
        className={cn(
          'flex min-h-screen flex-col items-center justify-between p-24',
          styles.body,
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;