# Manual do usuário

> Tire os prints indicados (Win + Shift + S) e coloque-os em `docs/prints/`, trocando cada marcador pela imagem.

## 1. Navegar no catálogo

1. Abra a página inicial. Os produtos aparecem em cartões.
2. Use **Buscar por nome**, **Categoria**, **Preço mínimo** e **Preço máximo** para filtrar. **Limpar** remove os filtros.
3. Clique no nome do produto para ver os detalhes e o estoque.

_[print: catálogo com filtros]_ _[print: detalhes do produto]_

## 2. Montar o carrinho

1. Clique em **Adicionar ao carrinho**. Uma mensagem confirma a ação.
2. Abra **Carrinho** no menu. Altere a quantidade (limitada ao estoque) ou clique em **Remover**.
3. O subtotal e o total são recalculados sozinhos. O carrinho continua salvo se a página for recarregada.

_[print: carrinho]_

## 3. Finalizar a compra

1. No carrinho, clique em **Finalizar compra**.
2. Escolha o **cliente**. O endereço cadastrado aparece; marque **Entregar em outro endereço** para informar outro.
3. Escolha a forma de pagamento (cartão, Pix ou boleto). No cartão, informe 16 dígitos.
4. Clique em **Pagar**. O resultado aparece: aprovado, recusado ou pendente.

_[print: checkout]_ _[print: pagamento aprovado]_

## 4. Acompanhar pedidos

1. Em **Pedidos**, filtre por status e clique em **Detalhes**.
2. A linha do tempo mostra pendente → pago → enviado → entregue.
3. Use **Marcar como...** para avançar o status ou **Cancelar pedido** (com confirmação).

_[print: lista de pedidos]_ _[print: detalhe com linha do tempo]_

## 5. Gerenciar produtos (administração)

- **Administrar produtos** → **Novo produto** ou **Editar**. Campos inválidos mostram a mensagem abaixo deles.
- **Excluir** abre uma janela de confirmação.

_[print: lista de produtos]_ _[print: formulário com erro de validação]_

## 6. Gerenciar clientes

- **Clientes** → **Novo cliente** ou **Editar**. E-mail, CPF, CEP e telefone são validados; CPF, CEP e telefone ganham máscara ao digitar.

_[print: formulário de cliente]_

## 7. Página não encontrada

Qualquer endereço inexistente mostra a página 404 com o caminho digitado e um link para o catálogo.
