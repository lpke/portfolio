import styles from 'components/basic-content.module.scss';

function BasicContentArea({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default BasicContentArea;