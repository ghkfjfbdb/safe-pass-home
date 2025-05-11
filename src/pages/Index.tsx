
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PasswordGenerator from "@/components/PasswordGenerator";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">Gerador de Senhas Seguras</h1>
            <p className="text-lg text-muted-foreground">
              Crie senhas fortes e seguras para proteger suas contas online.
            </p>
          </div>
          <PasswordGenerator />
          
          <div className="space-y-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Segurança Total</h3>
                <p className="text-sm text-muted-foreground">
                  Todas as senhas são geradas localmente no seu navegador. 
                  Nenhum dado é enviado para servidores externos.
                </p>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Senhas Personalizadas</h3>
                <p className="text-sm text-muted-foreground">
                  Ajuste o tamanho e os tipos de caracteres para criar senhas 
                  que atendam aos requisitos específicos de cada site.
                </p>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Análise de Força</h3>
                <p className="text-sm text-muted-foreground">
                  Verifique facilmente a força da senha gerada e siga as
                  recomendações para criar senhas mais seguras.
                </p>
              </div>
            </div>
            
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Dicas de Segurança</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Use senhas únicas para cada site ou serviço.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Quanto maior a senha, mais segura ela é. Use pelo menos 12 caracteres quando possível.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Combine diferentes tipos de caracteres: maiúsculas, minúsculas, números e símbolos.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Considere usar um gerenciador de senhas para armazenar suas senhas com segurança.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Ative a autenticação em dois fatores (2FA) quando disponível.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
