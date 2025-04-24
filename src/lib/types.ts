
export interface InstagramUser {
  username: string;
  full_name?: string;
  profile_pic_url?: string;
}

export interface LanguageContent {
  header: {
    tagline: string;
  };
  fileUploader: {
    title: string;
    description: string;
    buttonText: string;
    processing: string;
    success: {
      title: string;
      description: string;
    };
    errors: {
      invalidType: {
        title: string;
        description: string;
      };
      missingFiles: {
        title: string;
        description: string;
      };
      invalidFormat: {
        title: string;
        description: string;
      };
      invalidStructure: {
        title: string;
        description: string;
      };
      processingError: {
        title: string;
        description: string;
      };
    };
  };
  instructions: {
    title: string;
    steps: string[];
    noteTitle: string;
    noteContent: string;
  };
  resultsDisplay: {
    title: string;
    description: string;
    searchPlaceholder: string;
    sortBy: string;
    resetButton: string;
    noResults: string;
  };
  faq: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  privacyNotice: {
    title: string;
    content: string;
  };
  footer: {
    rights: string;
    disclaimer: string;
  };
}

export const languageContent: Record<'pt' | 'en', LanguageContent> = {
  pt: {
    header: {
      tagline: 'Descubra quem não te segue de volta no Instagram',
    },
    fileUploader: {
      title: 'Arraste e solte seu arquivo ZIP',
      description: 'ou clique para selecionar o arquivo do Instagram',
      buttonText: 'Selecionar Arquivo',
      processing: 'Processando arquivo...',
      success: {
        title: 'Arquivo processado com sucesso!',
        description: 'Seus dados foram processados e estão prontos para visualização.',
      },
      errors: {
        invalidType: {
          title: 'Tipo de arquivo inválido',
          description: 'Por favor, selecione um arquivo ZIP (baixado do Instagram).',
        },
        missingFiles: {
          title: 'Arquivos necessários não encontrados',
          description: 'O arquivo ZIP não contém os dados de seguidores ou seguidos necessários.',
        },
        invalidFormat: {
          title: 'Formato de arquivo inválido',
          description: 'Os arquivos JSON no ZIP estão em um formato inválido.',
        },
        invalidStructure: {
          title: 'Estrutura de dados inválida',
          description: 'Os arquivos encontrados não possuem a estrutura esperada do Instagram.',
        },
        processingError: {
          title: 'Erro ao processar',
          description: 'Ocorreu um erro ao processar o arquivo. Tente novamente.',
        },
      },
    },
    instructions: {
      title: 'Como baixar seus dados do Instagram',
      steps: [
        'Acesse sua conta do Instagram no navegador ou no aplicativo móvel',
        'Vá para o seu perfil e clique em "Configurações"',
        'Selecione "Privacidade e Segurança"',
        'Role para baixo e clique em "Solicitação de download de dados"',
        'Insira seu e-mail e senha para confirmar',
        'Selecione o formato "JSON" e clique em "Próximo"',
        'Aguarde o e-mail do Instagram com o link para download do arquivo ZIP',
        'Faça o download do arquivo ZIP e use-o nesta ferramenta',
      ],
      noteTitle: 'Importante:',
      noteContent: 'O Instagram pode levar de algumas horas até alguns dias para enviar o arquivo com seus dados, dependendo do tamanho da conta.',
    },
    resultsDisplay: {
      title: 'Resultados da Análise',
      description: 'Encontramos {count} contas que você segue, mas que não te seguem de volta.',
      searchPlaceholder: 'Buscar por nome de usuário...',
      sortBy: 'Ordenar',
      resetButton: 'Nova Análise',
      noResults: 'Nenhum resultado encontrado para sua busca.',
    },
    faq: {
      title: 'Perguntas Frequentes',
      questions: [
        {
          question: 'Como funciona essa ferramenta?',
          answer: 'Nossa ferramenta analisa o arquivo ZIP de dados que você baixou do Instagram para identificar quais contas que você segue não estão te seguindo de volta. Todo o processamento é feito localmente no seu navegador, para sua privacidade.',
        },
        {
          question: 'É seguro fazer o upload do meu arquivo ZIP?',
          answer: 'Sim, é 100% seguro. Sua privacidade é nossa prioridade. Todo o processamento é feito localmente no seu navegador e seus dados nunca são enviados para nossos servidores ou armazenados em qualquer lugar.',
        },
        {
          question: 'Por que preciso baixar meus dados do Instagram?',
          answer: 'O Instagram não oferece uma API pública que permita analisar seguidores. Por isso, a única maneira de obter esses dados é através do recurso oficial "Baixar seus dados" do Instagram.',
        },
        {
          question: 'Quanto tempo leva para o Instagram enviar meus dados?',
          answer: 'O Instagram geralmente leva de algumas horas até alguns dias para preparar e disponibilizar seus dados para download, dependendo do tamanho da sua conta.',
        },
        {
          question: 'Onde encontro o arquivo ZIP depois de baixar?',
          answer: 'Quando o Instagram notificar que seus dados estão prontos, você receberá um e-mail com um link para download. Após baixar, o arquivo geralmente fica na pasta de "Downloads" do seu dispositivo.',
        },
      ],
    },
    privacyNotice: {
      title: 'Aviso de Privacidade',
      content: 'Esta ferramenta processa todos os dados localmente no seu navegador. Seus dados não são enviados, armazenados ou compartilhados com nenhum servidor. Depois de fechar esta página, todos os dados são automaticamente excluídos da memória.',
    },
    footer: {
      rights: 'Todos os direitos reservados',
      disclaimer: 'Esta ferramenta não é afiliada ou endossada pelo Instagram ou Meta.',
    },
  },
  en: {
    header: {
      tagline: 'Discover who doesn\'t follow you back on Instagram',
    },
    fileUploader: {
      title: 'Drop your ZIP file here',
      description: 'or click to select your Instagram data file',
      buttonText: 'Select File',
      processing: 'Processing file...',
      success: {
        title: 'File processed successfully!',
        description: 'Your data has been processed and is ready to view.',
      },
      errors: {
        invalidType: {
          title: 'Invalid file type',
          description: 'Please select a ZIP file (downloaded from Instagram).',
        },
        missingFiles: {
          title: 'Required files not found',
          description: 'The ZIP file does not contain the required followers or following data.',
        },
        invalidFormat: {
          title: 'Invalid file format',
          description: 'The JSON files in the ZIP are in an invalid format.',
        },
        invalidStructure: {
          title: 'Invalid data structure',
          description: 'The files found do not have the expected Instagram structure.',
        },
        processingError: {
          title: 'Processing error',
          description: 'An error occurred while processing the file. Please try again.',
        },
      },
    },
    instructions: {
      title: 'How to Download Your Instagram Data',
      steps: [
        'Access your Instagram account on a browser or mobile app',
        'Go to your profile and click on "Settings"',
        'Select "Privacy and Security"',
        'Scroll down and click on "Data Download Request"',
        'Enter your email and password to confirm',
        'Select "JSON" format and click "Next"',
        'Wait for the Instagram email with the ZIP file download link',
        'Download the ZIP file and use it with this tool',
      ],
      noteTitle: 'Important:',
      noteContent: 'Instagram may take from a few hours to several days to send your data file, depending on the size of your account.',
    },
    resultsDisplay: {
      title: 'Analysis Results',
      description: 'We found {count} accounts that you follow but don\'t follow you back.',
      searchPlaceholder: 'Search by username...',
      sortBy: 'Sort',
      resetButton: 'New Analysis',
      noResults: 'No results found for your search.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How does this tool work?',
          answer: 'Our tool analyzes the ZIP data file you downloaded from Instagram to identify which accounts you follow aren\'t following you back. All processing happens locally in your browser for privacy.',
        },
        {
          question: 'Is it safe to upload my ZIP file?',
          answer: 'Yes, it\'s 100% safe. Your privacy is our priority. All processing happens locally in your browser, and your data is never sent to our servers or stored anywhere.',
        },
        {
          question: 'Why do I need to download my Instagram data?',
          answer: 'Instagram doesn\'t offer a public API that allows follower analysis. Therefore, the only way to get this data is through Instagram\'s official "Download Your Data" feature.',
        },
        {
          question: 'How long does it take for Instagram to send my data?',
          answer: 'Instagram typically takes from a few hours to several days to prepare and make your data available for download, depending on the size of your account.',
        },
        {
          question: 'Where do I find the ZIP file after downloading?',
          answer: 'When Instagram notifies you that your data is ready, you\'ll receive an email with a download link. After downloading, the file is usually in your device\'s "Downloads" folder.',
        },
      ],
    },
    privacyNotice: {
      title: 'Privacy Notice',
      content: 'This tool processes all data locally in your browser. Your data is not sent, stored, or shared with any server. After closing this page, all data is automatically deleted from memory.',
    },
    footer: {
      rights: 'All rights reserved',
      disclaimer: 'This tool is not affiliated with or endorsed by Instagram or Meta.',
    },
  },
};
