
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 md:py-8 border-t">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
        <div className="text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Gerador de Senhas Seguras. Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Todas as senhas são geradas localmente no seu dispositivo.
            Nós não armazenamos, transmitimos ou processamos as suas senhas.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacidade
          </a>
          <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Termos de Uso
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          <p>criado por MESTRE R</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
