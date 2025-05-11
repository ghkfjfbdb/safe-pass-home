
import React from "react";
import { Lock } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Gerador de Senhas Seguras</h1>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
