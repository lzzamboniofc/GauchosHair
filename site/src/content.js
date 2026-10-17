/**
 * ÚNICA FONTE DE CONTEÚDO EDITÁVEL.
 * Dados não confirmados ficam vazios e NÃO aparecem como fatos no site.
 * Logotipo oficial fornecido; identidade cromática baseada no fundo da imagem original.
 */
export const site = {
  brand: 'Gaúchos Hair Itu',
  logo: '/images/logo-original.svg', // Logotipo original fornecido
  instagram: 'https://www.instagram.com/gauchoshairitu/',
  appbarber: '', // LINK ESPECÍFICO DO ESTABELECIMENTO, não a página genérica do AppBarber
  whatsapp: '', // Apenas números verificados, formato 5511999999999
  address: '', // Ex.: 'Rua ..., 100 - Bairro, Itu - SP'
  hours: '', // Apenas horário confirmado pela barbearia
  mapsUrl: '', // Link oficial para rota no Google Maps
  mapEmbedUrl: '', // Endereço de incorporação permitido pelo Google Maps; não inventar
  heroImage: '',
  aboutImage: '',
  experienceImage: '',
  // Adicione apenas serviços confirmados. Exemplo de formato:
  // { id:'corte', name:'Nome oficial do serviço', description:'Descrição confirmada',
  //   image:'/images/servico.webp', duration:'', price:'', benefits:[], gallery:[] }
  services: [],
  // { name:'Nome real', role:'Especialidade confirmada', description:'', image:'/images/profissional.webp', bookingUrl:'' }
  professionals: [],
  // {src:'/images/trabalho.webp', category:'Cortes', alt:'Descrição real da foto'}
  gallery: [],
  // {name:'Nome autorizado', quote:'Transcrição real', source:'Google', url:'URL verificável'}
  reviews: [],
  // {before:'/images/antes.webp', after:'/images/depois.webp', alt:'Descrição da transformação'}
  transformations: [],
  faq: [
    {question:'Como faço para agendar?', answer:'A Gaúchos Hair utiliza o AppBarber. O acesso direto à agenda será disponibilizado neste site após a confirmação do link oficial.'},
    {question:'É necessário agendar antes de ir?', answer:'Consulte a barbearia pelo Instagram para confirmar a disponibilidade de atendimento sem agendamento.'},
    {question:'Como remarcar ou cancelar?', answer:'As condições e os procedimentos devem ser confirmados com a equipe, pelo AppBarber ou pelo Instagram.'},
    {question:'Qual é a tolerância para atrasos?', answer:'A política de atrasos será publicada depois de confirmada com a barbearia.'},
    {question:'Quais são as formas de pagamento?', answer:'Consulte diretamente a equipe para confirmar as opções disponíveis.'},
    {question:'Há atendimento infantil?', answer:'A disponibilidade desse atendimento deve ser confirmada com a equipe.'}
  ]
};
