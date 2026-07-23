import { Eye, Copy, Pencil, Trash2 } from "lucide-react";

const Card = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-lg shadow-black/30">
        
      {/* Long url */}
      <div className="border-b border-white/10 px-5 py-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Long URL
        </p>
        <p className="truncate text-sm text-neutral-300">Long Url</p>
      </div>

      {/* Short url */}
      <div className="border-b border-white/10 px-5 py-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Short URL
        </p>
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-sky-400 hover:underline"
        >
          short Url
        </a>
      </div>

      {/* buttons */}
      <div className="flex p-3">
        <div className="flex-1">
          <button>
            <Eye />
            Clicks
          </button>
        </div>

        <div className="flex-1">
          <button>
            <Copy />
            Copy
          </button>
        </div>

        <div className="flex-1">
          <button>
            <Pencil />
            Edit
          </button>
        </div>

        <div className="flex-1">
          <button>
            <Trash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
