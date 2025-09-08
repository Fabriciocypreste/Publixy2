"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2, Palette, Briefcase, Sparkles, Target, Upload, Image, Instagram as InstagramIcon, Facebook as FacebookIcon, Music as TiktokIcon, MessageSquare as MessageSquareIcon, X as XIcon, Play, CheckCircle, Star } from "lucide-react";

interface FormData {
  profession: string;
  colorPalette: string;
  visualStyle: string;
  subject: string;
  theme: string;
  quantity: number;
  logo?: File;
  customText?: string;
  referenceImage?: File;
  artStyle: string;
  platform: string;
}

const professions = [
  "Designer Gráfico", "Fotógrafo", "Arquiteto", "Chef", "Personal Trainer",
  "Coach de Vida", "Consultor de Negócios", "Advogado", "Médico", "Enfermeiro",
  "Professor", "Desenvolvedor", "Product Manager", "Marketing Digital", "Influencer",
  "Artista", "Músico", "Escritor", "Empreendedor", "Consultor Financeiro", "Psicólogo",
  "Nutricionista", "Esteticista", "Engenheiro", "Arquiteto de Software", "UX/UI Designer",
  "Fashion Designer", "Cineasta", "Editor de Vídeo", "Journalista", "Biólogo", "Químico",
  "Físico", "Astrônomo", "Geólogo", "Sociólogo", "Antropólogo", "Historiador", "Filósofo",
  "Economista", "Contador", "Administrador", "Publicitário", "Comunicador", "Relações Públicas",
  "Hotelaria", "Turismo", "Nutricionista Esportivo", "Coletor de Dados", "Analista de Dados",
  "Cientista de Dados", "Especialista SEO", "Especialista em Redes Sociais", "Criador de Conteúdo",
  "Podcaster", "Youtuber", "Tiktoker", "Ator", "Dançarino", "Coreógrafo", "Diretor de Teatro",
  "Produtor Musical", "DJ", "Barista", "Padeiro", "Confeiteiro", "Florista", "Jardineiro",
  "Mecânico", "Eletricista", "Pintor", "Encanador", "Cabeleireiro", "Manicure", "Massoterapeuta",
  "Fisioterapeuta", "Terapeuta Ocupacional", "Fonoaudiólogo", "Nutricionista Clínico",
  "Psicólogo Clínico", "Psiquiatra", "Cardiologista", "Dermatologista", "Ortopedista",
  "Pediatra", "Ginecologista", "Obstetra", "Urologista", "Neurologista", "Oftalmologista",
  "Otorrinolaringologista", "Endocrinologista", "Gastroenterologista", "Nefrologista",
  "Pneumologista", "Reumatologista", "Infectologista", "Hematologista", "Oncologista",
  "Radiologista", "Anestesiologista", "Cirurgião Geral", "Cirurgião Plástico", "Cirurgião Cardíaco"
];

const visualStyles = [
  "Minimalista", "Futurista", "Vintage", "Luxuoso", "Moderno", "Clássico", "Industrial",
  "Boêmio", "Retrô", "Contemporâneo", "Artístico", "Profissional", "Divertido", "Sério",
  "Criativo", "Elegante", "Casual", "Formal", "Informal", "Sophisticated", "Playful",
  "Bold", "Subtle", "Vibrant", "Monochromatic", "Gradient", "Flat", "3D", "Neon",
  "Dark Mode", "Light Mode"
];

const colorPalettes = [
  "Azul e Branco", "Preto e Branco", "Cinza e Branco", "Vermelho e Preto", "Verde e Branco",
  "Amarelo e Preto", "Roxo e Branco", "Laranja e Azul", "Rosa e Cinza", "Azul Marinho e Dourado",
  "Verde Floresta e Bege", "Azul Ciano e Branco", "Vermelho e Cinza", "Amarelo e Cinza",
  "Roxo e Prata", "Laranja e Branco", "Rosa e Branco", "Verde Limão e Preto",
  "Azul Royal e Branco", "Vermelho e Ouro", "Azul Petróleo e Bege", "Verde Musgo e Branco",
  "Roxo e Rosa", "Laranja e Verde", "Azul e Verde", "Vermelho e Azul", "Amarelo e Roxo",
  "Rosa e Azul", "Verde e Amarelo", "Azul e Rosa", "Vermelho e Verde", "Cores Pastel",
  "Cores Neon", "Cores Terrosas", "Cores Primárias", "Cores Secundárias", "Cores Complementares",
  "Crescendo de Cores", "Degradê", "Monocromático"
];

const platforms = [
  { id: "instagram", name: "Instagram", description: "Feed e Stories" },
  { id: "facebook", name: "Facebook", description: "Feed e Stories" },
  { id: "tiktok", name: "TikTok", description: "Vídeos curtos" },
  { id: "whatsapp", name: "WhatsApp", description: "Status" }
];

const artStyles = [
  "Minimalista", "Retrô", "Futurista", "Colorido", "Monocromático", "Realista",
  "Cartoon", "Anime", "Vintage", "Moderno", "Clássico", "Abstrato", "Geométrico",
  "Organic", "Digital", "Analógico", "Surreal", "Pop Art", "Cubismo", "Impressionismo",
  "Expressionismo", "Art Deco", "Art Nouveau", "Bauhaus", "Brutalismo", "Neoclássico",
  "Barroco", "Gótico", "Renascentista", "Victoriano", "Edoardo", "Mori", "Kawaii",
  "Steampunk", "Cyberpunk", "Biopunk", "Solarpunk", "Dark Academia", "Light Academia",
  "Cottagecore", "Goblincore", "Naturecore", "Softcore", "Hardcore", "Minimalismo",
  "Maximalismo", "Minimalismo", "Maximalismo", "Ecletismo", "Híbrido", "Experimental"
];

const toneMap: Record<string, string> = {
  "Minimalista": "Profissional", "Futurista": "Inovador", "Vintage": "Nostálgico",
  "Luxuoso": "Elegante", "Moderno": "Contemporâneo", "Clássico": "Profissional",
  "Industrial": "Sério", "Boêmio": "Divertido", "Retrô": "Nostálgico",
  "Contemporâneo": "Profissional", "Artístico": "Criativo", "Profissional": "Profissional",
  "Divertido": "Divertido", "Sério": "Profissional", "Criativo": "Criativo",
  "Elegante": "Elegante", "Casual": "Divertido", "Formal": "Profissional",
  "Informal": "Divertido", "Sophisticated": "Profissional", "Playful": "Divertido",
  "Bold": "Inovador", "Subtle": "Profissional", "Vibrant": "Criativo",
  "Monochromatic": "Profissional", "Gradient": "Criativo", "Flat": "Profissional",
  "3D": "Inovador", "Neon": "Criativo", "Dark Mode": "Profissional", "Light Mode": "Profissional"
};

const platformSpecifics: Record<string, string> = {
  "instagram": "Formato quadrado (1:1) para feed, formato vertical (9:16) para stories",
  "facebook": "Formato quadrado (1:1) para feed, formato vertical (9:16) para stories",
  "tiktok": "Formato vertical (9:16) otimizado para vídeos curtos",
  "whatsapp": "Formato circular para status, formato vertical (9:16)"
};

const features = [
  {
    icon: Wand2,
    title: "Geração Inteligente",
    description: "Crie prompts otimizados com IA GLM 4.5 para conteúdo de alta qualidade"
  },
  {
    icon: Palette,
    title: "Estilos Personalizados",
    description: "60+ estilos artísticos e 39 paletas de cores para criar designs únicos"
  },
  {
    icon: Upload,
    title: "Upload de Arquivos",
    description: "Envie logotipos e imagens de referência para inspiração criativa"
  },
  {
    icon: Star,
    title: "Multiplataforma",
    description: "Otimize conteúdo para Instagram, Facebook, TikTok e WhatsApp"
  }
];

const tutorials = [
  {
    title: "Como usar o Publixy",
    steps: [
      "Selecione sua profissão e plataforma",
      "Escolha estilos e cores",
      "Envie referências se desejar",
      "Clique em 'Gerar Prompt'",
      "Copie e use no seu editor"
    ]
  },
  {
    title: "Dicas de engajamento",
    steps: [
      "Use cores que chamam atenção",
      "Inclua textos claros e objetivos",
      "Adicione hashtags relevantes",
      "Mantenha a consistência visual",
      "Interaja com seu público"
    ]
  }
];

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    profession: "",
    colorPalette: "",
    visualStyle: "",
    subject: "",
    theme: "",
    quantity: 1,
    logo: undefined,
    customText: "",
    referenceImage: undefined,
    artStyle: "",
    platform: "instagram"
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleReferenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        referenceImage: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferencePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: undefined
    }));
    setLogoPreview(null);
  };
  
  const removeReference = () => {
    setFormData(prev => ({
      ...prev,
      referenceImage: undefined
    }));
    setReferencePreview(null);
  };
  
  const generateText = async () => {
    if (!formData.profession || !formData.subject || !formData.theme) {
      alert("Por favor, preencha os campos obrigatórios primeiro!");
      return;
    }
    
    setIsGeneratingText(true);
    
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profession: formData.profession,
          subject: formData.subject,
          theme: formData.theme,
          visualStyle: formData.visualStyle
        }),
      });

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        customText: data.text
      }));
    } catch (error) {
      console.error('Error generating text:', error);
      alert('Erro ao gerar o texto. Tente novamente.');
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generatePrompt = async () => {
    if (!formData.profession || !formData.colorPalette || !formData.visualStyle || !formData.subject || !formData.theme) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setIsGenerating(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof FormData];
        if (value !== undefined && value !== null) {
          if (typeof value === 'string' || typeof value === 'number') {
            formDataToSend.append(key, value.toString());
          } else if (value instanceof File) {
            formDataToSend.append(key, value);
          }
        }
      });

      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      alert('Erro ao gerar o prompt. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getTone = () => {
    return toneMap[formData.visualStyle] || "Profissional";
  };

  const getPlatformInfo = () => {
    return platformSpecifics[formData.platform] || "Formato padrão";
  };

  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case "instagram":
        return InstagramIcon;
      case "facebook":
        return FacebookIcon;
      case "tiktok":
        return TiktokIcon;
      case "whatsapp":
        return MessageSquareIcon;
      default:
        return InstagramIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Publixy Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Seu designer e redator em um só app.
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Crie prompts otimizados para conteúdo das redes sociais com inteligência artificial
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Começar Agora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg font-semibold">
                Ver Tutoriais
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              O que o <span className="text-blue-400">Publixy</span> pode fazer por você
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Transforme sua criação de conteúdo com ferramentas poderosas e inteligentes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Wand2 className="text-purple-600" />
                  Configure seu Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Selection */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <InstagramIcon className="w-4 h-4" />
                    Plataforma
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((platform) => {
                      const IconComponent = getPlatformIcon(platform.id);
                      return (
                        <Button
                          key={platform.id}
                          variant={formData.platform === platform.id ? "default" : "outline"}
                          onClick={() => handleInputChange('platform', platform.id)}
                          className={`flex flex-col items-center gap-2 h-auto py-4 px-3 transition-all duration-300 transform hover:scale-105 ${
                            formData.platform === platform.id 
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl" 
                              : "border-gray-200 hover:bg-gray-50 hover:border-purple-300"
                          }`}
                        >
                          <div className="p-2 rounded-full bg-white/20">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-semibold text-center">{platform.name}</span>
                          <span className="text-xs opacity-75 text-center">{platform.description}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs text-purple-700 flex items-center gap-2">
                      <Star className="w-3 h-3" />
                      {getPlatformInfo()}
                    </p>
                  </div>
                </div>

                {/* Quick Selection */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 animate-pulse">
                  <h3 className="text-sm font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Seleção Rápida
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleInputChange('profession', 'Designer Gráfico');
                        handleInputChange('visualStyle', 'Minimalista');
                        handleInputChange('colorPalette', 'Azul e Branco');
                      }}
                      className="text-xs h-8 hover:bg-purple-100 transition-all duration-200"
                    >
                      Design
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleInputChange('profession', 'Marketing Digital');
                        handleInputChange('visualStyle', 'Moderno');
                        handleInputChange('colorPalette', 'Cores Neon');
                      }}
                      className="text-xs h-8 hover:bg-purple-100 transition-all duration-200"
                    >
                      Marketing
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleInputChange('profession', 'Fotógrafo');
                        handleInputChange('visualStyle', 'Vintage');
                        handleInputChange('colorPalette', 'Preto e Branco');
                      }}
                      className="text-xs h-8 hover:bg-purple-100 transition-all duration-200"
                    >
                      Fotografia
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleInputChange('profession', 'Coach de Vida');
                        handleInputChange('visualStyle', 'Inspirador');
                        handleInputChange('colorPalette', 'Cores Pastel');
                      }}
                      className="text-xs h-8 hover:bg-purple-100 transition-all duration-200"
                    >
                      Coaching
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Profession */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Briefcase className="w-4 h-4" />
                      Profissão
                    </Label>
                    <Select value={formData.profession} onValueChange={(value) => handleInputChange('profession', value)}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                        <SelectValue placeholder="Selecione sua profissão" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem key={profession} value={profession}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Art Style */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Sparkles className="w-4 h-4" />
                      Estilo da Arte
                    </Label>
                    <Select value={formData.artStyle} onValueChange={(value) => handleInputChange('artStyle', value)}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                        <SelectValue placeholder="Descreva o estilo da arte" />
                      </SelectTrigger>
                      <SelectContent>
                        {artStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Color Palette */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Palette className="w-4 h-4" />
                      Paleta de Cores
                    </Label>
                    <Select value={formData.colorPalette} onValueChange={(value) => handleInputChange('colorPalette', value)}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                        <SelectValue placeholder="Escolha a paleta de cores" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorPalettes.map((palette) => (
                          <SelectItem key={palette} value={palette}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                              {palette}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Visual Style */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Sparkles className="w-4 h-4" />
                      Estilo Visual
                    </Label>
                    <Select value={formData.visualStyle} onValueChange={(value) => handleInputChange('visualStyle', value)}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                        <SelectValue placeholder="Escolha o estilo visual" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-400 to-blue-400"></div>
                              {style}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Detalhes do Conteúdo
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Subject */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Target className="w-4 h-4" />
                        Assunto Principal
                      </Label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Ex: Marketing Digital, Saúde, Educação..."
                        className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                      />
                    </div>

                    {/* Theme */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Target className="w-4 h-4" />
                        Tema
                      </Label>
                      <Input
                        value={formData.theme}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        placeholder="Ex: Dicas, Tendências, Cases de Sucesso..."
                        className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Badge variant="outline" className="text-xs">
                        Posts
                      </Badge>
                      Quantidade de Posts
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                        className="flex-1 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                      />
                      <div className="flex gap-1">
                        {[1, 3, 5, 10].map((num) => (
                          <Button
                            key={num}
                            size="sm"
                            variant={formData.quantity === num ? "default" : "outline"}
                            onClick={() => handleInputChange('quantity', num)}
                            className="w-8 h-8 text-xs"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Mídia e Arquivos
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Reference Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all duration-200 hover:bg-purple-50/50">
                      <div className="text-center">
                        <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" alt="Ícone de imagem" />
                        <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                          Imagem de Referência
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">Clique para enviar</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleReferenceUpload}
                          className="hidden"
                          id="reference-upload"
                        />
                        <label htmlFor="reference-upload" className="cursor-pointer">
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            Enviar Imagem
                          </Button>
                        </label>
                      </div>
                      {referencePreview && (
                        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700">Imagem carregada</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Logo Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all duration-200 hover:bg-purple-50/50">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                          Logotipo da Marca
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">Clique para enviar</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            Enviar Logo
                          </Button>
                        </label>
                      </div>
                      {logoPreview && (
                        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700">Logo carregado</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Generation */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                      <MessageSquareIcon className="w-4 h-4" />
                      Texto Personalizado
                    </h3>
                    <Button
                      onClick={generateText}
                      disabled={isGeneratingText}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    >
                      {isGeneratingText ? (
                        <div className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Gerando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Gerar IA
                        </div>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    value={formData.customText}
                    onChange={(e) => handleInputChange('customText', e.target.value)}
                    placeholder="Texto personalizado para o conteúdo (opcional)..."
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 resize-none transition-all duration-200"
                    rows={3}
                  />
                  {formData.customText && (
                    <div className="mt-2 flex justify-end">
                      <Button
                        onClick={() => setFormData(prev => ({ ...prev, customText: '' }))}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                      >
                        Limpar
                      </Button>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generatePrompt}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-70 shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Gerando Prompt...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Wand2 className="w-6 h-6" />
                      <span>Gerar Prompt Mágico</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Sparkles className="text-purple-600" />
                  Prompt Gerado
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedPrompt ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                        {generatedPrompt}
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedPrompt);
                          alert("Prompt copiado para a área de transferência!");
                        }}
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        Copiar Prompt
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <Sparkles className="w-16 h-16 text-gray-300 mx-auto" />
                    </div>
                    <p className="text-gray-500 text-lg">
                      Seu prompt personalizado aparecerá aqui
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Preencha o formulário e clique em "Gerar Prompt"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Como usar o <span className="text-blue-400">Publixy</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Aprenda a usar todas as funcionalidades do nosso gerador
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Play className="text-blue-400" />
                    {tutorial.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {tutorial.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by GLM 4.5 AI • Publixy - Gerador de Prompts para Redes Sociais
          </p>
        </div>
      </footer>
    </div>
  );
}