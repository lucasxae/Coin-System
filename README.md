# Sistema de Mérito Estudantil
![CoinStudy](https://github.com/user-attachments/assets/88074fdb-b578-4e87-9ae0-9fdaae43d632)

Pretende-se desenvolver um sistema para estimular o reconhecimento do mérito estudantil através de uma moeda virtual. Essa moeda pode ser distribuída por professores aos seus alunos e trocada pelos alunos por produtos e descontos em empresas parceiras.

<details>
<summary><b>Descrição do Sistema</b></summary>

Os alunos que desejam ingressar no sistema de mérito devem realizar um cadastro, indicando nome, email, CPF, RG, Endereço, Instituição de Ensino e curso. As instituições participantes já estão pré-cadastradas no sistema, para que o aluno selecione.

Os professores já estarão pré-cadastrados no sistema (a instituição envia a lista no momento da parceria). Cada professor terá armazenado o seu nome, CPF e departamento que está vinculado. É necessário deixar explícito que ele faz parte de uma instituição.

A cada semestre, os professores recebe um total de mil moedas, que podem ser distribuídas aos seus alunos como forma de reconhecimento por bom comportamento, participação em aula, etcs. Esse total é acumulável no semestre (isto é, se o professor não distribuir todas as moedas num semestre, o total de 1.000 novas moedas será adicionado ao seu saldo corrente).

Para enviar moedas, o professor deve possuir saldo suficiente, indicando qual aluno deverá receber o montante, bem como o motivo pelo qual ele está sendo reconhecido (uma mensagem aberta, obrigatória).

Ao receber uma moeda, o aluno deve ser notificado por email. 

Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou (para o professor, o envio de moedas; para o aluno, recebimento ou troca de moedas).

Para trocar moedas, o aluno deve selecionar uma das vantagens cadastradas no sistema. Elas incluem, por exemplo: desconto em restaurantes da universidade, desconto de mensalidade, ou compra de materiais específicos.

Empresas que sejam realizar parceria também devem se cadastrar no sistema, incluindo as vantagens que deseja oferecer e o custo de cada uma dela (em moedas).

Para cadastrar uma vantagem, a empresa parceira deve adicionar também uma descrição e foto do produto.

Ao resgatar uma vantagem, o aluno deve ter o valor descontado do seu saldo. Um email de cupom deve ser enviado para que ele utilize na troca presencial. Um email também deve ser enviado ao parceiro, para que ele possa conferir a troca. Ambos os emails devem incluir um código gerado pelo sistema, a fim de facilitar o processo de conferência.

Por fim, alunos, professores e empresas parceiras precisam ter um login e uma senha cadastrados para acessar o sistema. Em todos os casos, um processo de autenticação é necessário para realização dos requisitos.

</details>


### Alunos integrantes da equipe
* Ana Luiza Machado Alves
* Lucas Henrique Chaves de Barros
* Matheus Martins da Silva Porto
* Yan Mariz Magalhães Cota

---

## Histórias de Usuário

### 1. Cadastro de Aluno
**Como** um aluno, **eu quero** me cadastrar no sistema de mérito, **para** poder participar e receber moedas virtuais dos professores.

**Critérios de Aceite:**

* O aluno deve preencher os campos: nome, email, CPF, RG, endereço, instituição de ensino e curso.
* Todos os campos são obrigatórios.
* O aluno só pode se cadastrar em uma instituição que já esteja pré-cadastrada no sistema.
* O aluno deve criar um login e senha para acessar o sistema.
---
### 2. Cadastro de Professor

**Como** um administrador do sistema, **eu quero** pré-cadastrar todos os professores no sistema **para** que eles possam distribuir as moedas para os alunos.

**Critérios de Aceite:**

* O sistema deve permitir o cadastro em massa por meio de um arquivo enviado pela instituição.
* Cada professor deve ter os campos: nome, CPF, departamento e instituição de ensino obrigatórios.
* Cada professor deve estar necessariamente vinculado a uma instituição de ensino (já previamente cadastrada).
* Após o cadastro, o professor deve receber um email com login e senha para acessar o sistema.
---
### 3. Cadastro de Empresa Parceira
**Como** uma empresa parceira, **eu quero** me cadastrar no sistema, **para** oferecer vantagens em troca de moedas virtuais.

**Critérios de Aceite:**

* A empresa deve preencher os campos: nome da empresa, CNPJ, endereço e contato.
* A empresa deve criar um login e senha para acessar o sistema.
* Após o cadastro, a empresa deve poder adicionar vantagens, cada uma com nome, descrição, foto e custo em moedas.
---
### 4. Distribuição de Moedas
**Como** um professor, **eu quero** distribuir moedas aos meus alunos, **para** recompensá-los pelo desempenho positivo (bom comportamento, participação, etc) em sala de aula.

**Critérios de Aceite:**

* O professor deve possuir saldo suficiente de moedas para enviar moedas.
* O professor deve selecionar o aluno e indicar a quantidade de moedas a serem enviadas.
* O professor deve, obrigatoriamente, justificar o motivo daquele aluno estar sendo recompensado.
* O aluno deve receber um email de notificação com o detalhe da transação.
* O saldo do professor deve ser atualizado após a transação.
---
### 5. Consulta de Extrato de Professor
**Como** um professor, **eu quero** consultar o extrato da minha conta, **para** acompanhar o histórico de transações e meu saldo restante.

**Critérios de Aceite:**

* O professor deve poder visualizar o saldo atual de moedas.
* O professor deve poder visualizar um extrato que lista todas as transações realizadas, incluindo data, quantidade de moedas e o aluno que recebeu.
---
### 6. Consulta de Extrato de Aluno
**Como** um aluno, **eu quero** consultar o extrato da minha conta, **para** saber sobre as moedas que já recebi e as trocas realizadas.

**Critérios de Aceite:**

* O aluno deve visualizar o saldo atual de moedas.
* O extrato deve listar todas as transações de recebimento de moedas, incluindo a data, o professor que enviou e o motivo da transação.
* O extrato deve listar também as trocas de moedas realizadas e o saldo após cada troca.
---
### 7. Troca de Moedas por Vantagens
**Como** um aluno, **eu quero** trocar minhas moedas por vantagens oferecidas pelas empresas parceiras, **para** poder usufruir dos benefícios do mérito estudantil.

**Critérios de Aceite:**

* O aluno deve selecionar a vantagem desejada e confirmar a troca.
* O sistema deve verificar se o aluno possui saldo suficiente antes de completar a transação.
* O saldo do aluno deve ser atualizado após a troca.
* Um email contendo o cupom e o código de confirmação deve ser enviado ao aluno e à empresa parceira.
* A vantagem deve ser removida do saldo de vantagens disponíveis para o aluno após a troca.
---
### 8. Cadastrar Vantagem
**Como** uma empresa parceira, **eu quero** cadastrar uma vantagem, **para** oferecer aos alunos um benefício pelo bom desempenho e promover meu negócio na plataforma.

**Critérios de Aceite:**

* A vantagem deve possuir um custo (em moedas).
* A empresa deve adicionar uma descrição e foto do produto.
* Caso uma vantagem seja trocada por um aluno, a empresa deve receber um e-mail com os dados da troca.
---
### 9. Autenticação de Usuários
**Como** um usuário (aluno, professor ou empresa parceira), **eu quero** realizar login no sistema, **para** acessar as funcionalidades disponíveis conforme meu perfil.

**Critérios de Aceite:**

* O sistema deve exigir login e senha para todos os usuários.
* Deve haver validação para garantir que apenas usuários cadastrados consigam acessar.
* O sistema deve possuir um fluxo de autenticação baseado em JWT.
* O sistema deve suportar recuperação de senha por email.
