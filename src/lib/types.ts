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
      fileTooLarge: {
        title: string;
        description: string;
      };
    };
  };
  unfollowersList: {
    title: string;
    viewProfile: string;
    total: string;
    emptyList: string;
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
          description: 'Por favor, envie um arquivo ZIP válido',
        },
        missingFiles: {
          title: 'Arquivos necessários não encontrados',
          description: 'Arquivo ZIP inválido: arquivos de seguidores não encontrados',
        },
        invalidFormat: {
          title: 'Formato de arquivo inválido',
          description: 'Formato inválido do arquivo de seguidores',
        },
        invalidStructure: {
          title: 'Estrutura de dados inválida',
          description: 'Formato inválido do arquivo de seguindo',
        },
        processingError: {
          title: 'Erro ao processar',
          description: 'Ocorreu um erro ao processar o arquivo. Tente novamente.',
        },
        fileTooLarge: {
          title: 'Arquivo muito grande',
          description: 'O arquivo é muito grande. Tamanho máximo: 10MB',
        },
      },
    },
    unfollowersList: {
      title: 'Contas que não te seguem de volta',
      viewProfile: 'Ver perfil',
      total: 'Total',
      emptyList: 'Nenhuma conta encontrada que não te segue de volta',
    },
    instructions: {
      title: 'Como baixar seus dados do Instagram (Leia com atenção todos os passos)',
      steps: [
        'Acesse sua conta do Instagram ',
        'Vá para o seu perfil e clique em "Mais" e selecione "Sua atividade" ',
        'Clique em "Baixar suas Informações" e "Continuar"',
        'Selecione "Baixar ou transferir Informações" e escolha a conta do Instagram desejada',
        'Clique em "Avançar" ',
        'Clique em "Algumas das suas informações" e role até a opção "Seguidores e Seguindo"',
        'Clique em "Avançar" ',
        'Clique em "Baixar" no dispostivo e em "Formato" mude para "JSON"',
        'Clique em "Salvar" e "Criar arquivos"',
        'Você receberá um e-mail intitulado "O arquivo das suas informações na Meta está pronto para download" com um link para fazer o download das suas informações. Clique em "Baixar suas informações" e siga as instruções para concluir o download das suas informações. Mande o arquivo em formato ZIP para essa ferramenta.',
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
          description: 'Please upload a valid ZIP file',
        },
        missingFiles: {
          title: 'Required files not found',
          description: 'Invalid ZIP file: followers files not found',
        },
        invalidFormat: {
          title: 'Invalid file format',
          description: 'Invalid followers file format',
        },
        invalidStructure: {
          title: 'Invalid data structure',
          description: 'Invalid following file format',
        },
        processingError: {
          title: 'Processing error',
          description: 'An error occurred while processing the file. Please try again.',
        },
        fileTooLarge: {
          title: 'File too large',
          description: 'File is too large. Maximum size: 10MB',
        },
      },
    },
    unfollowersList: {
      title: 'Accounts that don’t follow you back',
      viewProfile: 'View profile',
      total: 'Total',
      emptyList: 'No accounts found that don’t follow you back',
    },
    instructions: {
      title: 'How to Download Your Instagram Data (Read all the steps carefully)',
      steps: [
        'Log in to your Instagram account',
        'Go to your profile and click on "More" and select "Your Activity"',
        'Click on "Download Your Information" and "Continue"',
        'Select "Download or Transfer Information" and choose the desired Instagram account',
        'Click on "Next"',
        'Click on "Some of Your Information" and scroll down to the "Followers and Following" option',
        'Click on "Next"',
        'Click on "Download" on your device and under "Format" change to "JSON"',
        'Click on "Save" and "Create Files"',
        'You will receive an email titled "Your Meta Information file is ready for download" with a link to download your information. Click on "Download Your Information" and follow the instructions to complete the download of your information. Upload the file in ZIP format to this tool.',
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
