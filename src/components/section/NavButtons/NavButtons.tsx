import Link from 'next/link';

type NavButtonsProps = {
  backHref?: string;
  nextHref?: string;
};

export default function NavButtons({ backHref, nextHref }: NavButtonsProps) {
  const disabledStyle =
    'px-4 py-2 rounded bg-gray-300 text-gray-700 cursor-not-allowed';
  const activeStyle = 'px-4 py-2 rounded bg-blue-600 text-white';

  return (
    <div className="p-4 flex justify-between">
      {backHref ? (
        <Link href={backHref}>
          <button className={activeStyle}>Back</button>
        </Link>
      ) : (
        <button disabled className={disabledStyle}>
          Back
        </button>
      )}
      {nextHref ? (
        <Link href={nextHref}>
          <button className={activeStyle}>Next</button>
        </Link>
      ) : (
        <button disabled className={disabledStyle}>
          Next
        </button>
      )}
    </div>
  );
}
