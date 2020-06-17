import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </p>
    </>
  );
}