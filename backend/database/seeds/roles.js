/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { name: 'Designer Gráfico' },
    { name: 'Designer UX/UI' },
    { name: 'Engenheiro de Software' },
    { name: 'Desenvolvedor Frontend' },
    { name: 'Desenvolvedor Backend' },
    { name: 'Desenvolvedor Full Stack' },
    { name: 'Engenheiro de Dados' },
    { name: 'Cientista de Dados' },
    { name: 'Engenheiro de DevOps' },
    { name: 'Arquiteto de Soluções' },
    { name: 'Gerente de Projetos' },
    { name: 'Scrum Master' },
    { name: 'Analista de Negócios' },
    { name: 'Analista de Sistemas' },
    { name: 'Analista de Qualidade (QA)' },
    { name: 'Tester de Software' },
    { name: 'Coordenador de Projetos' },
    { name: 'Gerente de Produto' },
    { name: 'Product Owner' },
    { name: 'Especialista em Segurança da Informação' },
    { name: 'Administrador de Banco de Dados (DBA)' },
    { name: 'Analista de Infraestrutura' },
    { name: 'Consultor de TI' },
    { name: 'Consultor de Negócios' },
    { name: 'Engenheiro de Redes' },
    { name: 'Administrador de Sistemas' },
    { name: 'Gestor de Riscos' },
    { name: 'Analista de Suporte Técnico' },
    { name: 'Especialista em Acessibilidade' },
    { name: 'Engenheiro de Controle de Qualidade' },
    { name: 'Engenheiro de Testes Automatizados' },
    { name: 'Desenvolvedor Mobile' },
    { name: 'Engenheiro de Machine Learning' },
    { name: 'Analista de SEO' },
    { name: 'Analista de Marketing Digital' },
    { name: 'Analista de Mídias Sociais' },
    { name: 'Desenvolvedor de Jogos' },
    { name: 'Engenheiro de Cloud' },
    { name: 'Analista de Integração' },
    { name: 'Gerente de Comunicação' },
    { name: 'Coordenador de TI' },
    { name: 'Gerente de TI' }
  ]);
};
