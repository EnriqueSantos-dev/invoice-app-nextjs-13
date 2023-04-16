import { Session } from "next-auth";
import { AvatarProfile, Logo } from "@/app/components";
import { ToggleThemeButton } from "./ToggleThemeButton";

type HeaderProps = {
  session: Session | null;
};

export function Header({ session }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-[1000] flex h-[72px] w-full justify-between bg-ebony lg:h-full lg:w-[90px] lg:flex-col lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:pb-6">
      <div className="h-full w-[72px] overflow-hidden rounded-tr-xl rounded-br-xl lg:h-[90px] lg:w-full lg:rounded-br-[20px]">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-end px-4 lg:flex-col lg:px-0">
        <ToggleThemeButton />
        <AvatarProfile imageUrl={session?.user.image} />
      </div>
    </header>
  );
}
