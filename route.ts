import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface TextGenerationData {
  profession: string;
  subject: string;
  theme: string;
  visualStyle: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TextGenerationData = await request.json();
    
    // Validate required fields
    if (!body.profession || !body.subject || !body.theme) {
      return NextResponse.json(
        { error: 'Profissão, assunto e tema são obrigatórios' },
        { status: 400 }
      );
    }

    // Initialize ZAI client
    const zai = await ZAI.create();

    // Create the system prompt for text generation
    const systemPrompt = `Você é um especialista em copywriting para redes sociais, especialmente Instagram. Sua tarefa é gerar textos persuasivos, engajadores e otimizados para cada plataforma social.

Instruções:
1. Crie textos curtos, impactantes e diretos
2. Use emojis estratégicos para aumentar o engajamento
3. Inclua hashtags relevantes e pesquisadas
4. Adicione chamadas para ação (CTA) claras
5. Ajuste o tom conforme o estilo visual escolhido
6. Inclua perguntas para aumentar o engajamento
7. Use hashtags relevantes e pesquisadas
8. Adicione dicas de engajamento
9. Inclua sugestões de interação com a audiência
10. Adicione hashtags relevantes e pesquisadas
11. Use hashtags relevantes e pesquisadas
12. Adicione hashtags relevantes e pesquisadas`;

    const userPrompt = `
Profissão: ${body.profession}
Assunto Principal: ${body.subject}
Tema: ${body.theme}
Estilo Visual: ${body.visualStyle || "Profissional"}

Por favor, gere um texto otimizado para redes sociais seguindo as instruções acima. O texto deve:
- Ser curto e impactante
- Incluir emojis estratégicos
- Ter hashtags relevantes
- Ter uma chamada para ação clara
- Ajustar o tom conforme o estilo visual
- Incluir perguntas para engajamento
- Ser otimizado para Instagram

Formato esperado:
[Título curto e impactante]

[Texto principal com emojis e hashtags]

[Chamada para ação]

[Pergunta para engajamento]

[Hashtags relevantes]
`;

    // Generate the text using GLM 4.5
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      model: 'glm-4'
    });

    const generatedText = completion.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('Não foi possível gerar o texto');
    }

    return NextResponse.json({
      text: generatedText,
      success: true
    });

  } catch (error) {
    console.error('Error generating text:', error);
    
    // Fallback to a basic text generation if AI fails
    const fallbackText = `🎯 ${body.profession}: ${body.subject} com foco em ${body.theme}!

💡 Dicas essenciais para você:
• Aprenda as melhores práticas
• Evite erros comuns
• Transforme sua carreira

🔥 Quer saber mais? Comente abaixo e receba dicas exclusivas!

#${body.profession.toLowerCase().replace(/\s+/g, '')} #${body.subject.toLowerCase().replace(/\s+/g, '')} #${body.theme.toLowerCase().replace(/\s+/g, '')} #dicas #sucesso`;

    return NextResponse.json({
      text: fallbackText,
      success: true,
      note: 'Usando modo de fallback - API de IA temporariamente indisponível'
    });
  }
}