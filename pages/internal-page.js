import Link from 'next/link';
import BasicContentArea from 'components/basic-content';

export default function FirstPost() {
  return (
    <BasicContentArea title="Internal Page">

      <h1>Internal Page</h1>
      <p>
        Example internal page.
      </p>

      <Link href="/">
        <a className="button">Back to home</a>
      </Link>

    </BasicContentArea>
  );
}