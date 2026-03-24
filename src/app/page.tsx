import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-svh w-screen flex-col items-center justify-center bg-zinc-950 text-zinc-300 sm:min-h-screen">
      <h1 className="mb-8 font-mono text-4xl font-medium text-green-500 sm:mb-10 sm:text-5xl">
        {'<'}LukePerich{' />'}
      </h1>
      <div className="bg-opacity-80 w-full border-y border-y-zinc-800 bg-zinc-900 p-5 shadow-md sm:w-auto sm:max-w-125 sm:rounded-lg sm:border sm:border-zinc-800">
        <div className="m-auto max-w-125 text-center">
          <p className="mb-3 sm:mb-0">
            <span className="block text-green-500 sm:inline">Good news! </span>
            I&apos;m building something cool to go here.
          </p>
          <p>
            <span className="block text-amber-600 sm:inline">Bad news... </span>
            It&apos;s not quite ready yet.
          </p>
          <p className="mt-5">
            In the meantime, check out my profile on{' '}
            <a
              href="https://www.linkedin.com/in/luke-perich/"
              target="_blank"
              className="font-semibold whitespace-nowrap text-[#409bc9]"
            >
              <Image
                src="images/icons/linkedin.svg"
                alt=""
                width={12}
                height={12}
                className="mr-1 mb-1 ml-0.75 inline"
              />
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
