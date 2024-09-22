<h1 align="center">Plan Hub</h1> 
Este é um sistema de gerenciamento de projetos, onde usuários podem criar e gerenciar projetos e tarefas, além de colaborar com outros membros da equipe.

## Funcionalidades
### 1. Autenticação e Autorização
+ Autenticação de usuários utilizando JWT e OAuth (Google).
+ Sistema de permissão com diferentes papéis: Administrador, Gerente e Colaborador.
+ Cada nível de permissão tem acesso a funcionalidades diferentes no sistema.

### 2. Gerenciamento de Projetos
+ Criação, edição e exclusão de projetos.
+ Associa usuários a projetos, com funções específicas como Gerente ou Membro.

### 3. Gerenciamento de Tarefas
+ Criação, edição e exclusão de tarefas dentro de projetos.
+ Cada tarefa pode ter título, descrição, prazo e status.

### 4. Relatórios e Análises
+ Relatórios de progresso dos projetos.
+ Estatísticas detalhadas, como o tempo médio de conclusão de tarefas e desempenho por membro da equipe.

## Tecnologias utilizadas
### Backend
- Node.js com Express para criação da API REST.
- Knex como query builder para interações com o banco de dados.
- Banco de dados MySQL.
- Redis para cache de dados e otimização de desempenho.

### Frontend
- Vue.js para a criação da interface do usuário.
- Vuex para o gerenciamento de estado global.
- Vue Router para navegação com controle de acesso baseado em permissões.

### Segurança
- Senhas armazenadas de forma segura utilizando bcrypt.

## Permissões dos níveis de usuários
+ Administrador: Acesso total ao sistema. Pode gerenciar usuários, projetos e tarefas.
+ Gerente: Pode criar e gerenciar projetos, adicionar usuários a projetos e delegar tarefas.
+ Colaborador: Pode ver e atualizar tarefas atribuídas a ele, mas não pode modificar projetos ou alterar permissões.

## Configuração do ambiente
### Pré-requisitos
+ Node.js
+ MySQL
+ Redis

### Instalação
```
# 1. Clone o repositório
$ git clone https://github.com/sadiegoc/planhub.git
$ cd planhub

# 2. Instale as dependências
$ npm install

# 3. Configuração das variáveis de ambiente:
Crie um arquivo .env na raíz do backend e com base no .env.example
adicione as informações necessárias.

# 4. Execute as migrações do banco de dados:
$ knex migrate:latest
$ knex seed:run

5. Inicie o servidor backend
$ npm start

6. Para iniciar o frontend é mais simples
$ cd frontend
$ npm i --save
$ npm run serve
```

## Licença
Este projeto é licenciado sob a MIT License.
