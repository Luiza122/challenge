# FordRetain — pacote completo

Projeto acadêmico mais completo para o Desafio 02 da Sprint de Mobile Development and IoT.

## O que foi reforçado nesta versão

- consumo de **API real ativado por padrão**, com fallback automático para mock local;
- **AsyncStorage implementado** para salvar preferências do app;
- **notificações locais implementadas** com teste direto no aplicativo;
- endpoint `/health` adicionado no backend;
- instruções de execução revisadas.

## Estrutura do pacote

- `mobile/` → aplicativo em React Native com Expo Router
- `backend/` → API REST simples em Node.js + Express
- `docs/` → trabalho em DOCX e PDF
 - `datasets/` → dados sintéticos de exemplo (Base 1 e Base 2) para treinar e testar o modelo
 - `ml_workflow.ipynb` → notebook Jupyter com um pipeline de clustering e classificação (K‑Means e RandomForest) para replicar a Etapa 1 e Etapa 2 da IA, conforme descrito no desafio
- `package.json` na raiz → scripts auxiliares

## Telas implementadas no app

- Tela inicial
- Dashboard com métricas de VIN Share
- Leads em risco com filtro por nível
- Detalhe do cliente com ação sugerida
- Simulação de previsão de perfil
- Tela de configurações com persistência local

## Rotas da API

- `GET /`
- `GET /health`
- `GET /dashboard`
- `GET /leads`
- `GET /client/:id`
- `POST /predict`

## Como rodar o backend

```bash
cd backend
npm install
npm start
```

A API sobe em `http://localhost:3001`.

## Como rodar o app mobile

```bash
cd mobile
npm install
npx expo start
```

### No Android Studio

1. Abra o emulador Android.
2. Com o Expo iniciado, pressione `a` no terminal.

### Observação sobre a API no Android

No emulador Android, o app tenta acessar a API em `http://10.0.2.2:3001`.

## Configurações reais implementadas

Na aba **Configurações**, o app já salva:

- uso de API real;
- notificações locais.

Essas preferências ficam persistidas com AsyncStorage.

## Dependências novas desta versão

- `expo-notifications`
- `@react-native-async-storage/async-storage`
 - `scikit-learn`, `pandas` e `joblib` (requisitos do notebook de ML; instale em um ambiente Python separado para executar o `ml_workflow.ipynb`)

## Observação importante

Como este pacote foi preparado para entrega acadêmica, o app continua funcionando mesmo quando a API não estiver no ar, porque ele cai automaticamente para os dados mockados.

Isso facilita a demonstração em apresentação e evita travamentos.
\n
## Novo pipeline de Machine Learning

Para atender à entrega de IA/ML, incluímos um notebook Jupyter (`ml_workflow.ipynb`) e dados sintéticos (`datasets/base1.csv` e `datasets/base2.csv`). O notebook demonstra como:

- Ler a base histórica com os perfis (Base 1).
- Aplicar clustering com **K‑Means** para identificar grupos naturais de clientes.
- Atribuir nomes de perfil aos clusters com base na análise.
- Treinar um modelo de classificação (**RandomForest**) apenas com dados disponíveis no momento da compra, respeitando a regra de não usar dados pós‑compra.
- Avaliar o modelo com métricas (accuracy, F1‑score e matriz de confusão).
- Salvar o classificador treinado para ser consumido pela API.
- Prever o perfil de novos clientes da Base 2.

Os CSVs fornecidos são apenas exemplos; substitua pelos dados oficiais do professor para obter um modelo realista. Você pode executar esse notebook em um ambiente Python (fora do React Native), instalando as dependências via `pip install pandas scikit-learn joblib`.

## Próximos passos sugeridos

- Implementar autenticação e controle de acesso na API (RBAC) para diferenciar os perfis de gerente e atendente.
- Integrar o classificador real exportado pelo notebook (`models/profile_classifier.joblib`) ao backend para substituir a lógica simplificada em `data.js`.
- Desenvolver testes unitários para as rotas da API e para a navegação do app.
- Implementar criptografia em repouso e anonimização de dados sensíveis, conforme orientado no desafio.
