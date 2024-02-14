'use client';

import { revalidateDirectusIndex } from '@web/app/actions';

export default function RevalidateButtons() {
  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={async () => await revalidateDirectusIndex()}
      >
        Revalidate Directus Index
      </button>
    </div>
  );
}
