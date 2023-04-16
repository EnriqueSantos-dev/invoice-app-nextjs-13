export function Logo() {
  return (
    <div className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-purple after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-tl-3xl after:bg-heliotrope after:transition-all after:duration-200 hover:after:h-4/5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={26}
        className="z-10"
      >
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
        ></path>
      </svg>
    </div>
  );
}
