
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Cloud, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CloudStorageIntegrationProps {
  password: string;
}

const CloudStorageIntegration: React.FC<CloudStorageIntegrationProps> = ({ password }) => {
  const { toast } = useToast();

  const saveToGoogleDocs = () => {
    // Create Google Docs URL with pre-filled content
    const docsContent = encodeURIComponent(`Senha segura gerada: ${password}`);
    const googleDocsUrl = `https://docs.new?title=Senha%20Segura&body=${docsContent}`;
    
    // Open Google Docs in a new tab
    window.open(googleDocsUrl, "_blank");
    
    toast({
      title: "Redirecionando para o Google Docs",
      description: "Um novo documento será criado com sua senha",
      duration: 3000,
    });
  };

  const saveToOneDrive = () => {
    // Create a text file content
    const textContent = `Senha segura gerada: ${password}`;
    
    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: "text/plain" });
    
    // Create a downloadable link
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "senha_segura.txt";
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Arquivo de texto criado",
      description: "Você pode fazer upload deste arquivo para o OneDrive",
      duration: 5000,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Cloud className="h-4 w-4" />
          <span>Salvar na nuvem</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Escolha o serviço:</h4>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={saveToGoogleDocs}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Google Docs</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={saveToOneDrive}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>OneDrive (Download)</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CloudStorageIntegration;
