import Image from "next/image";

import { cn } from "@/lib/utils";

import { useMode } from "@/context/ModeContext";
import { Mode } from "@/types/enums";

import { Switch } from "../ui/switch";

const ModeSwitcher = () => {
  const { mode, toggleMode } = useMode();

  return (
    <Switch
      onClick={toggleMode}
      className={cn("!bg-primary/20 dark:!bg-primary/30", mode === Mode.LOVE && "dark:!bg-success/30")}
      thumbClassName={cn("bg-primary")}
    >
      <Image
        width={500}
        height={500}
        alt={mode!}
        src={mode === Mode.LOVE ? "/love.png" : "/hate.png"}
        className="p-1"
      />
    </Switch>
  );
};

export default ModeSwitcher;

